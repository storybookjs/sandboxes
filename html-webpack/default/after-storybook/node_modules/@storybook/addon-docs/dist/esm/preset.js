import fs from 'fs-extra';
import remarkSlug from 'remark-slug';
import remarkExternalLinks from 'remark-external-links';
import global from 'global';
import { logger } from '@storybook/node-logger';
import { loadCsf } from '@storybook/csf-tools'; // for frameworks that are not working with react, we need to configure
// the jsx to transpile mdx, for now there will be a flag for that
// for more complex solutions we can find alone that we need to add '@babel/plugin-transform-react-jsx'

function createBabelOptions({
  babelOptions,
  mdxBabelOptions,
  configureJSX
}) {
  const babelPlugins = mdxBabelOptions?.plugins || babelOptions?.plugins || [];
  const jsxPlugin = [require.resolve('@babel/plugin-transform-react-jsx'), {
    pragma: 'React.createElement',
    pragmaFrag: 'React.Fragment'
  }];
  const plugins = configureJSX ? [...babelPlugins, jsxPlugin] : babelPlugins;
  return Object.assign({
    // don't use the root babelrc by default (users can override this in mdxBabelOptions)
    babelrc: false,
    configFile: false
  }, babelOptions, mdxBabelOptions, {
    plugins
  });
}

export async function webpack(webpackConfig = {}, options) {
  const resolvedBabelLoader = require.resolve('babel-loader');

  const {
    module = {}
  } = webpackConfig; // it will reuse babel options that are already in use in storybook
  // also, these babel options are chained with other presets.

  const {
    babelOptions,
    mdxBabelOptions,
    configureJSX = true,
    sourceLoaderOptions = {
      injectStoryParameters: true
    },
    transcludeMarkdown = false
  } = options;
  const mdxLoaderOptions = {
    // whether to skip storybook files, useful for docs only mdx or md files
    skipCsf: true,
    remarkPlugins: [remarkSlug, remarkExternalLinks]
  };
  const mdxVersion = global.FEATURES?.previewMdx2 ? 'MDX2' : 'MDX1';
  logger.info(`Addon-docs: using ${mdxVersion}`);
  const mdxLoader = global.FEATURES?.previewMdx2 ? require.resolve('@storybook/mdx2-csf/loader') : require.resolve('@storybook/mdx1-csf/loader'); // set `sourceLoaderOptions` to `null` to disable for manual configuration

  const sourceLoader = sourceLoaderOptions ? [{
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    options: Object.assign({}, sourceLoaderOptions, {
      inspectLocalDependencies: true
    }),
    enforce: 'pre'
  }] : [];
  let rules = module.rules || [];

  if (transcludeMarkdown) {
    rules = [...rules.filter(rule => rule.test?.toString() !== '/\\.md$/'), {
      test: /\.md$/,
      use: [{
        loader: resolvedBabelLoader,
        options: createBabelOptions({
          babelOptions,
          mdxBabelOptions,
          configureJSX
        })
      }, {
        loader: mdxLoader,
        options: mdxLoaderOptions
      }]
    }];
  }

  const result = Object.assign({}, webpackConfig, {
    module: Object.assign({}, module, {
      rules: [...rules, {
        test: /(stories|story)\.mdx$/,
        use: [{
          loader: resolvedBabelLoader,
          options: createBabelOptions({
            babelOptions,
            mdxBabelOptions,
            configureJSX
          })
        }, {
          loader: mdxLoader,
          options: Object.assign({}, mdxLoaderOptions, {
            skipCsf: false
          })
        }]
      }, {
        test: /\.mdx$/,
        exclude: /(stories|story)\.mdx$/,
        use: [{
          loader: resolvedBabelLoader,
          options: createBabelOptions({
            babelOptions,
            mdxBabelOptions,
            configureJSX
          })
        }, {
          loader: mdxLoader,
          options: mdxLoaderOptions
        }]
      }, ...sourceLoader]
    })
  });
  return result;
}
export const storyIndexers = async indexers => {
  const mdxIndexer = async (fileName, opts) => {
    let code = (await fs.readFile(fileName, 'utf-8')).toString(); // @ts-expect-error (Converted from ts-ignore)

    const {
      compile
    } = global.FEATURES?.previewMdx2 ? await import('@storybook/mdx2-csf') : await import('@storybook/mdx1-csf');
    code = await compile(code, {});
    return loadCsf(code, Object.assign({}, opts, {
      fileName
    })).parse();
  };

  return [{
    test: /(stories|story)\.mdx$/,
    indexer: mdxIndexer,
    addDocsTemplate: true
  }, ...(indexers || [])];
};
export const docs = docsOptions => {
  return Object.assign({}, docsOptions, {
    enabled: true,
    defaultName: 'Docs',
    docsPage: true
  });
};
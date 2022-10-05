"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storyIndexers = exports.docs = void 0;
exports.webpack = webpack;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _remarkSlug = _interopRequireDefault(require("remark-slug"));

var _remarkExternalLinks = _interopRequireDefault(require("remark-external-links"));

var _global = _interopRequireDefault(require("global"));

var _nodeLogger = require("@storybook/node-logger");

var _csfTools = require("@storybook/csf-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function createBabelOptions({
  babelOptions,
  mdxBabelOptions,
  configureJSX
}) {
  const babelPlugins = (mdxBabelOptions === null || mdxBabelOptions === void 0 ? void 0 : mdxBabelOptions.plugins) || (babelOptions === null || babelOptions === void 0 ? void 0 : babelOptions.plugins) || [];
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

async function webpack(webpackConfig = {}, options) {
  var _global$FEATURES, _global$FEATURES2;

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
    remarkPlugins: [_remarkSlug.default, _remarkExternalLinks.default]
  };
  const mdxVersion = (_global$FEATURES = _global.default.FEATURES) !== null && _global$FEATURES !== void 0 && _global$FEATURES.previewMdx2 ? 'MDX2' : 'MDX1';

  _nodeLogger.logger.info(`Addon-docs: using ${mdxVersion}`);

  const mdxLoader = (_global$FEATURES2 = _global.default.FEATURES) !== null && _global$FEATURES2 !== void 0 && _global$FEATURES2.previewMdx2 ? require.resolve('@storybook/mdx2-csf/loader') : require.resolve('@storybook/mdx1-csf/loader'); // set `sourceLoaderOptions` to `null` to disable for manual configuration

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
    rules = [...rules.filter(rule => {
      var _rule$test;

      return ((_rule$test = rule.test) === null || _rule$test === void 0 ? void 0 : _rule$test.toString()) !== '/\\.md$/';
    }), {
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

const storyIndexers = async indexers => {
  const mdxIndexer = async (fileName, opts) => {
    var _global$FEATURES3;

    let code = (await _fsExtra.default.readFile(fileName, 'utf-8')).toString(); // @ts-expect-error (Converted from ts-ignore)

    const {
      compile
    } = (_global$FEATURES3 = _global.default.FEATURES) !== null && _global$FEATURES3 !== void 0 && _global$FEATURES3.previewMdx2 ? await Promise.resolve().then(() => _interopRequireWildcard(require('@storybook/mdx2-csf'))) : await Promise.resolve().then(() => _interopRequireWildcard(require('@storybook/mdx1-csf')));
    code = await compile(code, {});
    return (0, _csfTools.loadCsf)(code, Object.assign({}, opts, {
      fileName
    })).parse();
  };

  return [{
    test: /(stories|story)\.mdx$/,
    indexer: mdxIndexer,
    addDocsTemplate: true
  }, ...(indexers || [])];
};

exports.storyIndexers = storyIndexers;

const docs = docsOptions => {
  return Object.assign({}, docsOptions, {
    enabled: true,
    defaultName: 'Docs',
    docsPage: true
  });
};

exports.docs = docs;
import u from"path";import{serverRequire as c}from"@storybook/core-common";var m=["webpack.config","webpackfile"],P=o=>c(m.map(e=>u.resolve(o,e)));import{logger as p}from"@storybook/node-logger";import{dedent as f}from"ts-dedent";var I=(o,e,i)=>{if(!o.version){p.info("Skipping webpack version check, no version available");return}o.version!==e&&p.warn(f`
      Unexpected webpack version in ${i}:
      - Received '${o.version}'
      - Expected '${e}'

      If you're using Webpack 5 in SB6.2 and upgrading, consider: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#webpack-5-manager-build

      For more info about Webpack 5 support: https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324#troubleshooting
    `)};function g(o=[],e=[]){return[...o,...e]}function d(o=[],e=[]){return[...o,...e]}function C({extensions:o=[]},{extensions:e=[]}){return[...o,...e]}function b({alias:o={}},{alias:e={}}){return{...o,...e}}function x(o,e){return{...o,...e,rules:d(o.rules||[],e.rules||[])}}function k({resolve:o={}},{resolve:e={}}){return{...o,...e,alias:b(o,e),extensions:C(o,e)}}function y({optimization:o={}},{optimization:e={}}){return{...o,...e}}function E(o,e){return{...e,...o,devtool:e.devtool||o.devtool,plugins:g(o.plugins,e.plugins),module:x(o.module||{},e.module||{}),resolve:k(o,e),optimization:y(o,e)}}import{dedent as a}from"ts-dedent";import{globToRegexp as v}from"@storybook/core-common";function s(){let o=Promise.resolve();return async e=>{await o;let i=e();return o=o.then(async()=>{await i}),i}}function R(o){let{directory:e,files:i}=o,t=e.replace(/^(\.+\/)+/,"/"),n=[".",".."].includes(e)?i:`${t}/${i}`,l=v(n);return new RegExp(l.source.replace(/^\^/,""))}function h(o){let{directory:e,importPathMatcher:i}=o;return a`
      async (path) => {
        if (!${i}.exec(path)) {
          return;
        }

        const pathRemainder = path.substring(${e.length+1});
        return import(
          /* webpackChunkName: "[request]" */
          /* webpackInclude: ${R(o)} */
          '${e}/' + pathRemainder
        );
      }

  `}function j(o,{needPipelinedImport:e}={}){let i="const pipeline = (x) => x();";return e&&(i=`
      const importPipeline = ${s};
      const pipeline = importPipeline();
    `),a`
    ${i}

    const importers = [
      ${o.map(h).join(`,
`)}
    ];

    export async function importFn(path) {
      for (let i = 0; i < importers.length; i++) {
        const moduleExports = await pipeline(() => importers[i](path));
        if (moduleExports) {
          return moduleExports;
        }
      }
    }
  `}import{globToRegexp as S}from"@storybook/core-common";var w=o=>{let{directory:e,files:i}=o,t=S(`./${i}`);return{path:e,recursive:i.includes("**")||i.split("/").length>1,match:t}},L=o=>{let{path:e,recursive:i,match:t}=w(o);return`require.context('${e}', ${i}, ${t})`};export{I as checkWebpackVersion,P as loadCustomWebpackConfig,E as mergeConfigs,j as toImportFn,h as toImportFnPart,w as toRequireContext,L as toRequireContextString,R as webpackIncludeRegexp};

"use strict";var h=Object.create;var n=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var S=(e,o)=>{for(var i in o)n(e,i,{get:o[i],enumerable:!0})},l=(e,o,i,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of R(o))!y.call(e,t)&&t!==i&&n(e,t,{get:()=>o[t],enumerable:!(r=v(o,t))||r.enumerable});return e};var $=(e,o,i)=>(i=e!=null?h(k(e)):{},l(o||!e||!e.__esModule?n(i,"default",{value:e,enumerable:!0}):i,e)),w=e=>l(n({},"__esModule",{value:!0}),e);var O={};S(O,{checkWebpackVersion:()=>F,loadCustomWebpackConfig:()=>P,mergeConfigs:()=>T,toImportFn:()=>j,toImportFnPart:()=>d,toRequireContext:()=>b,toRequireContextString:()=>A,webpackIncludeRegexp:()=>g});module.exports=w(O);var u=$(require("path")),a=require("@storybook/core-common"),z=["webpack.config","webpackfile"],P=e=>(0,a.serverRequire)(z.map(o=>u.default.resolve(e,o)));var p=require("@storybook/node-logger"),m=require("ts-dedent"),F=(e,o,i)=>{if(!e.version){p.logger.info("Skipping webpack version check, no version available");return}e.version!==o&&p.logger.warn(m.dedent`
      Unexpected webpack version in ${i}:
      - Received '${e.version}'
      - Expected '${o}'

      If you're using Webpack 5 in SB6.2 and upgrading, consider: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#webpack-5-manager-build

      For more info about Webpack 5 support: https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324#troubleshooting
    `)};function I(e=[],o=[]){return[...e,...o]}function M(e=[],o=[]){return[...e,...o]}function E({extensions:e=[]},{extensions:o=[]}){return[...e,...o]}function N({alias:e={}},{alias:o={}}){return{...e,...o}}function q(e,o){return{...e,...o,rules:M(e.rules||[],o.rules||[])}}function W({resolve:e={}},{resolve:o={}}){return{...e,...o,alias:N(e,o),extensions:E(e,o)}}function G({optimization:e={}},{optimization:o={}}){return{...e,...o}}function T(e,o){return{...o,...e,devtool:o.devtool||e.devtool,plugins:I(e.plugins,o.plugins),module:q(e.module||{},o.module||{}),resolve:W(e,o),optimization:G(e,o)}}var s=require("ts-dedent"),f=require("@storybook/core-common");function c(){let e=Promise.resolve();return async o=>{await e;let i=o();return e=e.then(async()=>{await i}),i}}function g(e){let{directory:o,files:i}=e,r=o.replace(/^(\.+\/)+/,"/"),t=[".",".."].includes(o)?i:`${r}/${i}`,C=(0,f.globToRegexp)(t);return new RegExp(C.source.replace(/^\^/,""))}function d(e){let{directory:o,importPathMatcher:i}=e;return s.dedent`
      async (path) => {
        if (!${i}.exec(path)) {
          return;
        }

        const pathRemainder = path.substring(${o.length+1});
        return import(
          /* webpackChunkName: "[request]" */
          /* webpackInclude: ${g(e)} */
          '${o}/' + pathRemainder
        );
      }

  `}function j(e,{needPipelinedImport:o}={}){let i="const pipeline = (x) => x();";return o&&(i=`
      const importPipeline = ${c};
      const pipeline = importPipeline();
    `),s.dedent`
    ${i}

    const importers = [
      ${e.map(d).join(`,
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
  `}var x=require("@storybook/core-common"),b=e=>{let{directory:o,files:i}=e,r=(0,x.globToRegexp)(`./${i}`);return{path:o,recursive:i.includes("**")||i.split("/").length>1,match:r}},A=e=>{let{path:o,recursive:i,match:r}=b(e);return`require.context('${o}', ${i}, ${r})`};0&&(module.exports={checkWebpackVersion,loadCustomWebpackConfig,mergeConfigs,toImportFn,toImportFnPart,toRequireContext,toRequireContextString,webpackIncludeRegexp});

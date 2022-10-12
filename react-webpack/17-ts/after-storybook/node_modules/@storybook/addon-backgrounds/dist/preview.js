var G=Object.create;var k=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var K=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var O=(r,e)=>{for(var t in e)k(r,t,{get:e[t],enumerable:!0})},h=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of K(e))!N.call(r,o)&&o!==t&&k(r,o,{get:()=>e[o],enumerable:!(n=D(e,o))||n.enumerable});return r};var w=(r,e,t)=>(t=r!=null?G(Y(r)):{},h(e||!r||!r.__esModule?k(t,"default",{value:r,enumerable:!0}):t,r)),j=r=>h(k({},"__esModule",{value:!0}),r);var Z={};O(Z,{decorators:()=>J,parameters:()=>Q});module.exports=j(Z);var p=require("@storybook/addons");var U="storybook/background",l="backgrounds";var ee={UPDATE:`${U}/update`};var B=w(require("global")),v=require("ts-dedent"),T=require("@storybook/client-logger"),{document:d,window:X}=B.default,C=()=>X.matchMedia("(prefers-reduced-motion: reduce)").matches,F=(r,e=[],t)=>{if(r==="transparent")return"transparent";if(e.find(o=>o.value===r))return r;let n=e.find(o=>o.name===t);if(n)return n.value;if(t){let o=e.map(i=>i.name).join(", ");T.logger.warn(v.dedent`
        Backgrounds Addon: could not find the default color "${t}".
        These are the available colors for your story based on your configuration:
        ${o}.
      `)}return"transparent"},S=r=>{(Array.isArray(r)?r:[r]).forEach(W)},W=r=>{let e=d.getElementById(r);e&&e.parentElement.removeChild(e)},L=(r,e)=>{let t=d.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let n=d.createElement("style");n.setAttribute("id",r),n.innerHTML=e,d.head.appendChild(n)}},R=(r,e,t)=>{let n=d.getElementById(r);if(n)n.innerHTML!==e&&(n.innerHTML=e);else{let o=d.createElement("style");o.setAttribute("id",r),o.innerHTML=e;let i=`addon-backgrounds-grid${t?`-docs-${t}`:""}`,a=d.getElementById(i);a?a.parentElement.insertBefore(o,a):d.head.appendChild(o)}};var H=(r,e)=>{var s;let{globals:t,parameters:n}=e,o=(s=t[l])==null?void 0:s.value,i=n[l],a=(0,p.useMemo)(()=>i.disable?"transparent":F(o,i.values,i.default),[i,o]),u=(0,p.useMemo)(()=>a&&a!=="transparent",[a]),c=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",g=(0,p.useMemo)(()=>{let m="transition: background-color 0.3s;";return`
      ${c} {
        background: ${a} !important;
        ${C()?"":m}
      }
    `},[a,c]);return(0,p.useEffect)(()=>{let m=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!u){S(m);return}R(m,g,e.viewMode==="docs"?e.id:null)},[u,g,e]),r()};var P=require("ts-dedent"),z=w(require("util-deprecate")),$=require("@storybook/addons");var q=(0,z.default)(()=>{},P.dedent`
    Backgrounds Addon: The cell size parameter has been changed.

    - parameters.grid.cellSize should now be parameters.backgrounds.grid.cellSize
    See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-grid-parameter
  `),I=(r,e)=>{var M,E;let{globals:t,parameters:n}=e,o=n[l].grid,i=((M=t[l])==null?void 0:M.grid)===!0&&o.disable!==!0,{cellAmount:a,cellSize:u,opacity:c}=o,g=e.viewMode==="docs",s;(E=n.grid)!=null&&E.cellSize?(s=n.grid.cellSize,q()):s=u;let A=n.layout===void 0||n.layout==="padded"?16:0,f=o.offsetX??(g?20:A),y=o.offsetY??(g?20:A),x=(0,$.useMemo)(()=>{let b=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",_=[`${s*a}px ${s*a}px`,`${s*a}px ${s*a}px`,`${s}px ${s}px`,`${s}px ${s}px`].join(", ");return`
      ${b} {
        background-size: ${_} !important;
        background-position: ${f}px ${y}px, ${f}px ${y}px, ${f}px ${y}px, ${f}px ${y}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${c}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${c}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${c/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${c/2}) 1px, transparent 1px) !important;
      }
    `},[s]);return(0,$.useEffect)(()=>{let b=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!i){S(b);return}L(b,x)},[i,x,e]),r()};var J=[I,H],Q={backgrounds:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}};0&&(module.exports={decorators,parameters});

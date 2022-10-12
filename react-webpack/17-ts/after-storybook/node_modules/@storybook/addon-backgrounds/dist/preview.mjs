import{b as d,c as S,d as $,e as m,f as A,g as x}from"./chunk-OCW2MZFJ.mjs";import{useMemo as f,useEffect as v}from"@storybook/addons";var h=(g,r)=>{let{globals:b,parameters:t}=r,a=b[d]?.value,n=t[d],e=f(()=>n.disable?"transparent":$(a,n.values,n.default),[n,a]),c=f(()=>e&&e!=="transparent",[e]),s=r.viewMode==="docs"?`#anchor--${r.id} .docs-story`:".sb-show-main",i=f(()=>{let o="transition: background-color 0.3s;";return`
      ${s} {
        background: ${e} !important;
        ${S()?"":o}
      }
    `},[e,s]);return v(()=>{let o=r.viewMode==="docs"?`addon-backgrounds-docs-${r.id}`:"addon-backgrounds-color";if(!c){m(o);return}x(o,i,r.viewMode==="docs"?r.id:null)},[c,i,r]),g()};import{dedent as z}from"ts-dedent";import C from"util-deprecate";import{useMemo as B,useEffect as P}from"@storybook/addons";var R=C(()=>{},z`
    Backgrounds Addon: The cell size parameter has been changed.

    - parameters.grid.cellSize should now be parameters.backgrounds.grid.cellSize
    See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-grid-parameter
  `),F=(g,r)=>{let{globals:b,parameters:t}=r,a=t[d].grid,n=b[d]?.grid===!0&&a.disable!==!0,{cellAmount:e,cellSize:c,opacity:s}=a,i=r.viewMode==="docs",o;t.grid?.cellSize?(o=t.grid.cellSize,R()):o=c;let y=t.layout===void 0||t.layout==="padded"?16:0,l=a.offsetX??(i?20:y),p=a.offsetY??(i?20:y),k=B(()=>{let u=r.viewMode==="docs"?`#anchor--${r.id} .docs-story`:".sb-show-main",M=[`${o*e}px ${o*e}px`,`${o*e}px ${o*e}px`,`${o}px ${o}px`,`${o}px ${o}px`].join(", ");return`
      ${u} {
        background-size: ${M} !important;
        background-position: ${l}px ${p}px, ${l}px ${p}px, ${l}px ${p}px, ${l}px ${p}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${s/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s/2}) 1px, transparent 1px) !important;
      }
    `},[o]);return P(()=>{let u=r.viewMode==="docs"?`addon-backgrounds-grid-docs-${r.id}`:"addon-backgrounds-grid";if(!n){m(u);return}A(u,k)},[n,k,r]),g()};var X=[F,h],W={backgrounds:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}};export{X as decorators,W as parameters};

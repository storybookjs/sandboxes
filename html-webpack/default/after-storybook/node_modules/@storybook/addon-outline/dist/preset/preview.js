var y=Object.create;var l=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var k=(i,t)=>{for(var o in t)l(i,o,{get:t[o],enumerable:!0})},f=(i,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let p of h(t))!A.call(i,p)&&p!==o&&l(i,p,{get:()=>t[p],enumerable:!(n=g(t,p))||n.enumerable});return i};var E=(i,t,o)=>(o=i!=null?y(S(i)):{},f(t||!i||!i.__esModule?l(o,"default",{value:i,enumerable:!0}):o,i)),v=i=>f(l({},"__esModule",{value:!0}),i);var F={};k(F,{decorators:()=>M,globals:()=>C});module.exports=v(F);var u=require("@storybook/addons");var d=E(require("global")),r=i=>{(Array.isArray(i)?i:[i]).forEach(w)},w=i=>{let t=d.default.document.getElementById(i);t&&t.parentElement&&t.parentElement.removeChild(t)},s=(i,t)=>{let o=d.default.document.getElementById(i);if(o)o.innerHTML!==t&&(o.innerHTML=t);else{let n=d.default.document.createElement("style");n.setAttribute("id",i),n.innerHTML=t,d.default.document.head.appendChild(n)}};var m="outline";var e=require("ts-dedent");function x(i){return e.dedent`
    ${i} body {
      outline: 1px solid #2980b9 !important;
    }

    ${i} article {
      outline: 1px solid #3498db !important;
    }

    ${i} nav {
      outline: 1px solid #0088c3 !important;
    }

    ${i} aside {
      outline: 1px solid #33a0ce !important;
    }

    ${i} section {
      outline: 1px solid #66b8da !important;
    }

    ${i} header {
      outline: 1px solid #99cfe7 !important;
    }

    ${i} footer {
      outline: 1px solid #cce7f3 !important;
    }

    ${i} h1 {
      outline: 1px solid #162544 !important;
    }

    ${i} h2 {
      outline: 1px solid #314e6e !important;
    }

    ${i} h3 {
      outline: 1px solid #3e5e85 !important;
    }

    ${i} h4 {
      outline: 1px solid #449baf !important;
    }

    ${i} h5 {
      outline: 1px solid #c7d1cb !important;
    }

    ${i} h6 {
      outline: 1px solid #4371d0 !important;
    }

    ${i} main {
      outline: 1px solid #2f4f90 !important;
    }

    ${i} address {
      outline: 1px solid #1a2c51 !important;
    }

    ${i} div {
      outline: 1px solid #036cdb !important;
    }

    ${i} p {
      outline: 1px solid #ac050b !important;
    }

    ${i} hr {
      outline: 1px solid #ff063f !important;
    }

    ${i} pre {
      outline: 1px solid #850440 !important;
    }

    ${i} blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    ${i} ol {
      outline: 1px solid #ff050c !important;
    }

    ${i} ul {
      outline: 1px solid #d90416 !important;
    }

    ${i} li {
      outline: 1px solid #d90416 !important;
    }

    ${i} dl {
      outline: 1px solid #fd3427 !important;
    }

    ${i} dt {
      outline: 1px solid #ff0043 !important;
    }

    ${i} dd {
      outline: 1px solid #e80174 !important;
    }

    ${i} figure {
      outline: 1px solid #ff00bb !important;
    }

    ${i} figcaption {
      outline: 1px solid #bf0032 !important;
    }

    ${i} table {
      outline: 1px solid #00cc99 !important;
    }

    ${i} caption {
      outline: 1px solid #37ffc4 !important;
    }

    ${i} thead {
      outline: 1px solid #98daca !important;
    }

    ${i} tbody {
      outline: 1px solid #64a7a0 !important;
    }

    ${i} tfoot {
      outline: 1px solid #22746b !important;
    }

    ${i} tr {
      outline: 1px solid #86c0b2 !important;
    }

    ${i} th {
      outline: 1px solid #a1e7d6 !important;
    }

    ${i} td {
      outline: 1px solid #3f5a54 !important;
    }

    ${i} col {
      outline: 1px solid #6c9a8f !important;
    }

    ${i} colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    ${i} button {
      outline: 1px solid #da8301 !important;
    }

    ${i} datalist {
      outline: 1px solid #c06000 !important;
    }

    ${i} fieldset {
      outline: 1px solid #d95100 !important;
    }

    ${i} form {
      outline: 1px solid #d23600 !important;
    }

    ${i} input {
      outline: 1px solid #fca600 !important;
    }

    ${i} keygen {
      outline: 1px solid #b31e00 !important;
    }

    ${i} label {
      outline: 1px solid #ee8900 !important;
    }

    ${i} legend {
      outline: 1px solid #de6d00 !important;
    }

    ${i} meter {
      outline: 1px solid #e8630c !important;
    }

    ${i} optgroup {
      outline: 1px solid #b33600 !important;
    }

    ${i} option {
      outline: 1px solid #ff8a00 !important;
    }

    ${i} output {
      outline: 1px solid #ff9619 !important;
    }

    ${i} progress {
      outline: 1px solid #e57c00 !important;
    }

    ${i} select {
      outline: 1px solid #e26e0f !important;
    }

    ${i} textarea {
      outline: 1px solid #cc5400 !important;
    }

    ${i} details {
      outline: 1px solid #33848f !important;
    }

    ${i} summary {
      outline: 1px solid #60a1a6 !important;
    }

    ${i} command {
      outline: 1px solid #438da1 !important;
    }

    ${i} menu {
      outline: 1px solid #449da6 !important;
    }

    ${i} del {
      outline: 1px solid #bf0000 !important;
    }

    ${i} ins {
      outline: 1px solid #400000 !important;
    }

    ${i} img {
      outline: 1px solid #22746b !important;
    }

    ${i} iframe {
      outline: 1px solid #64a7a0 !important;
    }

    ${i} embed {
      outline: 1px solid #98daca !important;
    }

    ${i} object {
      outline: 1px solid #00cc99 !important;
    }

    ${i} param {
      outline: 1px solid #37ffc4 !important;
    }

    ${i} video {
      outline: 1px solid #6ee866 !important;
    }

    ${i} audio {
      outline: 1px solid #027353 !important;
    }

    ${i} source {
      outline: 1px solid #012426 !important;
    }

    ${i} canvas {
      outline: 1px solid #a2f570 !important;
    }

    ${i} track {
      outline: 1px solid #59a600 !important;
    }

    ${i} map {
      outline: 1px solid #7be500 !important;
    }

    ${i} area {
      outline: 1px solid #305900 !important;
    }

    ${i} a {
      outline: 1px solid #ff62ab !important;
    }

    ${i} em {
      outline: 1px solid #800b41 !important;
    }

    ${i} strong {
      outline: 1px solid #ff1583 !important;
    }

    ${i} i {
      outline: 1px solid #803156 !important;
    }

    ${i} b {
      outline: 1px solid #cc1169 !important;
    }

    ${i} u {
      outline: 1px solid #ff0430 !important;
    }

    ${i} s {
      outline: 1px solid #f805e3 !important;
    }

    ${i} small {
      outline: 1px solid #d107b2 !important;
    }

    ${i} abbr {
      outline: 1px solid #4a0263 !important;
    }

    ${i} q {
      outline: 1px solid #240018 !important;
    }

    ${i} cite {
      outline: 1px solid #64003c !important;
    }

    ${i} dfn {
      outline: 1px solid #b4005a !important;
    }

    ${i} sub {
      outline: 1px solid #dba0c8 !important;
    }

    ${i} sup {
      outline: 1px solid #cc0256 !important;
    }

    ${i} time {
      outline: 1px solid #d6606d !important;
    }

    ${i} code {
      outline: 1px solid #e04251 !important;
    }

    ${i} kbd {
      outline: 1px solid #5e001f !important;
    }

    ${i} samp {
      outline: 1px solid #9c0033 !important;
    }

    ${i} var {
      outline: 1px solid #d90047 !important;
    }

    ${i} mark {
      outline: 1px solid #ff0053 !important;
    }

    ${i} bdi {
      outline: 1px solid #bf3668 !important;
    }

    ${i} bdo {
      outline: 1px solid #6f1400 !important;
    }

    ${i} ruby {
      outline: 1px solid #ff7b93 !important;
    }

    ${i} rt {
      outline: 1px solid #ff2f54 !important;
    }

    ${i} rp {
      outline: 1px solid #803e49 !important;
    }

    ${i} span {
      outline: 1px solid #cc2643 !important;
    }

    ${i} br {
      outline: 1px solid #db687d !important;
    }

    ${i} wbr {
      outline: 1px solid #db175b !important;
    }`}var b=(i,t)=>{let{globals:o}=t,n=o[m]===!0,p=t.viewMode==="docs",$=(0,u.useMemo)(()=>{let a=p?`#anchor--${t.id} .docs-story`:".sb-show-main";return x(a)},[t]);return(0,u.useEffect)(()=>{let a=p?`addon-outline-docs-${t.id}`:"addon-outline";return n?s(a,$):r(a),()=>{r(a)}},[n,$,t]),i()};var M=[b],C={[m]:!1};0&&(module.exports={decorators,globals});

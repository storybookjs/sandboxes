import React from 'react';
import ReactDOM from 'react-dom';
import { components as htmlComponents } from '@storybook/components';
import { Docs, CodeOrSourceMdx, AnchorMdx, HeadersMdx } from '@storybook/blocks';
import { MDXProvider } from '@mdx-js/react'; // TS doesn't like that we export a component with types that it doesn't know about (TS4203)

export const defaultComponents = Object.assign({}, htmlComponents, {
  code: CodeOrSourceMdx,
  a: AnchorMdx
}, HeadersMdx);
export class DocsRenderer {
  constructor() {
    this.render = void 0;
    this.unmount = void 0;

    this.render = (context, docsParameter, element, callback) => {
      // Use a random key to force the container to re-render each time we call `renderDocs`
      //   TODO: do we still need this? It was needed for angular (legacy) inline rendering:
      //   https://github.com/storybookjs/storybook/pull/16149
      ReactDOM.render( /*#__PURE__*/React.createElement(MDXProvider, {
        components: defaultComponents
      }, /*#__PURE__*/React.createElement(Docs, {
        key: Math.random(),
        context: context,
        docsParameter: docsParameter
      })), element, callback);
    };

    this.unmount = element => {
      ReactDOM.unmountComponentAtNode(element);
    };
  }

}
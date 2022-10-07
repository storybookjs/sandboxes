"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultComponents = exports.DocsRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _components = require("@storybook/components");

var _blocks = require("@storybook/blocks");

var _react2 = require("@mdx-js/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TS doesn't like that we export a component with types that it doesn't know about (TS4203)
const defaultComponents = Object.assign({}, _components.components, {
  code: _blocks.CodeOrSourceMdx,
  a: _blocks.AnchorMdx
}, _blocks.HeadersMdx);
exports.defaultComponents = defaultComponents;

class DocsRenderer {
  constructor() {
    this.render = void 0;
    this.unmount = void 0;

    this.render = (context, docsParameter, element, callback) => {
      // Use a random key to force the container to re-render each time we call `renderDocs`
      //   TODO: do we still need this? It was needed for angular (legacy) inline rendering:
      //   https://github.com/storybookjs/storybook/pull/16149
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_react2.MDXProvider, {
        components: defaultComponents
      }, /*#__PURE__*/_react.default.createElement(_blocks.Docs, {
        key: Math.random(),
        context: context,
        docsParameter: docsParameter
      })), element, callback);
    };

    this.unmount = element => {
      _reactDom.default.unmountComponentAtNode(element);
    };
  }

}

exports.DocsRenderer = DocsRenderer;
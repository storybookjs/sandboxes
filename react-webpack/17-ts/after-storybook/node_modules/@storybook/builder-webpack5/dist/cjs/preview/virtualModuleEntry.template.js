"use strict";

var _clientApi = require("{{clientApi}}");

var previewAnnotations = _interopRequireWildcard(require("{{previewAnnotationFilename}}"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.keys(previewAnnotations).forEach(function (key) {
  var value = previewAnnotations[key];

  switch (key) {
    case 'args':
      {
        return (0, _clientApi.addArgs)(value);
      }

    case 'argTypes':
      {
        return (0, _clientApi.addArgTypes)(value);
      }

    case 'decorators':
      {
        return value.forEach(function (decorator) {
          return (0, _clientApi.addDecorator)(decorator, false);
        });
      }

    case 'loaders':
      {
        return value.forEach(function (loader) {
          return (0, _clientApi.addLoader)(loader, false);
        });
      }

    case 'parameters':
      {
        return (0, _clientApi.addParameters)(_objectSpread({}, value), false);
      }

    case 'argTypesEnhancers':
      {
        return value.forEach(function (enhancer) {
          return (0, _clientApi.addArgTypesEnhancer)(enhancer);
        });
      }

    case 'argsEnhancers':
      {
        return value.forEach(function (enhancer) {
          return (0, _clientApi.addArgsEnhancer)(enhancer);
        });
      }

    case 'render':
      {
        return (0, _clientApi.setGlobalRender)(value);
      }

    case 'globals':
    case 'globalTypes':
      {
        var v = {};
        v[key] = value;
        return (0, _clientApi.addParameters)(v, false);
      }

    case '__namedExportsOrder':
    case 'decorateStory':
    case 'renderToDOM':
      {
        return null; // This key is not handled directly in v6 mode.
      }

    case 'runStep':
      {
        return (0, _clientApi.addStepRunner)(value);
      }

    default:
      {
        return console.log(`Unknown key '${key}' exported by preview annotation file '{{previewAnnotationFilename}}'`);
      }
  }
});
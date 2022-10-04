"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readStory = readStory;

var _injectDecorator = _interopRequireDefault(require("../abstract-syntax-tree/inject-decorator"));

var _generateHelpers = require("../abstract-syntax-tree/generate-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readAsObject(classLoader, inputSource, mainFile) {
  const options = classLoader.getOptions();
  const result = (0, _injectDecorator.default)(inputSource, classLoader.resourcePath, Object.assign({}, options, {
    parser: options.parser || classLoader.extension
  }), classLoader.emitWarning.bind(classLoader));
  const sourceJson = (0, _generateHelpers.sanitizeSource)(result.storySource || inputSource);
  const addsMap = result.addsMap || {};
  const source = mainFile ? result.source : inputSource;
  return new Promise(resolve => resolve({
    source,
    sourceJson,
    addsMap
  }));
}

function readStory(classLoader, inputSource) {
  return readAsObject(classLoader, inputSource, true);
}
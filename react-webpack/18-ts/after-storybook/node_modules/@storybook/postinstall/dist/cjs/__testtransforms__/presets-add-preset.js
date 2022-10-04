"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformer;

var _presets = require("../presets");

function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  (0, _presets.addPreset)('test', null, {
    root,
    api
  });
  return root.toSource({
    quote: 'single'
  });
}
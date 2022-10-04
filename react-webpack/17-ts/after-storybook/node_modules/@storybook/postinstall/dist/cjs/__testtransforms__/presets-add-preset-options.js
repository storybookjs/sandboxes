"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformer;

var _presets = require("../presets");

function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const options = {
    a: [1, 2, 3],
    b: {
      foo: 'bar'
    },
    c: 'baz'
  };
  (0, _presets.addPreset)('test', options, {
    root,
    api
  });
  return root.toSource({
    quote: 'single'
  });
}
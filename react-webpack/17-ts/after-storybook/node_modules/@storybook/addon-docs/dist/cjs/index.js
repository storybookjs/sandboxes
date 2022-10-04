"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  DocsRenderer: true
};
Object.defineProperty(exports, "DocsRenderer", {
  enumerable: true,
  get: function () {
    return _DocsRenderer.DocsRenderer;
  }
});

var _blocks = require("./blocks");

Object.keys(_blocks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _blocks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _blocks[key];
    }
  });
});

var _DocsRenderer = require("./DocsRenderer");
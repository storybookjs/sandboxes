"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _argTypes = require("./argTypes");

Object.keys(_argTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _argTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _argTypes[key];
    }
  });
});

var _shared = require("./shared");

Object.keys(_shared).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _shared[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shared[key];
    }
  });
});

var _hasDocsOrControls = require("./hasDocsOrControls");

Object.keys(_hasDocsOrControls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hasDocsOrControls[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasDocsOrControls[key];
    }
  });
});
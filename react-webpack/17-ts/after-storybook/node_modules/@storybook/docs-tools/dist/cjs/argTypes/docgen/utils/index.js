"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultValue = require("./defaultValue");

Object.keys(_defaultValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _defaultValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _defaultValue[key];
    }
  });
});

var _string = require("./string");

Object.keys(_string).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _string[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _string[key];
    }
  });
});

var _docgenInfo = require("./docgenInfo");

Object.keys(_docgenInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _docgenInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _docgenInfo[key];
    }
  });
});
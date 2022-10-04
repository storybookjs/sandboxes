"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blocks = require("@storybook/blocks");

Object.keys(_blocks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _blocks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _blocks[key];
    }
  });
});
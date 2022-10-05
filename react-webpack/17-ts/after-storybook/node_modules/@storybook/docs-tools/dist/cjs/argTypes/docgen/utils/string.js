"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str = void 0;

const str = obj => {
  if (!obj) {
    return '';
  }

  if (typeof obj === 'string') {
    return obj;
  }

  throw new Error(`Description: expected string, got: ${JSON.stringify(obj)}`);
};

exports.str = str;
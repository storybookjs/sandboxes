"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  extractSource: true
};
exports.extractSource = extractSource;

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

/**
 * given a location, extract the text from the full source
 */
function extractSource(location, lines) {
  const {
    startBody: start,
    endBody: end
  } = location;

  if (start.line === end.line && lines[start.line - 1] !== undefined) {
    return lines[start.line - 1].substring(start.col, end.col);
  } // NOTE: storysource locations are 1-based not 0-based!


  const startLine = lines[start.line - 1];
  const endLine = lines[end.line - 1];

  if (startLine === undefined || endLine === undefined) {
    return null;
  }

  return [startLine.substring(start.col), ...lines.slice(start.line, end.line - 1), endLine.substring(0, end.col)].join('\n');
}
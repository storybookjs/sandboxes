"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefaultValueBlacklisted = isDefaultValueBlacklisted;
const BLACKLIST = ['null', 'undefined'];

function isDefaultValueBlacklisted(value) {
  return BLACKLIST.some(x => x === value);
}
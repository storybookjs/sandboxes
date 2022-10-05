"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimQuotes = exports.includesQuotes = void 0;
const QUOTE_REGEX = /^['"]|['"]$/g;

const trimQuotes = str => str.replace(QUOTE_REGEX, '');

exports.trimQuotes = trimQuotes;

const includesQuotes = str => QUOTE_REGEX.test(str);

exports.includesQuotes = includesQuotes;
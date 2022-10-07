"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_TYPE_SUMMARY_LENGTH = exports.MAX_DEFAULT_VALUE_SUMMARY_LENGTH = void 0;
exports.createSummaryValue = createSummaryValue;
exports.isTooLongForDefaultValueSummary = isTooLongForDefaultValueSummary;
exports.isTooLongForTypeSummary = isTooLongForTypeSummary;
exports.normalizeNewlines = void 0;
const MAX_TYPE_SUMMARY_LENGTH = 90;
exports.MAX_TYPE_SUMMARY_LENGTH = MAX_TYPE_SUMMARY_LENGTH;
const MAX_DEFAULT_VALUE_SUMMARY_LENGTH = 50;
exports.MAX_DEFAULT_VALUE_SUMMARY_LENGTH = MAX_DEFAULT_VALUE_SUMMARY_LENGTH;

function isTooLongForTypeSummary(value) {
  return value.length > MAX_TYPE_SUMMARY_LENGTH;
}

function isTooLongForDefaultValueSummary(value) {
  return value.length > MAX_DEFAULT_VALUE_SUMMARY_LENGTH;
}

function createSummaryValue(summary, detail) {
  if (summary === detail) {
    return {
      summary
    };
  }

  return {
    summary,
    detail
  };
}

const normalizeNewlines = string => string.replace(/\\r\\n/g, '\\n');

exports.normalizeNewlines = normalizeNewlines;
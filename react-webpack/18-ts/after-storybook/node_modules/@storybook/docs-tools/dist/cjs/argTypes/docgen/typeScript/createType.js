"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createType = createType;

var _utils = require("../../utils");

function createType({
  tsType,
  required
}) {
  // A type could be null if a defaultProp has been provided without a type definition.
  if (tsType == null) {
    return null;
  }

  if (!required) {
    return (0, _utils.createSummaryValue)(tsType.name.replace(' | undefined', ''));
  }

  return (0, _utils.createSummaryValue)(tsType.name);
}
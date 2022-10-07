"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createType = createType;

var _utils = require("../../utils");

var FlowTypesType;

(function (FlowTypesType) {
  FlowTypesType["UNION"] = "union";
  FlowTypesType["SIGNATURE"] = "signature";
})(FlowTypesType || (FlowTypesType = {}));

function generateUnionElement({
  name,
  value,
  elements,
  raw
}) {
  if (value != null) {
    return value;
  }

  if (elements != null) {
    return elements.map(generateUnionElement).join(' | ');
  }

  if (raw != null) {
    return raw;
  }

  return name;
}

function generateUnion({
  name,
  raw,
  elements
}) {
  if (elements != null) {
    return (0, _utils.createSummaryValue)(elements.map(generateUnionElement).join(' | '));
  }

  if (raw != null) {
    // Flow Unions can be defined with or without a leading `|` character, so try to remove it.
    return (0, _utils.createSummaryValue)(raw.replace(/^\|\s*/, ''));
  }

  return (0, _utils.createSummaryValue)(name);
}

function generateFuncSignature({
  type,
  raw
}) {
  if (raw != null) {
    return (0, _utils.createSummaryValue)(raw);
  }

  return (0, _utils.createSummaryValue)(type);
}

function generateObjectSignature({
  type,
  raw
}) {
  if (raw != null) {
    return !(0, _utils.isTooLongForTypeSummary)(raw) ? (0, _utils.createSummaryValue)(raw) : (0, _utils.createSummaryValue)(type, raw);
  }

  return (0, _utils.createSummaryValue)(type);
}

function generateSignature(flowType) {
  const {
    type
  } = flowType;
  return type === 'object' ? generateObjectSignature(flowType) : generateFuncSignature(flowType);
}

function generateDefault({
  name,
  raw
}) {
  if (raw != null) {
    return !(0, _utils.isTooLongForTypeSummary)(raw) ? (0, _utils.createSummaryValue)(raw) : (0, _utils.createSummaryValue)(name, raw);
  }

  return (0, _utils.createSummaryValue)(name);
}

function createType(type) {
  // A type could be null if a defaultProp has been provided without a type definition.
  if (type == null) {
    return null;
  }

  switch (type.name) {
    case FlowTypesType.UNION:
      return generateUnion(type);

    case FlowTypesType.SIGNATURE:
      return generateSignature(type);

    default:
      return generateDefault(type);
  }
}
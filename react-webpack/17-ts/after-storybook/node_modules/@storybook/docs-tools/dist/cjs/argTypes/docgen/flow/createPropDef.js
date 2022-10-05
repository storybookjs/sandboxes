"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFlowPropDef = void 0;

var _createType = require("./createType");

var _createDefaultValue = require("./createDefaultValue");

const createFlowPropDef = (propName, docgenInfo) => {
  const {
    flowType,
    description,
    required,
    defaultValue
  } = docgenInfo;
  return {
    name: propName,
    type: (0, _createType.createType)(flowType),
    required,
    description,
    defaultValue: (0, _createDefaultValue.createDefaultValue)(defaultValue, flowType)
  };
};

exports.createFlowPropDef = createFlowPropDef;
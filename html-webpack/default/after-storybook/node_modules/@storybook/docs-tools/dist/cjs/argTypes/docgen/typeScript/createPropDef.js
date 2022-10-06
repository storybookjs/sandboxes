"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTsPropDef = void 0;

var _createType = require("./createType");

var _createDefaultValue = require("./createDefaultValue");

const createTsPropDef = (propName, docgenInfo) => {
  const {
    description,
    required
  } = docgenInfo;
  return {
    name: propName,
    type: (0, _createType.createType)(docgenInfo),
    required,
    description,
    defaultValue: (0, _createDefaultValue.createDefaultValue)(docgenInfo)
  };
};

exports.createTsPropDef = createTsPropDef;
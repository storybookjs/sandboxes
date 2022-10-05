"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = void 0;

var _typescript = require("./typescript");

var _flow = require("./flow");

var _proptypes = require("./proptypes");

const convert = docgenInfo => {
  const {
    type,
    tsType,
    flowType
  } = docgenInfo;
  if (type != null) return (0, _proptypes.convert)(type);
  if (tsType != null) return (0, _typescript.convert)(tsType);
  if (flowType != null) return (0, _flow.convert)(flowType);
  return null;
};

exports.convert = convert;
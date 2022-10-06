"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceArgTypes = void 0;

var _store = require("@storybook/store");

const enhanceArgTypes = context => {
  const {
    component,
    argTypes: userArgTypes,
    parameters: {
      docs = {}
    }
  } = context;
  const {
    extractArgTypes
  } = docs;
  const extractedArgTypes = extractArgTypes && component ? extractArgTypes(component) : {};
  const withExtractedTypes = extractedArgTypes ? (0, _store.combineParameters)(extractedArgTypes, userArgTypes) : userArgTypes;
  return withExtractedTypes;
};

exports.enhanceArgTypes = enhanceArgTypes;
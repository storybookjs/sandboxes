"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractComponentDescription = extractComponentDescription;
exports.extractComponentSectionObject = exports.extractComponentSectionArray = exports.extractComponentProps = void 0;

var _jsdocParser = require("../jsdocParser");

var _types = require("./types");

var _utils = require("./utils");

var _createPropDef = require("./createPropDef");

const getTypeSystem = docgenInfo => {
  if (docgenInfo.type != null) {
    return _types.TypeSystem.JAVASCRIPT;
  }

  if (docgenInfo.flowType != null) {
    return _types.TypeSystem.FLOW;
  }

  if (docgenInfo.tsType != null) {
    return _types.TypeSystem.TYPESCRIPT;
  }

  return _types.TypeSystem.UNKNOWN;
};

const extractComponentSectionArray = docgenSection => {
  const typeSystem = getTypeSystem(docgenSection[0]);
  const createPropDef = (0, _createPropDef.getPropDefFactory)(typeSystem);
  return docgenSection.map(item => {
    var _item$type;

    let sanitizedItem = item;

    if ((_item$type = item.type) !== null && _item$type !== void 0 && _item$type.elements) {
      sanitizedItem = Object.assign({}, item, {
        type: Object.assign({}, item.type, {
          value: item.type.elements
        })
      });
    }

    return extractProp(sanitizedItem.name, sanitizedItem, typeSystem, createPropDef);
  });
};

exports.extractComponentSectionArray = extractComponentSectionArray;

const extractComponentSectionObject = docgenSection => {
  const docgenPropsKeys = Object.keys(docgenSection);
  const typeSystem = getTypeSystem(docgenSection[docgenPropsKeys[0]]);
  const createPropDef = (0, _createPropDef.getPropDefFactory)(typeSystem);
  return docgenPropsKeys.map(propName => {
    const docgenInfo = docgenSection[propName];
    return docgenInfo != null ? extractProp(propName, docgenInfo, typeSystem, createPropDef) : null;
  }).filter(Boolean);
};

exports.extractComponentSectionObject = extractComponentSectionObject;

const extractComponentProps = (component, section) => {
  const docgenSection = (0, _utils.getDocgenSection)(component, section);

  if (!(0, _utils.isValidDocgenSection)(docgenSection)) {
    return [];
  } // vue-docgen-api has diverged from react-docgen and returns an array


  return Array.isArray(docgenSection) ? extractComponentSectionArray(docgenSection) : extractComponentSectionObject(docgenSection);
};

exports.extractComponentProps = extractComponentProps;

function extractProp(propName, docgenInfo, typeSystem, createPropDef) {
  const jsDocParsingResult = (0, _jsdocParser.parseJsDoc)(docgenInfo.description);
  const isIgnored = jsDocParsingResult.includesJsDoc && jsDocParsingResult.ignore;

  if (!isIgnored) {
    const propDef = createPropDef(propName, docgenInfo, jsDocParsingResult);
    return {
      propDef,
      jsDocTags: jsDocParsingResult.extractedTags,
      docgenInfo,
      typeSystem
    };
  }

  return null;
}

function extractComponentDescription(component) {
  return component != null && (0, _utils.getDocgenDescription)(component);
}
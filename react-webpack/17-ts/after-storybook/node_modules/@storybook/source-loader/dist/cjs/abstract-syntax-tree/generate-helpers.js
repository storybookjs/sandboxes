"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAddsMap = generateAddsMap;
exports.generateSourceWithDecorators = generateSourceWithDecorators;
exports.generateSourceWithoutDecorators = generateSourceWithoutDecorators;
exports.generateSourcesInExportedParameters = generateSourcesInExportedParameters;
exports.generateSourcesInStoryParameters = generateSourcesInStoryParameters;
exports.generateStoriesLocationsMap = generateStoriesLocationsMap;
exports.generateStorySource = generateStorySource;
exports.sanitizeSource = sanitizeSource;

var _csf = require("@storybook/csf");

var _mapKeys = _interopRequireDefault(require("lodash/mapKeys"));

var _parseHelpers = require("./parse-helpers");

var _parsers = _interopRequireDefault(require("./parsers"));

var _traverseHelpers = require("./traverse-helpers");

var _extractSource = require("../extract-source");

const _excluded = ["source"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function sanitizeSource(source) {
  return JSON.stringify(source).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

function isUglyComment(comment, uglyCommentsRegex) {
  return uglyCommentsRegex.some(regex => regex.test(comment));
}

function generateSourceWithoutUglyComments(source, {
  comments,
  uglyCommentsRegex
}) {
  let lastIndex = 0;
  const parts = [source];
  comments.filter(comment => isUglyComment(comment.value.trim(), uglyCommentsRegex)).map(_parseHelpers.patchNode).forEach(comment => {
    parts.pop();
    const start = source.slice(lastIndex, comment.start);
    const end = source.slice(comment.end);
    parts.push(start, end);
    lastIndex = comment.end;
  });
  return parts.join('');
}

function prettifyCode(source, {
  prettierConfig,
  parser,
  filepath
}) {
  let config = prettierConfig;
  let foundParser = null;
  if (parser === 'flow') foundParser = 'flow';
  if (parser === 'javascript' || /jsx?/.test(parser)) foundParser = 'javascript';
  if (parser === 'typescript' || /tsx?/.test(parser)) foundParser = 'typescript';

  if (!config.parser) {
    config = Object.assign({}, prettierConfig);
  } else if (filepath) {
    config = Object.assign({}, prettierConfig, {
      filepath
    });
  } else {
    config = Object.assign({}, prettierConfig);
  }

  try {
    return (0, _parsers.default)(foundParser || 'javascript').format(source, config);
  } catch (e) {
    // Can fail when the source is a JSON
    return source;
  }
}

const ADD_PARAMETERS_STATEMENT = '.addParameters({ storySource: { source: __STORY__, locationsMap: __LOCATIONS_MAP__ } })';

const applyExportDecoratorStatement = part => part.declaration.isVariableDeclaration ? ` ${part.source};` : ` const ${part.declaration.ident} = ${part.source};`;

function generateSourceWithDecorators(source, ast) {
  const {
    comments = []
  } = ast;
  const partsUsingStoryOfToken = (0, _traverseHelpers.splitSTORYOF)(ast, source);

  if (partsUsingStoryOfToken.length > 1) {
    const newSource = partsUsingStoryOfToken.join(ADD_PARAMETERS_STATEMENT);
    return {
      storyOfTokenFound: true,
      changed: partsUsingStoryOfToken.length > 1,
      source: newSource,
      comments
    };
  }

  const partsUsingExports = (0, _traverseHelpers.splitExports)(ast, source);
  const newSource = partsUsingExports.map((part, i) => i % 2 === 0 ? part.source : applyExportDecoratorStatement(part)).join('');
  return {
    exportTokenFound: true,
    changed: partsUsingExports.length > 1,
    source: newSource,
    comments
  };
}

function generateSourceWithoutDecorators(source, ast) {
  const {
    comments = []
  } = ast;
  return {
    changed: true,
    source,
    comments
  };
}

function generateAddsMap(ast, storiesOfIdentifiers) {
  return (0, _traverseHelpers.findAddsMap)(ast, storiesOfIdentifiers);
}

function generateStoriesLocationsMap(ast, storiesOfIdentifiers) {
  const usingAddsMap = generateAddsMap(ast, storiesOfIdentifiers);
  const addsMap = usingAddsMap;

  if (Object.keys(addsMap).length > 0) {
    return usingAddsMap;
  }

  const usingExportsMap = (0, _traverseHelpers.findExportsMap)(ast);
  return usingExportsMap || usingAddsMap;
}

function generateStorySource(_ref) {
  let {
    source
  } = _ref,
      options = _objectWithoutPropertiesLoose(_ref, _excluded);

  let storySource = source;
  storySource = generateSourceWithoutUglyComments(storySource, options);
  storySource = prettifyCode(storySource, options);
  return storySource;
}

function transformLocationMapToIds(parameters) {
  if (!(parameters !== null && parameters !== void 0 && parameters.locationsMap)) return parameters;
  const locationsMap = (0, _mapKeys.default)(parameters.locationsMap, (_value, key) => {
    return (0, _csf.sanitize)((0, _csf.storyNameFromExport)(key));
  });
  return Object.assign({}, parameters, {
    locationsMap
  });
}

function generateSourcesInExportedParameters(source, ast, additionalParameters) {
  const {
    splicedSource,
    parametersSliceOfCode,
    indexWhereToAppend,
    foundParametersProperty
  } = (0, _traverseHelpers.popParametersObjectFromDefaultExport)(source, ast);

  if (indexWhereToAppend !== -1) {
    const additionalParametersAsJson = JSON.stringify({
      storySource: transformLocationMapToIds(additionalParameters)
    }).slice(0, -1);
    const propertyDeclaration = foundParametersProperty ? '' : 'parameters: ';
    const comma = foundParametersProperty ? '' : ',';
    const newParameters = `${propertyDeclaration}${additionalParametersAsJson},${parametersSliceOfCode.substring(1)}${comma}`;
    const additionalComma = comma === ',' ? '' : ',';
    const result = `${splicedSource.substring(0, indexWhereToAppend)}${newParameters}${additionalComma}${splicedSource.substring(indexWhereToAppend)}`;
    return result;
  }

  return source;
}

function addStorySourceParameter(key, snippet) {
  const source = sanitizeSource(snippet);
  return `${key}.parameters = { storySource: { source: ${source} }, ...${key}.parameters };`;
}

function generateSourcesInStoryParameters(source, ast, additionalParameters) {
  if (!additionalParameters || !additionalParameters.source || !additionalParameters.locationsMap) {
    return source;
  }

  const {
    source: sanitizedSource,
    locationsMap
  } = additionalParameters;
  const lines = sanitizedSource.split('\n');
  const suffix = Object.entries(locationsMap).reduce((acc, [exportName, location]) => {
    const exportSource = (0, _extractSource.extractSource)(location, lines);

    if (exportSource) {
      const generated = addStorySourceParameter(exportName, exportSource);
      return `${acc}\n${generated}`;
    }

    return acc;
  }, '');
  return suffix ? `${source}\n\n${suffix}` : source;
}
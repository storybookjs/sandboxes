"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAddsMap = findAddsMap;
exports.findExportsMap = findExportsMap;
exports.popParametersObjectFromDefaultExport = popParametersObjectFromDefaultExport;
exports.splitExports = splitExports;
exports.splitSTORYOF = splitSTORYOF;

var _csf = require("@storybook/csf");

var _estraverse = _interopRequireDefault(require("estraverse"));

var _parseHelpers = require("./parse-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitSTORYOF(ast, source) {
  let lastIndex = 0;
  const parts = [source];

  _estraverse.default.traverse(ast, {
    fallback: 'iteration',
    enter: node => {
      (0, _parseHelpers.patchNode)(node);

      if (node.type === 'CallExpression') {
        lastIndex = (0, _parseHelpers.handleSTORYOF)(node, parts, source, lastIndex);
      }
    }
  });

  return parts;
}

function isFunctionVariable(declarations, includeExclude) {
  return declarations && declarations.length === 1 && declarations[0].type === 'VariableDeclarator' && declarations[0].id && declarations[0].id.name && declarations[0].init && ['CallExpression', 'ArrowFunctionExpression', 'FunctionExpression'].includes(declarations[0].init.type) && (0, _csf.isExportStory)(declarations[0].id.name, includeExclude);
}

function isFunctionDeclaration(declaration, includeExclude) {
  return declaration.type === 'FunctionDeclaration' && declaration.id && declaration.id.name && (0, _csf.isExportStory)(declaration.id.name, includeExclude);
}

function getDescriptor(metaDeclaration, propertyName) {
  const property = metaDeclaration && metaDeclaration.declaration && metaDeclaration.declaration.properties.find(p => p.key && p.key.name === propertyName);

  if (!property) {
    return undefined;
  }

  const {
    type
  } = property.value;

  switch (type) {
    case 'ArrayExpression':
      return property.value.elements.map(t => {
        if (!['StringLiteral', 'Literal'].includes(t.type)) {
          throw new Error(`Unexpected descriptor element: ${t.type}`);
        }

        return t.value;
      });

    case 'Literal':
    case 'RegExpLiteral':
      return property.value.value;

    default:
      throw new Error(`Unexpected descriptor: ${type}`);
  }
}

function findIncludeExclude(ast) {
  const program = ast && ast.program || ast;
  const metaDeclaration = program && program.body && program.body.find(d => d.type === 'ExportDefaultDeclaration' && d.declaration.type === 'ObjectExpression' && (d.declaration.properties || []).length);
  const includeStories = getDescriptor(metaDeclaration, 'includeStories');
  const excludeStories = getDescriptor(metaDeclaration, 'excludeStories');
  return {
    includeStories,
    excludeStories
  };
}

function splitExports(ast, source) {
  const parts = [];
  let lastIndex = 0;
  const includeExclude = findIncludeExclude(ast);

  _estraverse.default.traverse(ast, {
    fallback: 'iteration',
    enter: node => {
      (0, _parseHelpers.patchNode)(node);
      const isNamedExport = node.type === 'ExportNamedDeclaration' && node.declaration;
      const isFunctionVariableExport = isNamedExport && isFunctionVariable(node.declaration.declarations, includeExclude);
      const isFunctionDeclarationExport = isNamedExport && isFunctionDeclaration(node.declaration, includeExclude);

      if (isFunctionDeclarationExport || isFunctionVariableExport) {
        const functionNode = isFunctionVariableExport ? node.declaration.declarations[0].init : node.declaration;
        parts.push({
          source: source.substring(lastIndex, functionNode.start - 1)
        });
        parts.push({
          source: source.substring(functionNode.start, functionNode.end),
          declaration: {
            isVariableDeclaration: isFunctionVariableExport,
            ident: isFunctionVariableExport ? node.declaration.declarations[0].id.name : functionNode.id.name
          }
        });
        lastIndex = functionNode.end;
      }
    }
  });

  if (source.length > lastIndex + 1) parts.push({
    source: source.substring(lastIndex + 1)
  });
  if (parts.length === 1) return [source];
  return parts;
}

function findAddsMap(ast, storiesOfIdentifiers) {
  const addsMap = {};

  _estraverse.default.traverse(ast, {
    fallback: 'iteration',
    enter: (node, parent) => {
      (0, _parseHelpers.patchNode)(node);

      if (node.type === 'MemberExpression') {
        const {
          toAdd,
          idToFramework
        } = (0, _parseHelpers.handleADD)(node, parent, storiesOfIdentifiers);
        Object.assign(addsMap, toAdd);
      }
    }
  });

  return addsMap;
}

function findExportsMap(ast) {
  const addsMap = {};

  _estraverse.default.traverse(ast, {
    fallback: 'iteration',
    enter: (node, parent) => {
      (0, _parseHelpers.patchNode)(node);
      const isNamedExport = node.type === 'ExportNamedDeclaration' && node.declaration;
      const isFunctionVariableExport = isNamedExport && node.declaration.declarations && node.declaration.declarations.length === 1 && node.declaration.declarations[0].type === 'VariableDeclarator' && node.declaration.declarations[0].id && node.declaration.declarations[0].id.name && node.declaration.declarations[0].init && ['CallExpression', 'ArrowFunctionExpression', 'FunctionExpression'].includes(node.declaration.declarations[0].init.type);
      const isFunctionDeclarationExport = isNamedExport && node.declaration.type === 'FunctionDeclaration' && node.declaration.id && node.declaration.id.name;

      if (isFunctionDeclarationExport || isFunctionVariableExport) {
        const exportDeclaration = isFunctionVariableExport ? node.declaration.declarations[0] : node.declaration;
        const toAdd = (0, _parseHelpers.handleExportedName)(exportDeclaration.id.name, exportDeclaration.init || exportDeclaration, parent);
        Object.assign(addsMap, toAdd);
      }
    }
  });

  return addsMap;
}

function popParametersObjectFromDefaultExport(source, ast) {
  let splicedSource = source;
  let parametersSliceOfCode = '';
  let indexWhereToAppend = -1;
  let foundParametersProperty = false;

  _estraverse.default.traverse(ast, {
    fallback: 'iteration',
    enter: node => {
      var _node$declaration, _node$declaration2, _node$declaration3;

      (0, _parseHelpers.patchNode)(node);
      const isDefaultExport = node.type === 'ExportDefaultDeclaration';
      const isObjectExpression = ((_node$declaration = node.declaration) === null || _node$declaration === void 0 ? void 0 : _node$declaration.type) === 'ObjectExpression';
      const isTsAsExpression = ((_node$declaration2 = node.declaration) === null || _node$declaration2 === void 0 ? void 0 : _node$declaration2.type) === 'TSAsExpression';
      const targetNode = isObjectExpression ? node.declaration : (_node$declaration3 = node.declaration) === null || _node$declaration3 === void 0 ? void 0 : _node$declaration3.expression;

      if (isDefaultExport && (isObjectExpression || isTsAsExpression) && (targetNode.properties || []).length) {
        const parametersProperty = targetNode.properties.find(p => p.key.name === 'parameters' && p.value.type === 'ObjectExpression');
        foundParametersProperty = !!parametersProperty;

        if (foundParametersProperty) {
          (0, _parseHelpers.patchNode)(parametersProperty.value);
        } else {
          (0, _parseHelpers.patchNode)(targetNode);
        }

        splicedSource = parametersProperty ? source.substring(0, parametersProperty.value.start) + source.substring(parametersProperty.value.end + 1) : splicedSource;
        parametersSliceOfCode = parametersProperty ? source.substring(parametersProperty.value.start, parametersProperty.value.end) : '{}';
        indexWhereToAppend = parametersProperty ? parametersProperty.value.start : targetNode.start + 1;
      }
    }
  });

  return {
    splicedSource,
    parametersSliceOfCode,
    indexWhereToAppend,
    foundParametersProperty
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultOptions = _interopRequireDefault(require("./default-options"));

var _parsers = _interopRequireDefault(require("./parsers"));

var _generateHelpers = require("./generate-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendOptions(source, comments, filepath, options) {
  return Object.assign({}, _defaultOptions.default, options, {
    source,
    comments,
    filepath
  });
}

function inject(source, filepath, options = {}, log = message => {}) {
  const {
    injectDecorator = true,
    injectStoryParameters = false
  } = options;
  const obviouslyNotCode = ['md', 'txt', 'json'].includes(options.parser);
  let parser = null;

  try {
    parser = (0, _parsers.default)(options.parser || filepath);
  } catch (e) {
    log(new Error(`(not fatal, only impacting storysource) Could not load a parser (${e})`));
  }

  if (obviouslyNotCode || !parser) {
    return {
      source,
      storySource: {},
      addsMap: {},
      changed: false
    };
  }

  const ast = parser.parse(source);
  const {
    changed,
    source: cleanedSource,
    comments,
    exportTokenFound
  } = injectDecorator === true ? (0, _generateHelpers.generateSourceWithDecorators)(source, ast) : (0, _generateHelpers.generateSourceWithoutDecorators)(source, ast);
  const storySource = (0, _generateHelpers.generateStorySource)(extendOptions(source, comments, filepath, options));
  const newAst = parser.parse(storySource);
  const addsMap = (0, _generateHelpers.generateStoriesLocationsMap)(newAst, []);
  let newSource = cleanedSource;

  if (exportTokenFound) {
    const cleanedSourceAst = parser.parse(cleanedSource);

    if (injectStoryParameters) {
      newSource = (0, _generateHelpers.generateSourcesInStoryParameters)(cleanedSource, cleanedSourceAst, {
        source: storySource,
        locationsMap: addsMap
      });
    } else {
      newSource = (0, _generateHelpers.generateSourcesInExportedParameters)(cleanedSource, cleanedSourceAst, {
        source: storySource,
        locationsMap: addsMap
      });
    }
  }

  if (!changed && Object.keys(addsMap || {}).length === 0) {
    return {
      source: newSource,
      storySource,
      addsMap: {},
      changed
    };
  }

  return {
    source: newSource,
    storySource,
    addsMap,
    changed
  };
}

var _default = inject;
exports.default = _default;
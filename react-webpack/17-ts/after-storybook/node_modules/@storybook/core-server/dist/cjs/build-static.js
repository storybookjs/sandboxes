"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStaticStandalone = buildStaticStandalone;

var _chalk = _interopRequireDefault(require("chalk"));

var _fsExtra = require("fs-extra");

var _path = require("path");

var _tsDedent = require("ts-dedent");

var _global = _interopRequireDefault(require("global"));

var _nodeLogger = require("@storybook/node-logger");

var _telemetry = require("@storybook/telemetry");

var _coreCommon = require("@storybook/core-common");

var _outputStats = require("./utils/output-stats");

var _copyAllStaticFiles = require("./utils/copy-all-static-files");

var _getBuilders = require("./utils/get-builders");

var _storiesJson = require("./utils/stories-json");

var _metadata = require("./utils/metadata");

var _StoryIndexGenerator = require("./utils/StoryIndexGenerator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function buildStaticStandalone(options) {
  var _options$staticDir;

  /* eslint-disable no-param-reassign */
  options.configType = 'PRODUCTION';

  if (options.outputDir === '') {
    throw new Error("Won't remove current directory. Check your outputDir!");
  }

  if ((_options$staticDir = options.staticDir) !== null && _options$staticDir !== void 0 && _options$staticDir.includes('/')) {
    throw new Error("Won't copy root directory. Check your staticDirs!");
  }

  options.outputDir = (0, _path.isAbsolute)(options.outputDir) ? options.outputDir : (0, _path.join)(process.cwd(), options.outputDir);
  options.configDir = (0, _path.resolve)(options.configDir);
  /* eslint-enable no-param-reassign */

  _nodeLogger.logger.info((0, _chalk.default)`=> Cleaning outputDir: {cyan ${options.outputDir.replace(process.cwd(), '')}}`);

  if (options.outputDir === '/') {
    throw new Error("Won't remove directory '/'. Check your outputDir!");
  }

  await (0, _fsExtra.emptyDir)(options.outputDir);
  await (0, _fsExtra.ensureDir)(options.outputDir);

  var _loadMainConfig = (0, _coreCommon.loadMainConfig)(options),
      framework = _loadMainConfig.framework;

  var corePresets = [];
  var frameworkName = typeof framework === 'string' ? framework : framework === null || framework === void 0 ? void 0 : framework.name;

  if (frameworkName) {
    corePresets.push((0, _path.join)(frameworkName, 'preset'));
  } else {
    _nodeLogger.logger.warn(`you have not specified a framework in your ${options.configDir}/main.js`);
  }

  _nodeLogger.logger.info('=> Loading presets');

  var presets = await (0, _coreCommon.loadAllPresets)(_objectSpread({
    corePresets: [require.resolve('./presets/common-preset'), ...corePresets],
    overridePresets: []
  }, options));

  var _await$getBuilders = await (0, _getBuilders.getBuilders)(_objectSpread(_objectSpread({}, options), {}, {
    presets: presets
  })),
      _await$getBuilders2 = _slicedToArray(_await$getBuilders, 2),
      previewBuilder = _await$getBuilders2[0],
      managerBuilder = _await$getBuilders2[1];

  presets = await (0, _coreCommon.loadAllPresets)(_objectSpread({
    corePresets: [require.resolve('./presets/common-preset'), ...(managerBuilder.corePresets || []), ...(previewBuilder.corePresets || []), ...corePresets, require.resolve('./presets/babel-cache-preset')],
    overridePresets: previewBuilder.overridePresets || []
  }, options));

  var _await$Promise$all = await Promise.all([presets.apply('features'), presets.apply('core'), presets.apply('staticDirs'), presets.apply('storyIndexers', []), presets.apply('stories'), presets.apply('docs', {})]),
      _await$Promise$all2 = _slicedToArray(_await$Promise$all, 6),
      features = _await$Promise$all2[0],
      core = _await$Promise$all2[1],
      staticDirs = _await$Promise$all2[2],
      storyIndexers = _await$Promise$all2[3],
      stories = _await$Promise$all2[4],
      docsOptions = _await$Promise$all2[5];

  var fullOptions = _objectSpread(_objectSpread({}, options), {}, {
    presets: presets,
    features: features
  });

  if (staticDirs && options.staticDir) {
    throw new Error((0, _tsDedent.dedent)`
      Conflict when trying to read staticDirs:
      * Storybook's configuration option: 'staticDirs'
      * Storybook's CLI flag: '--staticDir' or '-s'
      
      Choose one of them, but not both.
    `);
  }

  var effects = [];
  _global.default.FEATURES = features;
  await managerBuilder.build({
    startTime: process.hrtime(),
    options: fullOptions
  });

  if (staticDirs) {
    effects.push((0, _copyAllStaticFiles.copyAllStaticFilesRelativeToMain)(staticDirs, options.outputDir, options.configDir));
  }

  if (options.staticDir) {
    effects.push((0, _copyAllStaticFiles.copyAllStaticFiles)(options.staticDir, options.outputDir));
  }

  var coreServerPublicDir = (0, _path.join)((0, _path.dirname)(require.resolve('@storybook/core-server/package.json')), 'public');
  effects.push((0, _fsExtra.copy)(coreServerPublicDir, options.outputDir));
  var initializedStoryIndexGenerator = Promise.resolve(undefined);

  if ((features !== null && features !== void 0 && features.buildStoriesJson || features !== null && features !== void 0 && features.storyStoreV7) && !options.ignorePreview) {
    var workingDir = process.cwd();
    var directories = {
      configDir: options.configDir,
      workingDir: workingDir
    };
    var normalizedStories = (0, _coreCommon.normalizeStories)(stories, directories);
    var generator = new _StoryIndexGenerator.StoryIndexGenerator(normalizedStories, _objectSpread(_objectSpread({}, directories), {}, {
      storyIndexers: storyIndexers,
      docs: docsOptions,
      storiesV2Compatibility: !(features !== null && features !== void 0 && features.breakingChangesV7) && !(features !== null && features !== void 0 && features.storyStoreV7),
      storyStoreV7: !!(features !== null && features !== void 0 && features.storyStoreV7)
    }));
    initializedStoryIndexGenerator = generator.initialize().then(function () {
      return generator;
    });
    effects.push((0, _storiesJson.extractStoriesJson)((0, _path.join)(options.outputDir, 'stories.json'), initializedStoryIndexGenerator, _storiesJson.convertToIndexV3));
    effects.push((0, _storiesJson.extractStoriesJson)((0, _path.join)(options.outputDir, 'index.json'), initializedStoryIndexGenerator));
  }

  if (!(core !== null && core !== void 0 && core.disableTelemetry)) {
    effects.push(initializedStoryIndexGenerator.then(async function (generator) {
      if (!generator) {
        return;
      }

      var storyIndex = await generator.getIndex();
      var payload = storyIndex ? {
        storyIndex: {
          storyCount: Object.keys(storyIndex.entries).length,
          version: storyIndex.v
        }
      } : undefined;
      await (0, _telemetry.telemetry)('build', payload, {
        configDir: options.configDir
      });
    }));
  }

  if (!(core !== null && core !== void 0 && core.disableProjectJson)) {
    effects.push((0, _metadata.extractStorybookMetadata)((0, _path.join)(options.outputDir, 'project.json'), options.configDir));
  }

  if (options.debugWebpack) {
    (0, _coreCommon.logConfig)('Preview webpack config', await previewBuilder.getConfig(fullOptions));
  }

  if (options.ignorePreview) {
    _nodeLogger.logger.info(`=> Not building preview`);
  }

  await Promise.all([...(options.ignorePreview ? [] : [previewBuilder.build({
    startTime: process.hrtime(),
    options: fullOptions
  }).then(async function (previewStats) {
    if (options.webpackStatsJson) {
      var target = options.webpackStatsJson === true ? options.outputDir : options.webpackStatsJson;
      await (0, _outputStats.outputStats)(target, previewStats);
    }
  })]), ...effects]);

  _nodeLogger.logger.info(`=> Output directory: ${options.outputDir}`);
}
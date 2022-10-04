function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import chalk from 'chalk';
import { copy, emptyDir, ensureDir } from 'fs-extra';
import { dirname, isAbsolute, join, resolve } from 'path';
import { dedent } from 'ts-dedent';
import global from 'global';
import { logger } from '@storybook/node-logger';
import { telemetry } from '@storybook/telemetry';
import { loadAllPresets, normalizeStories, logConfig, loadMainConfig } from '@storybook/core-common';
import { outputStats } from './utils/output-stats';
import { copyAllStaticFiles, copyAllStaticFilesRelativeToMain } from './utils/copy-all-static-files';
import { getBuilders } from './utils/get-builders';
import { extractStoriesJson, convertToIndexV3 } from './utils/stories-json';
import { extractStorybookMetadata } from './utils/metadata';
import { StoryIndexGenerator } from './utils/StoryIndexGenerator';
export async function buildStaticStandalone(options) {
  var _options$staticDir;

  /* eslint-disable no-param-reassign */
  options.configType = 'PRODUCTION';

  if (options.outputDir === '') {
    throw new Error("Won't remove current directory. Check your outputDir!");
  }

  if ((_options$staticDir = options.staticDir) !== null && _options$staticDir !== void 0 && _options$staticDir.includes('/')) {
    throw new Error("Won't copy root directory. Check your staticDirs!");
  }

  options.outputDir = isAbsolute(options.outputDir) ? options.outputDir : join(process.cwd(), options.outputDir);
  options.configDir = resolve(options.configDir);
  /* eslint-enable no-param-reassign */

  logger.info(chalk`=> Cleaning outputDir: {cyan ${options.outputDir.replace(process.cwd(), '')}}`);

  if (options.outputDir === '/') {
    throw new Error("Won't remove directory '/'. Check your outputDir!");
  }

  await emptyDir(options.outputDir);
  await ensureDir(options.outputDir);

  var _loadMainConfig = loadMainConfig(options),
      framework = _loadMainConfig.framework;

  var corePresets = [];
  var frameworkName = typeof framework === 'string' ? framework : framework === null || framework === void 0 ? void 0 : framework.name;

  if (frameworkName) {
    corePresets.push(join(frameworkName, 'preset'));
  } else {
    logger.warn(`you have not specified a framework in your ${options.configDir}/main.js`);
  }

  logger.info('=> Loading presets');
  var presets = await loadAllPresets(_objectSpread({
    corePresets: [require.resolve('./presets/common-preset'), ...corePresets],
    overridePresets: []
  }, options));

  var _await$getBuilders = await getBuilders(_objectSpread(_objectSpread({}, options), {}, {
    presets: presets
  })),
      _await$getBuilders2 = _slicedToArray(_await$getBuilders, 2),
      previewBuilder = _await$getBuilders2[0],
      managerBuilder = _await$getBuilders2[1];

  presets = await loadAllPresets(_objectSpread({
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
    throw new Error(dedent`
      Conflict when trying to read staticDirs:
      * Storybook's configuration option: 'staticDirs'
      * Storybook's CLI flag: '--staticDir' or '-s'
      
      Choose one of them, but not both.
    `);
  }

  var effects = [];
  global.FEATURES = features;
  await managerBuilder.build({
    startTime: process.hrtime(),
    options: fullOptions
  });

  if (staticDirs) {
    effects.push(copyAllStaticFilesRelativeToMain(staticDirs, options.outputDir, options.configDir));
  }

  if (options.staticDir) {
    effects.push(copyAllStaticFiles(options.staticDir, options.outputDir));
  }

  var coreServerPublicDir = join(dirname(require.resolve('@storybook/core-server/package.json')), 'public');
  effects.push(copy(coreServerPublicDir, options.outputDir));
  var initializedStoryIndexGenerator = Promise.resolve(undefined);

  if ((features !== null && features !== void 0 && features.buildStoriesJson || features !== null && features !== void 0 && features.storyStoreV7) && !options.ignorePreview) {
    var workingDir = process.cwd();
    var directories = {
      configDir: options.configDir,
      workingDir: workingDir
    };
    var normalizedStories = normalizeStories(stories, directories);
    var generator = new StoryIndexGenerator(normalizedStories, _objectSpread(_objectSpread({}, directories), {}, {
      storyIndexers: storyIndexers,
      docs: docsOptions,
      storiesV2Compatibility: !(features !== null && features !== void 0 && features.breakingChangesV7) && !(features !== null && features !== void 0 && features.storyStoreV7),
      storyStoreV7: !!(features !== null && features !== void 0 && features.storyStoreV7)
    }));
    initializedStoryIndexGenerator = generator.initialize().then(function () {
      return generator;
    });
    effects.push(extractStoriesJson(join(options.outputDir, 'stories.json'), initializedStoryIndexGenerator, convertToIndexV3));
    effects.push(extractStoriesJson(join(options.outputDir, 'index.json'), initializedStoryIndexGenerator));
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
      await telemetry('build', payload, {
        configDir: options.configDir
      });
    }));
  }

  if (!(core !== null && core !== void 0 && core.disableProjectJson)) {
    effects.push(extractStorybookMetadata(join(options.outputDir, 'project.json'), options.configDir));
  }

  if (options.debugWebpack) {
    logConfig('Preview webpack config', await previewBuilder.getConfig(fullOptions));
  }

  if (options.ignorePreview) {
    logger.info(`=> Not building preview`);
  }

  await Promise.all([...(options.ignorePreview ? [] : [previewBuilder.build({
    startTime: process.hrtime(),
    options: fullOptions
  }).then(async function (previewStats) {
    if (options.webpackStatsJson) {
      var target = options.webpackStatsJson === true ? options.outputDir : options.webpackStatsJson;
      await outputStats(target, previewStats);
    }
  })]), ...effects]);
  logger.info(`=> Output directory: ${options.outputDir}`);
}
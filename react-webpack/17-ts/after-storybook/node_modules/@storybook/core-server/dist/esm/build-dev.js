function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { resolvePathInStorybookCache, loadAllPresets, cache, loadMainConfig } from '@storybook/core-common';
import prompts from 'prompts';
import global from 'global';
import { join, resolve } from 'path';
import { logger } from '@storybook/node-logger';
import { storybookDevServer } from './dev-server';
import { getReleaseNotesData, getReleaseNotesFailedState } from './utils/release-notes';
import { outputStats } from './utils/output-stats';
import { outputStartupInformation } from './utils/output-startup-information';
import { updateCheck } from './utils/update-check';
import { getServerPort, getServerChannelUrl } from './utils/server-address';
import { getBuilders } from './utils/get-builders';
export async function buildDevStandalone(options) {
  var packageJson = options.packageJson,
      versionUpdates = options.versionUpdates,
      releaseNotes = options.releaseNotes;
  var version = packageJson.version; // updateInfo and releaseNotesData are cached, so this is typically pretty fast

  var _await$Promise$all = await Promise.all([getServerPort(options.port), versionUpdates ? updateCheck(version) : Promise.resolve({
    success: false,
    data: {},
    time: Date.now()
  }), releaseNotes ? getReleaseNotesData(version, cache) : Promise.resolve(getReleaseNotesFailedState(version))]),
      _await$Promise$all2 = _slicedToArray(_await$Promise$all, 3),
      port = _await$Promise$all2[0],
      versionCheck = _await$Promise$all2[1],
      releaseNotesData = _await$Promise$all2[2];

  if (!options.ci && !options.smokeTest && options.port != null && port !== options.port) {
    var _await$prompts = await prompts({
      type: 'confirm',
      initial: true,
      name: 'shouldChangePort',
      message: `Port ${options.port} is not available. Would you like to run Storybook on port ${port} instead?`
    }),
        shouldChangePort = _await$prompts.shouldChangePort;

    if (!shouldChangePort) process.exit(1);
  }
  /* eslint-disable no-param-reassign */


  options.port = port;
  options.versionCheck = versionCheck;
  options.releaseNotesData = releaseNotesData;
  options.configType = 'DEVELOPMENT';
  options.configDir = resolve(options.configDir);
  options.outputDir = options.smokeTest ? resolvePathInStorybookCache('public') : resolve(options.outputDir || resolvePathInStorybookCache('public'));
  options.serverChannelUrl = getServerChannelUrl(port, options);
  /* eslint-enable no-param-reassign */

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
    corePresets: corePresets,
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
    overridePresets: previewBuilder.overridePresets
  }, options));
  var features = await presets.apply('features');
  global.FEATURES = features;

  var fullOptions = _objectSpread(_objectSpread({}, options), {}, {
    presets: presets,
    features: features
  });

  var _await$storybookDevSe = await storybookDevServer(fullOptions),
      address = _await$storybookDevSe.address,
      networkAddress = _await$storybookDevSe.networkAddress,
      managerResult = _await$storybookDevSe.managerResult,
      previewResult = _await$storybookDevSe.previewResult;

  var previewTotalTime = previewResult && previewResult.totalTime;
  var managerTotalTime = managerResult && managerResult.totalTime;
  var previewStats = previewResult && previewResult.stats;
  var managerStats = managerResult && managerResult.stats;

  if (options.webpackStatsJson) {
    var target = options.webpackStatsJson === true ? options.outputDir : options.webpackStatsJson;
    await outputStats(target, previewStats);
  }

  if (options.smokeTest) {
    var _managerStats$toJson, _previewStats$toJson;

    var warnings = [];
    warnings.push(...((managerStats === null || managerStats === void 0 ? void 0 : (_managerStats$toJson = managerStats.toJson()) === null || _managerStats$toJson === void 0 ? void 0 : _managerStats$toJson.warnings) || []));
    warnings.push(...((previewStats === null || previewStats === void 0 ? void 0 : (_previewStats$toJson = previewStats.toJson()) === null || _previewStats$toJson === void 0 ? void 0 : _previewStats$toJson.warnings) || []));
    var problems = warnings.filter(function (warning) {
      return !warning.message.includes(`export 'useInsertionEffect'`);
    }).filter(function (warning) {
      return !warning.message.includes(`compilation but it's unused`);
    }).filter(function (warning) {
      return !warning.message.includes(`Conflicting values for 'process.env.NODE_ENV'`);
    }); // eslint-disable-next-line no-console

    console.log(problems.map(function (p) {
      return p.stack;
    }));
    process.exit(problems.length > 0 ? 1 : 0);
    return;
  }

  var name = frameworkName.split('@storybook/').length > 1 ? frameworkName.split('@storybook/')[1] : frameworkName;
  outputStartupInformation({
    updateInfo: versionCheck,
    version: version,
    name: name,
    address: address,
    networkAddress: networkAddress,
    managerTotalTime: managerTotalTime,
    previewTotalTime: previewTotalTime
  });
}
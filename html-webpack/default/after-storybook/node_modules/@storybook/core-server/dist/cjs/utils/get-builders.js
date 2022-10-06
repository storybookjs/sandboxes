"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuilders = getBuilders;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function getManagerBuilder() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@storybook/builder-manager'));
  });
}

async function getPreviewBuilder(builderName, configDir) {
  var builderPackage;

  if (builderName) {
    builderPackage = require.resolve(['webpack5'].includes(builderName) ? `@storybook/builder-${builderName}` : builderName, {
      paths: [configDir]
    });
  } else {
    throw new Error('no builder configured!');
  }

  var previewBuilder = await Promise.resolve(`${builderPackage}`).then(function (s) {
    return _interopRequireWildcard(require(s));
  });
  return previewBuilder;
}

async function getBuilders({
  presets: presets,
  configDir: configDir
}) {
  var _core$builder;

  var core = await presets.apply('core', undefined);
  var builderName = typeof (core === null || core === void 0 ? void 0 : core.builder) === 'string' ? core.builder : core === null || core === void 0 ? void 0 : (_core$builder = core.builder) === null || _core$builder === void 0 ? void 0 : _core$builder.name;
  return Promise.all([getPreviewBuilder(builderName, configDir), getManagerBuilder()]);
}
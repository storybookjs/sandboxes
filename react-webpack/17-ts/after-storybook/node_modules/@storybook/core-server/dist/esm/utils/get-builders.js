async function getManagerBuilder() {
  return import('@storybook/builder-manager');
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

  var previewBuilder = await import(builderPackage);
  return previewBuilder;
}

export async function getBuilders({
  presets: presets,
  configDir: configDir
}) {
  var _core$builder;

  var core = await presets.apply('core', undefined);
  var builderName = typeof (core === null || core === void 0 ? void 0 : core.builder) === 'string' ? core.builder : core === null || core === void 0 ? void 0 : (_core$builder = core.builder) === null || _core$builder === void 0 ? void 0 : _core$builder.name;
  return Promise.all([getPreviewBuilder(builderName, configDir), getManagerBuilder()]);
}
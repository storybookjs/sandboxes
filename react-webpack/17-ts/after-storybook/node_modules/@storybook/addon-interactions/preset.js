const { checkActionsLoaded } = require('./dist/preset/checkActionsLoaded');

function previewAnnotations(entry = [], options) {
  checkActionsLoaded(options.configDir);
  return entry;
}

module.exports = {
  previewAnnotations,
};

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractStorybookMetadata = extractStorybookMetadata;
exports.useStorybookMetadata = useStorybookMetadata;

var _fsExtra = require("fs-extra");

var _telemetry = require("@storybook/telemetry");

async function extractStorybookMetadata(outputFile, configDir) {
  var storybookMetadata = await (0, _telemetry.getStorybookMetadata)(configDir);
  await (0, _fsExtra.writeJSON)(outputFile, storybookMetadata);
}

function useStorybookMetadata(router, configDir) {
  router.use('/project.json', async function (req, res) {
    var storybookMetadata = await (0, _telemetry.getStorybookMetadata)(configDir);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(storybookMetadata));
  });
}
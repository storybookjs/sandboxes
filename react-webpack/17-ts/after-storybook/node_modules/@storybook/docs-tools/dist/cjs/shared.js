"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceType = exports.SNIPPET_RENDERED = exports.PARAM_KEY = exports.PANEL_ID = exports.ADDON_ID = void 0;
const ADDON_ID = 'storybook/docs';
exports.ADDON_ID = ADDON_ID;
const PANEL_ID = `${ADDON_ID}/panel`;
exports.PANEL_ID = PANEL_ID;
const PARAM_KEY = `docs`;
exports.PARAM_KEY = PARAM_KEY;
const SNIPPET_RENDERED = `${ADDON_ID}/snippet-rendered`;
exports.SNIPPET_RENDERED = SNIPPET_RENDERED;
let SourceType;
exports.SourceType = SourceType;

(function (SourceType) {
  SourceType["AUTO"] = "auto";
  SourceType["CODE"] = "code";
  SourceType["DYNAMIC"] = "dynamic";
})(SourceType || (exports.SourceType = SourceType = {}));
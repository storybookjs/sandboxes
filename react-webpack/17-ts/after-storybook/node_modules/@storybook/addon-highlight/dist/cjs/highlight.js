"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlightStyle = exports.highlightObject = void 0;

var _global = _interopRequireDefault(require("global"));

var _addons = require("@storybook/addons");

var _coreEvents = require("@storybook/core-events");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env browser */
const {
  document
} = _global.default;

const highlightStyle = (color = '#FF4785', style = 'dashed') => `
  outline: 2px ${style} ${color};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`;

exports.highlightStyle = highlightStyle;

const highlightObject = color => ({
  outline: `2px dashed ${color}`,
  outlineOffset: 2,
  boxShadow: '0 0 0 6px rgba(255,255,255,0.6)'
});

exports.highlightObject = highlightObject;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

const channel = _addons.addons.getChannel();

const highlight = infos => {
  const id = _constants.HIGHLIGHT_STYLE_ID;
  resetHighlight(); // Make sure there are no duplicated selectors

  const elements = Array.from(new Set(infos.elements));
  const sheet = document.createElement('style');
  sheet.setAttribute('id', id);
  sheet.innerHTML = elements.map(target => `${target}{
          ${highlightStyle(infos.color, infos.style)}
         }`).join(' ');
  document.head.appendChild(sheet);
};

const resetHighlight = () => {
  const id = _constants.HIGHLIGHT_STYLE_ID;
  const sheetToBeRemoved = document.getElementById(id);

  if (sheetToBeRemoved) {
    sheetToBeRemoved.parentNode.removeChild(sheetToBeRemoved);
  }
};

channel.on(_coreEvents.STORY_CHANGED, resetHighlight);
channel.on(_constants.RESET_HIGHLIGHT, resetHighlight);
channel.on(_constants.HIGHLIGHT, highlight);
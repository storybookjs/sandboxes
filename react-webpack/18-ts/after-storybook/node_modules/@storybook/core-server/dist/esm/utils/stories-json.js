var _excluded = ["type"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { writeJSON } from 'fs-extra';
import debounce from 'lodash/debounce';
import { STORY_INDEX_INVALIDATED } from '@storybook/core-events';
import { watchStorySpecifiers } from './watch-story-specifiers';
export var DEBOUNCE = 100;
export async function extractStoriesJson(outputFile, initializedStoryIndexGenerator, transform) {
  var generator = await initializedStoryIndexGenerator;
  var storyIndex = await generator.getIndex();
  await writeJSON(outputFile, transform ? transform(storyIndex) : storyIndex);
}
export function useStoriesJson({
  router: router,
  initializedStoryIndexGenerator: initializedStoryIndexGenerator,
  workingDir = process.cwd(),
  serverChannel: serverChannel,
  normalizedStories: normalizedStories
}) {
  var maybeInvalidate = debounce(function () {
    return serverChannel.emit(STORY_INDEX_INVALIDATED);
  }, DEBOUNCE, {
    leading: true
  });
  watchStorySpecifiers(normalizedStories, {
    workingDir: workingDir
  }, async function (specifier, path, removed) {
    var generator = await initializedStoryIndexGenerator;
    generator.invalidate(specifier, path, removed);
    maybeInvalidate();
  });
  router.use('/index.json', async function (req, res) {
    try {
      var generator = await initializedStoryIndexGenerator;

      var _index = await generator.getIndex();

      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(_index));
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  });
  router.use('/stories.json', async function (req, res) {
    try {
      var generator = await initializedStoryIndexGenerator;

      var _index2 = convertToIndexV3(await generator.getIndex());

      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(_index2));
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  });
}
export var convertToIndexV3 = function (index) {
  var entries = index.entries;
  var stories = Object.entries(entries).reduce(function (acc, [id, entry]) {
    var type = entry.type,
        rest = _objectWithoutProperties(entry, _excluded);

    acc[id] = _objectSpread(_objectSpread({}, rest), {}, {
      kind: rest.title,
      story: rest.name,
      parameters: {
        __id: rest.id,
        docsOnly: type === 'docs',
        fileName: rest.importPath
      }
    });
    return acc;
  }, {});
  return {
    v: 3,
    stories: stories
  };
};
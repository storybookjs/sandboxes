"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = void 0;

var _tsDedent = require("ts-dedent");

var _global = _interopRequireDefault(require("global"));

var _synchronousPromise = require("synchronous-promise");

var _coreEvents = require("@storybook/core-events");

var _clientLogger = require("@storybook/client-logger");

var _addons = require("@storybook/addons");

var _store = require("@storybook/store");

var _StoryRender = require("./render/StoryRender");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  fetch
} = _global.default;
const STORY_INDEX_PATH = './index.json';

class Preview {
  constructor(channel = _addons.addons.getChannel()) {
    var _global$FEATURES;

    this.channel = channel;
    this.serverChannel = void 0;
    this.storyStore = void 0;
    this.getStoryIndex = void 0;
    this.importFn = void 0;
    this.renderToDOM = void 0;
    this.storyRenders = [];
    this.previewEntryError = void 0;

    if ((_global$FEATURES = _global.default.FEATURES) !== null && _global$FEATURES !== void 0 && _global$FEATURES.storyStoreV7 && _addons.addons.hasServerChannel()) {
      this.serverChannel = _addons.addons.getServerChannel();
    }

    this.storyStore = new _store.StoryStore();
  } // INITIALIZATION
  // NOTE: the reason that the preview and store's initialization code is written in a promise
  // style and not `async-await`, and the use of `SynchronousPromise`s is in order to allow
  // storyshots to immediately call `raw()` on the store without waiting for a later tick.
  // (Even simple things like `Promise.resolve()` and `await` involve the callback happening
  // in the next promise "tick").
  // See the comment in `storyshots-core/src/api/index.ts` for more detail.


  initialize({
    getStoryIndex,
    importFn,
    getProjectAnnotations
  }) {
    // We save these two on initialization in case `getProjectAnnotations` errors,
    // in which case we may need them later when we recover.
    this.getStoryIndex = getStoryIndex;
    this.importFn = importFn;
    this.setupListeners();
    return this.getProjectAnnotationsOrRenderError(getProjectAnnotations).then(projectAnnotations => this.initializeWithProjectAnnotations(projectAnnotations));
  }

  setupListeners() {
    var _this$serverChannel;

    (_this$serverChannel = this.serverChannel) === null || _this$serverChannel === void 0 ? void 0 : _this$serverChannel.on(_coreEvents.STORY_INDEX_INVALIDATED, this.onStoryIndexChanged.bind(this));
    this.channel.on(_coreEvents.UPDATE_GLOBALS, this.onUpdateGlobals.bind(this));
    this.channel.on(_coreEvents.UPDATE_STORY_ARGS, this.onUpdateArgs.bind(this));
    this.channel.on(_coreEvents.RESET_STORY_ARGS, this.onResetArgs.bind(this));
    this.channel.on(_coreEvents.FORCE_RE_RENDER, this.onForceReRender.bind(this));
    this.channel.on(_coreEvents.FORCE_REMOUNT, this.onForceRemount.bind(this));
  }

  getProjectAnnotationsOrRenderError(getProjectAnnotations) {
    return _synchronousPromise.SynchronousPromise.resolve().then(getProjectAnnotations).then(projectAnnotations => {
      this.renderToDOM = projectAnnotations.renderToDOM;

      if (!this.renderToDOM) {
        throw new Error((0, _tsDedent.dedent)`
            Expected your framework's preset to export a \`renderToDOM\` field.

            Perhaps it needs to be upgraded for Storybook 6.4?

            More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field
          `);
      }

      return projectAnnotations;
    }).catch(err => {
      // This is an error extracting the projectAnnotations (i.e. evaluating the previewEntries) and
      // needs to be show to the user as a simple error
      this.renderPreviewEntryError('Error reading preview.js:', err);
      throw err;
    });
  } // If initialization gets as far as project annotations, this function runs.


  initializeWithProjectAnnotations(projectAnnotations) {
    var _global$FEATURES2;

    this.storyStore.setProjectAnnotations(projectAnnotations);
    this.setInitialGlobals();
    let storyIndexPromise;

    if ((_global$FEATURES2 = _global.default.FEATURES) !== null && _global$FEATURES2 !== void 0 && _global$FEATURES2.storyStoreV7) {
      storyIndexPromise = this.getStoryIndexFromServer();
    } else {
      if (!this.getStoryIndex) {
        throw new Error('No `getStoryIndex` passed defined in v6 mode');
      }

      storyIndexPromise = _synchronousPromise.SynchronousPromise.resolve().then(this.getStoryIndex);
    }

    return storyIndexPromise.then(storyIndex => this.initializeWithStoryIndex(storyIndex)).catch(err => {
      this.renderPreviewEntryError('Error loading story index:', err);
      throw err;
    });
  }

  async setInitialGlobals() {
    this.emitGlobals();
  }

  emitGlobals() {
    if (!this.storyStore.globals || !this.storyStore.projectAnnotations) throw new Error(`Cannot emit before initialization`);
    this.channel.emit(_coreEvents.SET_GLOBALS, {
      globals: this.storyStore.globals.get() || {},
      globalTypes: this.storyStore.projectAnnotations.globalTypes || {}
    });
  }

  async getStoryIndexFromServer() {
    const result = await fetch(STORY_INDEX_PATH);
    if (result.status === 200) return result.json();
    throw new Error(await result.text());
  } // If initialization gets as far as the story index, this function runs.


  initializeWithStoryIndex(storyIndex) {
    var _global$FEATURES3;

    if (!this.importFn) throw new Error(`Cannot call initializeWithStoryIndex before initialization`);
    return this.storyStore.initialize({
      storyIndex,
      importFn: this.importFn,
      cache: !((_global$FEATURES3 = _global.default.FEATURES) !== null && _global$FEATURES3 !== void 0 && _global$FEATURES3.storyStoreV7)
    });
  } // EVENT HANDLERS
  // This happens when a config file gets reloaded


  async onGetProjectAnnotationsChanged({
    getProjectAnnotations
  }) {
    delete this.previewEntryError;
    const projectAnnotations = await this.getProjectAnnotationsOrRenderError(getProjectAnnotations);

    if (!this.storyStore.projectAnnotations) {
      await this.initializeWithProjectAnnotations(projectAnnotations);
      return;
    }

    await this.storyStore.setProjectAnnotations(projectAnnotations);
    this.emitGlobals();
  }

  async onStoryIndexChanged() {
    delete this.previewEntryError;

    if (!this.storyStore.projectAnnotations) {
      // We haven't successfully set project annotations yet,
      // we need to do that before we can do anything else.
      return;
    }

    try {
      const storyIndex = await this.getStoryIndexFromServer(); // This is the first time the story index worked, let's load it into the store

      if (!this.storyStore.storyIndex) {
        await this.initializeWithStoryIndex(storyIndex);
      } // Update the store with the new stories.


      await this.onStoriesChanged({
        storyIndex
      });
    } catch (err) {
      this.renderPreviewEntryError('Error loading story index:', err);
      throw err;
    }
  } // This happens when a glob gets HMR-ed


  async onStoriesChanged({
    importFn,
    storyIndex
  }) {
    await this.storyStore.onStoriesChanged({
      importFn,
      storyIndex
    });
  }

  async onUpdateGlobals({
    globals
  }) {
    if (!this.storyStore.globals) throw new Error(`Cannot call onUpdateGlobals before initialization`);
    this.storyStore.globals.update(globals);
    await Promise.all(this.storyRenders.map(r => r.rerender()));
    this.channel.emit(_coreEvents.GLOBALS_UPDATED, {
      globals: this.storyStore.globals.get(),
      initialGlobals: this.storyStore.globals.initialGlobals
    });
  }

  async onUpdateArgs({
    storyId,
    updatedArgs
  }) {
    this.storyStore.args.update(storyId, updatedArgs);
    await Promise.all(this.storyRenders.filter(r => r.id === storyId).map(r => r.rerender()));
    this.channel.emit(_coreEvents.STORY_ARGS_UPDATED, {
      storyId,
      args: this.storyStore.args.get(storyId)
    });
  }

  async onResetArgs({
    storyId,
    argNames
  }) {
    // NOTE: we have to be careful here and avoid await-ing when updating a rendered's args.
    // That's because below in `renderStoryToElement` we have also bound to this event and will
    // render the story in the same tick.
    // However, we can do that safely as the current story is available in `this.storyRenders`
    const render = this.storyRenders.find(r => r.id === storyId);
    const story = (render === null || render === void 0 ? void 0 : render.story) || (await this.storyStore.loadStory({
      storyId
    }));
    const argNamesToReset = argNames || [...new Set([...Object.keys(story.initialArgs), ...Object.keys(this.storyStore.args.get(storyId))])];
    const updatedArgs = argNamesToReset.reduce((acc, argName) => {
      acc[argName] = story.initialArgs[argName];
      return acc;
    }, {});
    await this.onUpdateArgs({
      storyId,
      updatedArgs
    });
  } // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant


  async onForceReRender() {
    await Promise.all(this.storyRenders.map(r => r.rerender()));
  }

  async onForceRemount({
    storyId
  }) {
    await Promise.all(this.storyRenders.filter(r => r.id === storyId).map(r => r.remount()));
  } // Used by docs' modernInlineRender to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.


  renderStoryToElement(story, element) {
    if (!this.renderToDOM) throw new Error(`Cannot call renderStoryToElement before initialization`);
    const render = new _StoryRender.StoryRender(this.channel, this.storyStore, this.renderToDOM, this.inlineStoryCallbacks(story.id), story.id, 'docs', story);
    render.renderToElement(element);
    this.storyRenders.push(render);
    return async () => {
      await this.teardownRender(render);
    };
  }

  async teardownRender(render, {
    viewModeChanged
  } = {}) {
    var _render$teardown;

    this.storyRenders = this.storyRenders.filter(r => r !== render);
    await (render === null || render === void 0 ? void 0 : (_render$teardown = render.teardown) === null || _render$teardown === void 0 ? void 0 : _render$teardown.call(render, {
      viewModeChanged
    }));
  } // API


  async extract(options) {
    var _global$FEATURES4;

    if (this.previewEntryError) {
      throw this.previewEntryError;
    }

    if (!this.storyStore.projectAnnotations) {
      // In v6 mode, if your preview.js throws, we never get a chance to initialize the preview
      // or store, and the error is simply logged to the browser console. This is the best we can do
      throw new Error((0, _tsDedent.dedent)`Failed to initialize Storybook.

      Do you have an error in your \`preview.js\`? Check your Storybook's browser console for errors.`);
    }

    if ((_global$FEATURES4 = _global.default.FEATURES) !== null && _global$FEATURES4 !== void 0 && _global$FEATURES4.storyStoreV7) {
      await this.storyStore.cacheAllCSFFiles();
    }

    return this.storyStore.extract(options);
  } // UTILITIES


  inlineStoryCallbacks(storyId) {
    return {
      showMain: () => {},
      showError: err => _clientLogger.logger.error(`Error rendering docs story (${storyId})`, err),
      showException: err => _clientLogger.logger.error(`Error rendering docs story (${storyId})`, err)
    };
  }

  renderPreviewEntryError(reason, err) {
    this.previewEntryError = err;

    _clientLogger.logger.error(reason);

    _clientLogger.logger.error(err);

    this.channel.emit(_coreEvents.CONFIG_ERROR, err);
  }

}

exports.Preview = Preview;
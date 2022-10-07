"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewWeb = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = require("ts-dedent");

var _global = _interopRequireDefault(require("global"));

var _coreEvents = require("@storybook/core-events");

var _clientLogger = require("@storybook/client-logger");

var _Preview = require("./Preview");

var _UrlStore = require("./UrlStore");

var _WebView = require("./WebView");

var _Render = require("./render/Render");

var _StoryRender = require("./render/StoryRender");

var _TemplateDocsRender = require("./render/TemplateDocsRender");

var _StandaloneDocsRender = require("./render/StandaloneDocsRender");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  window: globalWindow
} = _global.default;

function focusInInput(event) {
  const target = event.target;
  return /input|textarea/i.test(target.tagName) || target.getAttribute('contenteditable') !== null;
}

function isStoryRender(r) {
  return r.type === 'story';
}

class PreviewWeb extends _Preview.Preview {
  constructor() {
    super();
    this.urlStore = void 0;
    this.view = void 0;
    this.previewEntryError = void 0;
    this.currentSelection = void 0;
    this.currentRender = void 0;
    this.view = new _WebView.WebView();
    this.urlStore = new _UrlStore.UrlStore(); // Add deprecated APIs for back-compat
    // @ts-expect-error (Converted from ts-ignore)

    this.storyStore.getSelection = (0, _utilDeprecate.default)(() => this.urlStore.selection, (0, _tsDedent.dedent)`
        \`__STORYBOOK_STORY_STORE__.getSelection()\` is deprecated and will be removed in 7.0.

        To get the current selection, use the \`useStoryContext()\` hook from \`@storybook/addons\`.
      `);
  }

  setupListeners() {
    super.setupListeners();
    globalWindow.onkeydown = this.onKeydown.bind(this);
    this.channel.on(_coreEvents.SET_CURRENT_STORY, this.onSetCurrentStory.bind(this));
    this.channel.on(_coreEvents.UPDATE_QUERY_PARAMS, this.onUpdateQueryParams.bind(this));
    this.channel.on(_coreEvents.PRELOAD_ENTRIES, this.onPreloadStories.bind(this));
  }

  initializeWithProjectAnnotations(projectAnnotations) {
    return super.initializeWithProjectAnnotations(projectAnnotations).then(() => this.setInitialGlobals());
  }

  async setInitialGlobals() {
    if (!this.storyStore.globals) throw new Error(`Cannot call setInitialGlobals before initialization`);
    const {
      globals
    } = this.urlStore.selectionSpecifier || {};

    if (globals) {
      this.storyStore.globals.updateFromPersisted(globals);
    }

    this.emitGlobals();
  } // If initialization gets as far as the story index, this function runs.


  initializeWithStoryIndex(storyIndex) {
    return super.initializeWithStoryIndex(storyIndex).then(() => {
      var _global$FEATURES;

      if (!((_global$FEATURES = _global.default.FEATURES) !== null && _global$FEATURES !== void 0 && _global$FEATURES.storyStoreV7)) {
        this.channel.emit(_coreEvents.SET_STORIES, this.storyStore.getSetStoriesPayload());
      }

      return this.selectSpecifiedStory();
    });
  } // Use the selection specifier to choose a story, then render it


  async selectSpecifiedStory() {
    if (!this.storyStore.storyIndex) throw new Error(`Cannot call selectSpecifiedStory before initialization`);

    if (!this.urlStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }

    const {
      storySpecifier,
      args
    } = this.urlStore.selectionSpecifier;
    const entry = this.storyStore.storyIndex.entryFromSpecifier(storySpecifier);

    if (!entry) {
      if (storySpecifier === '*') {
        this.renderStoryLoadingException(storySpecifier, new Error((0, _tsDedent.dedent)`
            Couldn't find any stories in your Storybook.
            - Please check your stories field of your main.js config.
            - Also check the browser console and terminal for error messages.
          `));
      } else {
        this.renderStoryLoadingException(storySpecifier, new Error((0, _tsDedent.dedent)`
            Couldn't find story matching '${storySpecifier}'.
            - Are you sure a story with that id exists?
            - Please check your stories field of your main.js config.
            - Also check the browser console and terminal for error messages.
          `));
      }

      return;
    }

    const {
      id: storyId,
      type: viewMode
    } = entry;
    this.urlStore.setSelection({
      storyId,
      viewMode
    });
    this.channel.emit(_coreEvents.STORY_SPECIFIED, this.urlStore.selection);
    this.channel.emit(_coreEvents.CURRENT_STORY_WAS_SET, this.urlStore.selection);
    await this.renderSelection({
      persistedArgs: args
    });
  } // EVENT HANDLERS
  // This happens when a config file gets reloaded


  async onGetProjectAnnotationsChanged({
    getProjectAnnotations
  }) {
    await super.onGetProjectAnnotationsChanged({
      getProjectAnnotations
    });

    if (this.urlStore.selection) {
      this.renderSelection();
    }
  } // This happens when a glob gets HMR-ed


  async onStoriesChanged({
    importFn,
    storyIndex
  }) {
    var _global$FEATURES2;

    super.onStoriesChanged({
      importFn,
      storyIndex
    });

    if (!((_global$FEATURES2 = _global.default.FEATURES) !== null && _global$FEATURES2 !== void 0 && _global$FEATURES2.storyStoreV7)) {
      this.channel.emit(_coreEvents.SET_STORIES, await this.storyStore.getSetStoriesPayload());
    }

    if (this.urlStore.selection) {
      await this.renderSelection();
    } else {
      // Our selection has never applied before, but maybe it does now, let's try!
      await this.selectSpecifiedStory();
    }
  }

  onKeydown(event) {
    var _this$currentRender;

    if (!((_this$currentRender = this.currentRender) !== null && _this$currentRender !== void 0 && _this$currentRender.disableKeyListeners) && !focusInInput(event)) {
      // We have to pick off the keys of the event that we need on the other side
      const {
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        key,
        code,
        keyCode
      } = event;
      this.channel.emit(_coreEvents.PREVIEW_KEYDOWN, {
        event: {
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          key,
          code,
          keyCode
        }
      });
    }
  }

  onSetCurrentStory(selection) {
    this.urlStore.setSelection(Object.assign({
      viewMode: 'story'
    }, selection));
    this.channel.emit(_coreEvents.CURRENT_STORY_WAS_SET, this.urlStore.selection);
    this.renderSelection();
  }

  onUpdateQueryParams(queryParams) {
    this.urlStore.setQueryParams(queryParams);
  }

  async onUpdateGlobals({
    globals
  }) {
    super.onUpdateGlobals({
      globals
    });

    if (this.currentRender instanceof _StandaloneDocsRender.StandaloneDocsRender || this.currentRender instanceof _TemplateDocsRender.TemplateDocsRender) {
      var _this$currentRender$r, _this$currentRender2;

      await ((_this$currentRender$r = (_this$currentRender2 = this.currentRender).rerender) === null || _this$currentRender$r === void 0 ? void 0 : _this$currentRender$r.call(_this$currentRender2));
    }
  }

  async onUpdateArgs({
    storyId,
    updatedArgs
  }) {
    super.onUpdateArgs({
      storyId,
      updatedArgs
    });
  }

  async onPreloadStories({
    ids
  }) {
    /**
     * It's possible that we're trying to preload a story in a ref we haven't loaded the iframe for yet.
     * Because of the way the targeting works, if we can't find the targeted iframe,
     * we'll use the currently active iframe which can cause the event to be targeted
     * to the wrong iframe, causing an error if the storyId does not exists there.
     */
    await Promise.allSettled(ids.map(id => this.storyStore.loadEntry(id)));
  } // RENDERING
  // We can either have:
  // - a story selected in "story" viewMode,
  //     in which case we render it to the root element, OR
  // - a story selected in "docs" viewMode,
  //     in which case we render the docsPage for that story


  async renderSelection({
    persistedArgs
  } = {}) {
    var _this$currentSelectio, _this$currentRender3, _this$currentRender4;

    const {
      renderToDOM
    } = this;
    if (!renderToDOM) throw new Error('Cannot call renderSelection before initialization');
    const {
      selection
    } = this.urlStore;
    if (!selection) throw new Error('Cannot call renderSelection as no selection was made');
    const {
      storyId
    } = selection;
    let entry;

    try {
      entry = await this.storyStore.storyIdToEntry(storyId);
    } catch (err) {
      if (this.currentRender) await this.teardownRender(this.currentRender);
      this.renderStoryLoadingException(storyId, err);
      return;
    }

    const storyIdChanged = ((_this$currentSelectio = this.currentSelection) === null || _this$currentSelectio === void 0 ? void 0 : _this$currentSelectio.storyId) !== storyId;
    const viewModeChanged = ((_this$currentRender3 = this.currentRender) === null || _this$currentRender3 === void 0 ? void 0 : _this$currentRender3.type) !== entry.type; // Show a spinner while we load the next story

    if (entry.type === 'story') {
      this.view.showPreparingStory({
        immediate: viewModeChanged
      });
    } else {
      this.view.showPreparingDocs();
    } // If the last render is still preparing, let's drop it right now. Either
    //   (a) it is a different story, which means we would drop it later, OR
    //   (b) it is the *same* story, in which case we will resolve our own .prepare() at the
    //       same moment anyway, and we should just "take over" the rendering.
    // (We can't tell which it is yet, because it is possible that an HMR is going on and
    //  even though the storyId is the same, the story itself is not).


    if ((_this$currentRender4 = this.currentRender) !== null && _this$currentRender4 !== void 0 && _this$currentRender4.isPreparing()) {
      await this.teardownRender(this.currentRender);
    }

    let render;

    if (entry.type === 'story') {
      render = new _StoryRender.StoryRender(this.channel, this.storyStore, (...args) => {
        // At the start of renderToDOM we make the story visible (see note in WebView)
        this.view.showStoryDuringRender();
        return renderToDOM(...args);
      }, this.mainStoryCallbacks(storyId), storyId, 'story');
    } else if (entry.standalone) {
      render = new _StandaloneDocsRender.StandaloneDocsRender(this.channel, this.storyStore, entry);
    } else {
      render = new _TemplateDocsRender.TemplateDocsRender(this.channel, this.storyStore, entry);
    } // We need to store this right away, so if the story changes during
    // the async `.prepare()` below, we can (potentially) cancel it


    const lastSelection = this.currentSelection;
    this.currentSelection = selection;
    const lastRender = this.currentRender;
    this.currentRender = render;

    try {
      await render.prepare();
    } catch (err) {
      if (err !== _Render.PREPARE_ABORTED) {
        // We are about to render an error so make sure the previous story is
        // no longer rendered.
        if (lastRender) await this.teardownRender(lastRender);
        this.renderStoryLoadingException(storyId, err);
      }

      return;
    }

    const implementationChanged = !storyIdChanged && lastRender && !render.isEqual(lastRender);

    if (persistedArgs && isStoryRender(render)) {
      if (!render.story) throw new Error('Render has not been prepared!');
      this.storyStore.args.updateFromPersisted(render.story, persistedArgs);
    } // Don't re-render the story if nothing has changed to justify it


    if (lastRender && !lastRender.torndown && !storyIdChanged && !implementationChanged && !viewModeChanged) {
      this.currentRender = lastRender;
      this.channel.emit(_coreEvents.STORY_UNCHANGED, storyId);
      this.view.showMain();
      return;
    } // Wait for the previous render to leave the page. NOTE: this will wait to ensure anything async
    // is properly aborted, which (in some cases) can lead to the whole screen being refreshed.


    if (lastRender) await this.teardownRender(lastRender, {
      viewModeChanged
    }); // If we are rendering something new (as opposed to re-rendering the same or first story), emit

    if (lastSelection && (storyIdChanged || viewModeChanged)) {
      this.channel.emit(_coreEvents.STORY_CHANGED, storyId);
    }

    if (isStoryRender(render)) {
      var _global$FEATURES3;

      if (!render.story) throw new Error('Render has not been prepared!');
      const {
        parameters,
        initialArgs,
        argTypes,
        args
      } = this.storyStore.getStoryContext(render.story);

      if ((_global$FEATURES3 = _global.default.FEATURES) !== null && _global$FEATURES3 !== void 0 && _global$FEATURES3.storyStoreV7) {
        this.channel.emit(_coreEvents.STORY_PREPARED, {
          id: storyId,
          parameters,
          initialArgs,
          argTypes,
          args
        });
      } // For v6 mode / compatibility
      // If the implementation changed, or args were persisted, the args may have changed,
      // and the STORY_PREPARED event above may not be respected.


      if (implementationChanged || persistedArgs) {
        this.channel.emit(_coreEvents.STORY_ARGS_UPDATED, {
          storyId,
          args
        });
      }
    }

    if (isStoryRender(render)) {
      if (!render.story) throw new Error('Render has not been prepared!');
      this.storyRenders.push(render);
      this.currentRender.renderToElement(this.view.prepareForStory(render.story));
    } else {
      this.currentRender.renderToElement(this.view.prepareForDocs(), this.renderStoryToElement.bind(this));
    }
  }

  async teardownRender(render, {
    viewModeChanged = false
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


  mainStoryCallbacks(storyId) {
    return {
      showMain: () => this.view.showMain(),
      showError: err => this.renderError(storyId, err),
      showException: err => this.renderException(storyId, err)
    };
  }

  inlineStoryCallbacks(storyId) {
    return {
      showMain: () => {},
      showError: err => _clientLogger.logger.error(`Error rendering docs story (${storyId})`, err),
      showException: err => _clientLogger.logger.error(`Error rendering docs story (${storyId})`, err)
    };
  }

  renderPreviewEntryError(reason, err) {
    super.renderPreviewEntryError(reason, err);
    this.view.showErrorDisplay(err);
  }

  renderMissingStory() {
    this.view.showNoPreview();
    this.channel.emit(_coreEvents.STORY_MISSING);
  }

  renderStoryLoadingException(storySpecifier, err) {
    _clientLogger.logger.error(`Unable to load story '${storySpecifier}':`);

    _clientLogger.logger.error(err);

    this.view.showErrorDisplay(err);
    this.channel.emit(_coreEvents.STORY_MISSING, storySpecifier);
  } // renderException is used if we fail to render the story and it is uncaught by the app layer


  renderException(storyId, error) {
    const {
      name = 'Error',
      message = String(error),
      stack
    } = error;
    this.channel.emit(_coreEvents.STORY_THREW_EXCEPTION, {
      name,
      message,
      stack
    });
    this.channel.emit(_coreEvents.STORY_RENDER_PHASE_CHANGED, {
      newPhase: 'errored',
      storyId
    }); // Ignored exceptions exist for control flow purposes, and are typically handled elsewhere.

    if (error !== _coreEvents.IGNORED_EXCEPTION) {
      this.view.showErrorDisplay(error);

      _clientLogger.logger.error(`Error rendering story '${storyId}':`);

      _clientLogger.logger.error(error);
    }
  } // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story


  renderError(storyId, {
    title,
    description
  }) {
    _clientLogger.logger.error(`Error rendering story ${title}: ${description}`);

    this.channel.emit(_coreEvents.STORY_ERRORED, {
      title,
      description
    });
    this.channel.emit(_coreEvents.STORY_RENDER_PHASE_CHANGED, {
      newPhase: 'errored',
      storyId
    });
    this.view.showErrorDisplay({
      message: title,
      stack: description
    });
  }

}

exports.PreviewWeb = PreviewWeb;
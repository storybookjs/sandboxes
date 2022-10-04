"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForRenderPhase = exports.waitForRender = exports.waitForQuiescence = exports.waitForEvents = exports.teardownRenderToDOM = exports.storyIndex = exports.standaloneDocsExports = exports.projectAnnotations = exports.mockChannel = exports.importFn = exports.getStoryIndex = exports.getProjectAnnotations = exports.extraComponentOneExports = exports.emitter = exports.docsRenderer = exports.componentTwoExports = exports.componentOneExports = void 0;

var _events = require("events");

var _coreEvents = require("@storybook/core-events");

const componentOneExports = {
  default: {
    title: 'Component One',
    argTypes: {
      foo: {
        type: {
          name: 'string'
        }
      }
    },
    loaders: [jest.fn()],
    parameters: {
      docs: {
        page: jest.fn(),
        container: jest.fn()
      }
    }
  },
  a: {
    args: {
      foo: 'a'
    },
    play: jest.fn()
  },
  b: {
    args: {
      foo: 'b'
    },
    play: jest.fn()
  }
};
exports.componentOneExports = componentOneExports;
const componentTwoExports = {
  default: {
    title: 'Component Two'
  },
  c: {
    args: {
      foo: 'c'
    }
  }
};
exports.componentTwoExports = componentTwoExports;
const standaloneDocsExports = {
  default: jest.fn()
}; // If a second file defines stories for componentOne

exports.standaloneDocsExports = standaloneDocsExports;
const extraComponentOneExports = {
  default: {
    title: 'Component One',
    parameters: {
      docs: {
        page: jest.fn()
      }
    }
  },
  e: {}
};
exports.extraComponentOneExports = extraComponentOneExports;
const importFn = jest.fn(async path => ({
  './src/ComponentOne.stories.js': componentOneExports,
  './src/ComponentTwo.stories.js': componentTwoExports,
  './src/Introduction.mdx': standaloneDocsExports,
  './src/ExtraComponentOne.stories.js': extraComponentOneExports
})[path]);
exports.importFn = importFn;
const docsRenderer = {
  render: jest.fn().mockImplementation((context, parameters, element, cb) => cb()),
  unmount: jest.fn()
};
exports.docsRenderer = docsRenderer;
const teardownRenderToDOM = jest.fn();
exports.teardownRenderToDOM = teardownRenderToDOM;
const projectAnnotations = {
  globals: {
    a: 'b'
  },
  globalTypes: {},
  decorators: [jest.fn(s => s())],
  render: jest.fn(),
  renderToDOM: jest.fn().mockReturnValue(teardownRenderToDOM),
  parameters: {
    docs: {
      renderer: () => docsRenderer
    }
  }
};
exports.projectAnnotations = projectAnnotations;
const getProjectAnnotations = jest.fn(() => projectAnnotations);
exports.getProjectAnnotations = getProjectAnnotations;
const storyIndex = {
  v: 4,
  entries: {
    'component-one--docs': {
      type: 'docs',
      id: 'component-one--docs',
      title: 'Component One',
      name: 'Docs',
      importPath: './src/ComponentOne.stories.js',
      storiesImports: ['./src/ExtraComponentOne.stories.js'],
      standalone: false
    },
    'component-one--a': {
      type: 'story',
      id: 'component-one--a',
      title: 'Component One',
      name: 'A',
      importPath: './src/ComponentOne.stories.js'
    },
    'component-one--b': {
      type: 'story',
      id: 'component-one--b',
      title: 'Component One',
      name: 'B',
      importPath: './src/ComponentOne.stories.js'
    },
    'component-one--e': {
      type: 'story',
      id: 'component-one--e',
      title: 'Component One',
      name: 'E',
      importPath: './src/ExtraComponentOne.stories.js'
    },
    'component-two--docs': {
      type: 'docs',
      id: 'component-two--docs',
      title: 'Component Two',
      name: 'Docs',
      importPath: './src/ComponentTwo.stories.js',
      storiesImports: [],
      standalone: false
    },
    'component-two--c': {
      type: 'story',
      id: 'component-two--c',
      title: 'Component Two',
      name: 'C',
      importPath: './src/ComponentTwo.stories.js'
    },
    'introduction--docs': {
      type: 'docs',
      id: 'introduction--docs',
      title: 'Introduction',
      name: 'Docs',
      importPath: './src/Introduction.mdx',
      storiesImports: ['./src/ComponentTwo.stories.js'],
      standalone: true
    }
  }
};
exports.storyIndex = storyIndex;

const getStoryIndex = () => storyIndex;

exports.getStoryIndex = getStoryIndex;
const emitter = new _events.EventEmitter();
exports.emitter = emitter;
const mockChannel = {
  on: emitter.on.bind(emitter),
  off: emitter.off.bind(emitter),
  removeListener: emitter.off.bind(emitter),
  emit: jest.fn(emitter.emit.bind(emitter)) // emit: emitter.emit.bind(emitter),

};
exports.mockChannel = mockChannel;

const waitForEvents = (events, predicate = () => true, debugLabel) => {
  // We've already emitted a render event. NOTE if you want to test a second call,
  // ensure you call `mockChannel.emit.mockClear()` before `waitFor...`
  if (mockChannel.emit.mock.calls.find(call => events.includes(call[0]) && predicate(...call.slice(1)))) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const listener = (...args) => {
      if (!predicate(...args)) return;
      events.forEach(event => mockChannel.off(event, listener));
      resolve(null);
    };

    events.forEach(event => mockChannel.on(event, listener)); // Don't wait too long

    waitForQuiescence().then(() => reject(new Error(`Event was not emitted in time: ${debugLabel || events}`)));
  });
}; // The functions on the preview that trigger rendering don't wait for
// the async parts, so we need to listen for the "done" events


exports.waitForEvents = waitForEvents;

const waitForRender = () => waitForEvents([_coreEvents.STORY_RENDERED, _coreEvents.DOCS_RENDERED, _coreEvents.STORY_THREW_EXCEPTION, _coreEvents.STORY_ERRORED, _coreEvents.STORY_MISSING]);

exports.waitForRender = waitForRender;

const waitForRenderPhase = phase => {
  const label = `${_coreEvents.STORY_RENDER_PHASE_CHANGED} to ${phase}`;
  return waitForEvents([_coreEvents.STORY_RENDER_PHASE_CHANGED], ({
    newPhase
  }) => newPhase === phase, label);
}; // A little trick to ensure that we always call the real `setTimeout` even when timers are mocked


exports.waitForRenderPhase = waitForRenderPhase;
const realSetTimeout = setTimeout;

const waitForQuiescence = async () => new Promise(r => realSetTimeout(r, 100));

exports.waitForQuiescence = waitForQuiescence;
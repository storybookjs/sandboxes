import { DOCS_RENDERED } from '@storybook/core-events';
import { PREPARE_ABORTED } from './Render';
import { DocsContext } from '../docs-context/DocsContext';
/**
 * A StandaloneDocsRender is a render of a docs entry that doesn't directly come from a CSF file.
 *
 * A standalone render can reference zero or more CSF files that contain stories.
 *
 * Use cases:
 *  - *.mdx file that may or may not reference a specific CSF file with `<Meta of={} />`
 */

export class StandaloneDocsRender {
  constructor(channel, store, entry) {
    this.channel = channel;
    this.store = store;
    this.entry = entry;
    this.type = 'docs';
    this.id = void 0;
    this.exports = void 0;
    this.rerender = void 0;
    this.teardownRender = void 0;
    this.torndown = false;
    this.disableKeyListeners = false;
    this.preparing = false;
    this.csfFiles = void 0;
    this.id = entry.id;
  }

  isPreparing() {
    return this.preparing;
  }

  async prepare() {
    this.preparing = true;
    const {
      entryExports,
      csfFiles = []
    } = await this.store.loadEntry(this.id);
    if (this.torndown) throw PREPARE_ABORTED;
    this.csfFiles = csfFiles;
    this.exports = entryExports;
    this.preparing = false;
  }

  isEqual(other) {
    return !!(this.id === other.id && this.exports && this.exports === other.exports);
  }

  async renderToElement(canvasElement, renderStoryToElement) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations) throw new Error('Cannot render docs before preparing');
    const docsContext = new DocsContext(this.channel, this.store, renderStoryToElement, this.csfFiles, false);
    const {
      docs
    } = this.store.projectAnnotations.parameters || {};
    if (!docs) throw new Error(`Cannot render a story in viewMode=docs if \`@storybook/addon-docs\` is not installed`);
    const docsParameter = Object.assign({}, docs, {
      page: this.exports.default
    });
    const renderer = await docs.renderer();
    const {
      render
    } = renderer;

    const renderDocs = async () => {
      await new Promise(r => render(docsContext, docsParameter, canvasElement, r));
      this.channel.emit(DOCS_RENDERED, this.id);
    };

    this.rerender = async () => renderDocs();

    this.teardownRender = async ({
      viewModeChanged
    } = {}) => {
      if (!viewModeChanged || !canvasElement) return;
      renderer.unmount(canvasElement);
      this.torndown = true;
    };

    return renderDocs();
  }

  async teardown({
    viewModeChanged
  } = {}) {
    this.teardownRender?.({
      viewModeChanged
    });
    this.torndown = true;
  }

}
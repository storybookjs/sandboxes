export class DocsContext {
  constructor(channel, store, renderStoryToElement,
  /** The CSF files known (via the index) to be refererenced by this docs file */
  csfFiles, componentStoriesFromAllCsfFiles = true) {
    this.channel = channel;
    this.store = store;
    this.renderStoryToElement = renderStoryToElement;
    this.componentStoriesValue = void 0;
    this.storyIdToCSFFile = void 0;
    this.exportToStoryId = void 0;
    this.nameToStoryId = void 0;
    this.primaryStory = void 0;

    this.storyIdByName = storyName => {
      const storyId = this.nameToStoryId.get(storyName);
      if (storyId) return storyId;
      throw new Error(`No story found with that name: ${storyName}`);
    };

    this.componentStories = () => {
      return this.componentStoriesValue;
    };

    this.storyById = storyId => {
      if (!storyId) {
        if (!this.primaryStory) throw new Error(`No primary story defined for docs entry. Did you forget to use \`<Meta>\`?`);
        return this.primaryStory;
      }

      const csfFile = this.storyIdToCSFFile.get(storyId);
      if (!csfFile) throw new Error(`Called \`storyById\` for story that was never loaded: ${storyId}`);
      return this.store.storyFromCSFFile({
        storyId,
        csfFile
      });
    };

    this.getStoryContext = story => {
      return Object.assign({}, this.store.getStoryContext(story), {
        viewMode: 'docs'
      });
    };

    this.loadStory = id => {
      return this.store.loadStory({
        storyId: id
      });
    };

    this.storyIdToCSFFile = new Map();
    this.exportToStoryId = new Map();
    this.nameToStoryId = new Map();
    this.componentStoriesValue = [];
    csfFiles.forEach((csfFile, index) => {
      this.referenceCSFFile(csfFile, componentStoriesFromAllCsfFiles || index === 0);
    });
  } // This docs entry references this CSF file and can syncronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.


  referenceCSFFile(csfFile, addToComponentStories) {
    Object.values(csfFile.stories).forEach(annotation => {
      this.storyIdToCSFFile.set(annotation.id, csfFile);
      this.exportToStoryId.set(annotation.moduleExport, annotation.id);

      if (addToComponentStories) {
        this.nameToStoryId.set(annotation.name, annotation.id);
        const story = this.storyById(annotation.id);
        this.componentStoriesValue.push(story);
        if (!this.primaryStory) this.primaryStory = story;
      }
    });
  }

  setMeta(metaExports) {// Do nothing (this is really only used by external docs)
  }

  storyIdByModuleExport(storyExport, metaExports) {
    const storyId = this.exportToStoryId.get(storyExport);
    if (storyId) return storyId;
    throw new Error(`No story found with that export: ${storyExport}`);
  }

}
import type { Path, StoryIndex, IndexEntry, StoryIndexEntry, StandaloneDocsIndexEntry, TemplateDocsIndexEntry } from '@storybook/store';
import type { StoryIndexer, NormalizedStoriesSpecifier, DocsOptions } from '@storybook/core-common';
/** A .mdx file will produce a "standalone" docs entry */
declare type DocsCacheEntry = StandaloneDocsIndexEntry;
/** A *.stories.* file will produce a list of stories and possibly a docs entry */
declare type StoriesCacheEntry = {
    entries: (StoryIndexEntry | TemplateDocsIndexEntry)[];
    dependents: Path[];
    type: 'stories';
};
declare type CacheEntry = false | StoriesCacheEntry | DocsCacheEntry;
/**
 * The StoryIndexGenerator extracts stories and docs entries for each file matching
 * (one or more) stories "specifiers", as defined in main.js.
 *
 * The output is a set of entries (see above for the types).
 *
 * Each file is treated as a stories or a (modern) docs file.
 *
 * A stories file is indexed by an indexer (passed in), which produces a list of stories.
 *   - If the stories have the `parameters.docsOnly` setting, they are disregarded.
 *   - If the indexer is a "docs template" indexer, OR docsPage is enabled,
 *       a templated docs entry is added pointing to the story file.
 *
 * A (modern) docs file is indexed, a standalone docs entry is added.
 *
 * The entries are "uniq"-ed and sorted. Stories entries are preferred to docs entries and
 * standalone docs entries are preferred to templates (with warnings).
 */
export declare class StoryIndexGenerator {
    readonly specifiers: NormalizedStoriesSpecifier[];
    readonly options: {
        workingDir: Path;
        configDir: Path;
        storiesV2Compatibility: boolean;
        storyStoreV7: boolean;
        storyIndexers: StoryIndexer[];
        docs: DocsOptions;
    };
    private specifierToCache;
    private lastIndex?;
    constructor(specifiers: NormalizedStoriesSpecifier[], options: {
        workingDir: Path;
        configDir: Path;
        storiesV2Compatibility: boolean;
        storyStoreV7: boolean;
        storyIndexers: StoryIndexer[];
        docs: DocsOptions;
    });
    initialize(): Promise<void>;
    /**
     * Run the updater function over all the empty cache entries
     */
    updateExtracted(updater: (specifier: NormalizedStoriesSpecifier, absolutePath: Path, existingEntry: CacheEntry) => Promise<CacheEntry>, overwrite?: boolean): Promise<void>;
    isDocsMdx(absolutePath: Path): boolean;
    ensureExtracted(): Promise<IndexEntry[]>;
    findDependencies(absoluteImports: Path[]): StoriesCacheEntry[];
    extractStories(specifier: NormalizedStoriesSpecifier, absolutePath: Path): Promise<StoriesCacheEntry>;
    extractDocs(specifier: NormalizedStoriesSpecifier, absolutePath: Path): Promise<false | StandaloneDocsIndexEntry>;
    chooseDuplicate(firstEntry: IndexEntry, secondEntry: IndexEntry): IndexEntry;
    sortStories(storiesList: IndexEntry[]): Promise<Record<string, IndexEntry>>;
    getIndex(): Promise<StoryIndex>;
    invalidate(specifier: NormalizedStoriesSpecifier, importPath: Path, removed: boolean): void;
    getStorySortParameter(): Promise<any>;
    storyFileNames(): string[];
}
export {};

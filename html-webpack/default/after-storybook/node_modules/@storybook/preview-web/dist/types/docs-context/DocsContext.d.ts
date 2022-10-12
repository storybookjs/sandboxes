import type { AnyFramework, StoryContextForLoaders, StoryId, StoryName } from '@storybook/csf';
import type { CSFFile, ModuleExport, ModuleExports, Story, StoryStore } from '@storybook/store';
import type { Channel } from '@storybook/channels';
import { DocsContextProps } from './DocsContextProps';
export declare class DocsContext<TFramework extends AnyFramework> implements DocsContextProps<TFramework> {
    channel: Channel;
    protected store: StoryStore<TFramework>;
    renderStoryToElement: DocsContextProps['renderStoryToElement'];
    private componentStoriesValue;
    private storyIdToCSFFile;
    private exportToStoryId;
    private nameToStoryId;
    private primaryStory?;
    constructor(channel: Channel, store: StoryStore<TFramework>, renderStoryToElement: DocsContextProps['renderStoryToElement'], 
    /** The CSF files known (via the index) to be refererenced by this docs file */
    csfFiles: CSFFile<TFramework>[], componentStoriesFromAllCsfFiles?: boolean);
    referenceCSFFile(csfFile: CSFFile<TFramework>, addToComponentStories: boolean): void;
    setMeta(metaExports: ModuleExports): void;
    storyIdByModuleExport(storyExport: ModuleExport, metaExports?: ModuleExports): string;
    storyIdByName: (storyName: StoryName) => string;
    componentStories: () => Story<TFramework>[];
    storyById: (storyId?: string | undefined) => Story<TFramework>;
    getStoryContext: (story: Story<TFramework>) => StoryContextForLoaders<TFramework, import("@storybook/csf").Args>;
    loadStory: (id: StoryId) => Promise<Story<TFramework>>;
}

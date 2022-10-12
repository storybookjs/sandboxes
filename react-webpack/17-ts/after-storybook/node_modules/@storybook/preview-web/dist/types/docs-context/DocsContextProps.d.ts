import type { StoryId, StoryName, AnyFramework, StoryContextForLoaders } from '@storybook/csf';
import type { ModuleExport, ModuleExports, Story } from '@storybook/store';
import type { Channel } from '@storybook/channels';
export interface DocsContextProps<TFramework extends AnyFramework = AnyFramework> {
    /**
     * Register the CSF file that this docs entry represents.
     * Used by the `<Meta of={} />` block.
     */
    setMeta: (metaExports: ModuleExports) => void;
    /**
     * Find a story's id from the direct export from the CSF file.
     * This is primarily used by the `<Story of={} /> block.
     */
    storyIdByModuleExport: (storyExport: ModuleExport, metaExports?: ModuleExports) => StoryId;
    /**
     * Find a story's id from the name of the story.
     * This is primarily used by the `<Story name={} /> block.
     * Note that the story must be part of the primary CSF file of the docs entry.
     */
    storyIdByName: (storyName: StoryName) => StoryId;
    /**
     * Syncronously find a story by id (if the id is not provided, this will look up the primary
     * story in the CSF file, if such a file exists).
     */
    storyById: (id?: StoryId) => Story<TFramework>;
    /**
     * Syncronously find all stories of the component referenced by the CSF file.
     */
    componentStories: () => Story<TFramework>[];
    /**
     * Get the story context of the referenced story.
     */
    getStoryContext: (story: Story<TFramework>) => StoryContextForLoaders<TFramework>;
    /**
     * Asyncronously load an arbitrary story by id.
     */
    loadStory: (id: StoryId) => Promise<Story<TFramework>>;
    /**
     * Render a story to a given HTML element and keep it up to date across context changes
     */
    renderStoryToElement: (story: Story<TFramework>, element: HTMLElement) => () => Promise<void>;
    /**
     * Storybook channel -- use for low level event watching/emitting
     */
    channel: Channel;
}

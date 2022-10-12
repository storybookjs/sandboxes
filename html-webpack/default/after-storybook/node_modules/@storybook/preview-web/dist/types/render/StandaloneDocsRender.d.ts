import { AnyFramework, StoryId } from '@storybook/csf';
import { StoryStore } from '@storybook/store';
import { Channel, IndexEntry } from '@storybook/addons';
import { Render, RenderType } from './Render';
import type { DocsContextProps } from '../docs-context/DocsContextProps';
/**
 * A StandaloneDocsRender is a render of a docs entry that doesn't directly come from a CSF file.
 *
 * A standalone render can reference zero or more CSF files that contain stories.
 *
 * Use cases:
 *  - *.mdx file that may or may not reference a specific CSF file with `<Meta of={} />`
 */
export declare class StandaloneDocsRender<TFramework extends AnyFramework> implements Render<TFramework> {
    protected channel: Channel;
    protected store: StoryStore<TFramework>;
    entry: IndexEntry;
    readonly type: RenderType;
    readonly id: StoryId;
    private exports?;
    rerender?: () => Promise<void>;
    teardownRender?: (options: {
        viewModeChanged?: boolean;
    }) => Promise<void>;
    torndown: boolean;
    readonly disableKeyListeners = false;
    preparing: boolean;
    private csfFiles?;
    constructor(channel: Channel, store: StoryStore<TFramework>, entry: IndexEntry);
    isPreparing(): boolean;
    prepare(): Promise<void>;
    isEqual(other: Render<TFramework>): boolean;
    renderToElement(canvasElement: HTMLElement, renderStoryToElement: DocsContextProps['renderStoryToElement']): Promise<void>;
    teardown({ viewModeChanged }?: {
        viewModeChanged?: boolean;
    }): Promise<void>;
}

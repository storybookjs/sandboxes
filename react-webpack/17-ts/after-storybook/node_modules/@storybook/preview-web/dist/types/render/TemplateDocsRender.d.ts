import { AnyFramework, StoryId } from '@storybook/csf';
import { Story, StoryStore } from '@storybook/store';
import { Channel, IndexEntry } from '@storybook/addons';
import { Render, RenderType } from './Render';
import type { DocsContextProps } from '../docs-context/DocsContextProps';
/**
 * A TemplateDocsRender is a render of a docs entry that is rendered with (an) attached CSF file(s).
 *
 * The expectation is the primary CSF file which is the `importPath` for the entry will
 * define a story which may contain the actual rendered JSX code for the template in the
 * `docs.page` parameter.
 *
 * Use cases:
 *  - Docs Page, where there is no parameter, and we fall back to the globally defined template.
 *  - *.stories.mdx files, where the MDX compiler produces a CSF file with a `.parameter.docs.page`
 *      parameter containing the compiled content of the MDX file.
 */
export declare class TemplateDocsRender<TFramework extends AnyFramework> implements Render<TFramework> {
    protected channel: Channel;
    protected store: StoryStore<TFramework>;
    entry: IndexEntry;
    readonly type: RenderType;
    readonly id: StoryId;
    story?: Story<TFramework>;
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

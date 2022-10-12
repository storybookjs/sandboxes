import { AnyFramework, StoryId, ViewMode } from '@storybook/csf';
import { Story, RenderContext, StoryStore, RenderToDOM } from '@storybook/store';
import { Channel } from '@storybook/addons';
import { Render, RenderType } from './Render';
export declare type RenderPhase = 'preparing' | 'loading' | 'rendering' | 'playing' | 'played' | 'completed' | 'aborted' | 'errored';
export declare type RenderContextCallbacks<TFramework extends AnyFramework> = Pick<RenderContext<TFramework>, 'showMain' | 'showError' | 'showException'>;
export declare class StoryRender<TFramework extends AnyFramework> implements Render<TFramework> {
    channel: Channel;
    store: StoryStore<TFramework>;
    private renderToScreen;
    private callbacks;
    id: StoryId;
    viewMode: ViewMode;
    type: RenderType;
    story?: Story<TFramework>;
    phase?: RenderPhase;
    private abortController?;
    private canvasElement?;
    private notYetRendered;
    disableKeyListeners: boolean;
    private teardownRender;
    torndown: boolean;
    constructor(channel: Channel, store: StoryStore<TFramework>, renderToScreen: RenderToDOM<TFramework>, callbacks: RenderContextCallbacks<TFramework>, id: StoryId, viewMode: ViewMode, story?: Story<TFramework>);
    private runPhase;
    prepare(): Promise<void>;
    isEqual(other: Render<TFramework>): boolean;
    isPreparing(): boolean;
    isPending(): boolean;
    renderToElement(canvasElement: HTMLElement): Promise<void>;
    private storyContext;
    render({ initial, forceRemount, }?: {
        initial?: boolean;
        forceRemount?: boolean;
    }): Promise<void>;
    rerender(): Promise<void>;
    remount(): Promise<void>;
    cancelRender(): void;
    teardown(): Promise<void>;
}

import { AnyFramework, StoryId, ProjectAnnotations, Args, Globals, ViewMode } from '@storybook/csf';
import type { ModuleImportFn, Selection, StorySpecifier, StoryIndex, PromiseLike, WebProjectAnnotations } from '@storybook/store';
import { MaybePromise, Preview } from './Preview';
import { UrlStore } from './UrlStore';
import { WebView } from './WebView';
import { StoryRender } from './render/StoryRender';
import { TemplateDocsRender } from './render/TemplateDocsRender';
import { StandaloneDocsRender } from './render/StandaloneDocsRender';
declare type PossibleRender<TFramework extends AnyFramework> = StoryRender<TFramework> | TemplateDocsRender<TFramework> | StandaloneDocsRender<TFramework>;
export declare class PreviewWeb<TFramework extends AnyFramework> extends Preview<TFramework> {
    urlStore: UrlStore;
    view: WebView;
    previewEntryError?: Error;
    currentSelection?: Selection;
    currentRender?: PossibleRender<TFramework>;
    constructor();
    setupListeners(): void;
    initializeWithProjectAnnotations(projectAnnotations: WebProjectAnnotations<TFramework>): Promise<void>;
    setInitialGlobals(): Promise<void>;
    initializeWithStoryIndex(storyIndex: StoryIndex): PromiseLike<void>;
    selectSpecifiedStory(): Promise<void>;
    onGetProjectAnnotationsChanged({ getProjectAnnotations, }: {
        getProjectAnnotations: () => MaybePromise<ProjectAnnotations<TFramework>>;
    }): Promise<void>;
    onStoriesChanged({ importFn, storyIndex, }: {
        importFn?: ModuleImportFn;
        storyIndex?: StoryIndex;
    }): Promise<void>;
    onKeydown(event: KeyboardEvent): void;
    onSetCurrentStory(selection: {
        storyId: StoryId;
        viewMode?: ViewMode;
    }): void;
    onUpdateQueryParams(queryParams: any): void;
    onUpdateGlobals({ globals }: {
        globals: Globals;
    }): Promise<void>;
    onUpdateArgs({ storyId, updatedArgs }: {
        storyId: StoryId;
        updatedArgs: Args;
    }): Promise<void>;
    onPreloadStories({ ids }: {
        ids: string[];
    }): Promise<void>;
    renderSelection({ persistedArgs }?: {
        persistedArgs?: Args;
    }): Promise<void>;
    teardownRender(render: PossibleRender<TFramework>, { viewModeChanged }?: {
        viewModeChanged?: boolean;
    }): Promise<void>;
    extract(options?: {
        includeDocsOnly: boolean;
    }): Promise<Record<string, import("@storybook/csf").StoryContextForEnhancers<TFramework, Args>>>;
    mainStoryCallbacks(storyId: StoryId): {
        showMain: () => void;
        showError: (err: {
            title: string;
            description: string;
        }) => void;
        showException: (err: Error) => void;
    };
    inlineStoryCallbacks(storyId: StoryId): {
        showMain: () => void;
        showError: (err: {
            title: string;
            description: string;
        }) => void;
        showException: (err: Error) => void;
    };
    renderPreviewEntryError(reason: string, err: Error): void;
    renderMissingStory(): void;
    renderStoryLoadingException(storySpecifier: StorySpecifier, err: Error): void;
    renderException(storyId: StoryId, error: Error): void;
    renderError(storyId: StoryId, { title, description }: {
        title: string;
        description: string;
    }): void;
}
export {};

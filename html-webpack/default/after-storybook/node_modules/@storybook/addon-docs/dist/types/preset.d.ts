import type { DocsOptions, Options, StoryIndexer } from '@storybook/core-common';
declare type BabelParams = {
    babelOptions?: any;
    mdxBabelOptions?: any;
    configureJSX?: boolean;
};
export declare function webpack(webpackConfig: any, options: Options & BabelParams & {
    sourceLoaderOptions: any;
    transcludeMarkdown: boolean;
}): Promise<any>;
export declare const storyIndexers: (indexers: StoryIndexer[] | null) => Promise<StoryIndexer[]>;
export declare const docs: (docsOptions: DocsOptions) => {
    enabled: boolean;
    defaultName: string;
    docsPage: boolean;
    docsMode?: boolean;
};
export {};

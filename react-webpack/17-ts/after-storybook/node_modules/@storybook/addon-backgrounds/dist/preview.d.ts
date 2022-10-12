import * as _storybook_csf from '@storybook/csf';

declare const decorators: ((StoryFn: _storybook_csf.PartialStoryFn<_storybook_csf.AnyFramework, _storybook_csf.Args>, context: _storybook_csf.StoryContext<_storybook_csf.AnyFramework, _storybook_csf.Args>) => unknown)[];
declare const parameters: {
    backgrounds: {
        grid: {
            cellSize: number;
            opacity: number;
            cellAmount: number;
        };
        values: {
            name: string;
            value: string;
        }[];
    };
};

export { decorators, parameters };

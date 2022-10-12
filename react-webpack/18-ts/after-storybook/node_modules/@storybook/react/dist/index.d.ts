import { ClientStoryApi, Loadable } from '@storybook/addons';
import { R as ReactFramework, I as IStorybookSection, S as StoryFnReactReturnType } from './types-9f8d440a.js';
import * as _storybook_csf from '@storybook/csf';
import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations, ProjectAnnotations } from '@storybook/csf';
import { ComponentProps, JSXElementConstructor } from 'react';
import * as _storybook_store from '@storybook/store';
import { ComposedStory, CSFExports, StoriesWithPartialProps } from '@storybook/store';

interface ClientApi extends ClientStoryApi<ReactFramework['storyResult']> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const addDecorator: ClientApi['addDecorator'];
declare type DecoratorFn = Parameters<typeof addDecorator>[0];
declare const addParameters: ClientApi['addParameters'];
declare const clearDecorators: ClientApi['clearDecorators'];
declare const setAddon: ClientApi['setAddon'];
declare const forceReRender: ClientApi['forceReRender'];
declare const getStorybook: ClientApi['getStorybook'];
declare const raw: ClientApi['raw'];

declare type JSXElement = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
declare type Meta<TArgs = Args> = ComponentAnnotations<ReactFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<ReactFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryObj<TArgs = Args> = StoryAnnotations<ReactFramework, TArgs>;
/**
 * For the common case where a component's stories are simple components that receives args as props:
 *
 * ```tsx
 * export default { ... } as ComponentMeta<typeof Button>;
 * ```
 */
declare type ComponentMeta<T extends JSXElement> = Meta<ComponentProps<T>>;
/**
 * For the common case where a (CSFv2) story is a simple component that receives args as props:
 *
 * ```tsx
 * const Template: ComponentStoryFn<typeof Button> = (args) => <Button {...args} />
 * ```
 */
declare type ComponentStoryFn<T extends JSXElement> = StoryFn<ComponentProps<T>>;
/**
 * For the common case where a (CSFv3) story is a simple component that receives args as props:
 *
 * ```tsx
 * const MyStory: ComponentStoryObj<typeof Button> = {
 *   args: { buttonArg1: 'val' },
 * }
 * ```
 */
declare type ComponentStoryObj<T extends JSXElement> = StoryObj<ComponentProps<T>>;
/**

/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type Story<TArgs = Args> = StoryObj<TArgs>;
/**
 * For the common case where a (CSFv3) story is a simple component that receives args as props:
 *
 * ```tsx
 * const MyStory: ComponentStory<typeof Button> = {
 *   args: { buttonArg1: 'val' },
 * }
 * ```
 */ declare type ComponentStory<T extends JSXElement> = ComponentStoryObj<T>;

/** Function that sets the globalConfig of your storybook. The global config is the preview module of your .storybook folder.
 *
 * It should be run a single time, so that your global config (e.g. decorators) is applied to your stories when using `composeStories` or `composeStory`.
 *
 * Example:
 *```jsx
 * // setup.js (for jest)
 * import { setProjectAnnotations } from '@storybook/react';
 * import * as projectAnnotations from './.storybook/preview';
 *
 * setProjectAnnotations(projectAnnotations);
 *```
 *
 * @param projectAnnotations - e.g. (import * as projectAnnotations from '../.storybook/preview')
 */
declare function setProjectAnnotations(projectAnnotations: ProjectAnnotations<ReactFramework> | ProjectAnnotations<ReactFramework>[]): void;
/** Preserved for users migrating from `@storybook/testing-react`.
 *
 * @deprecated Use setProjectAnnotations instead
 */
declare function setGlobalConfig(projectAnnotations: ProjectAnnotations<ReactFramework> | ProjectAnnotations<ReactFramework>[]): void;
/**
 * Function that will receive a story along with meta (e.g. a default export from a .stories file)
 * and optionally projectAnnotations e.g. (import * from '../.storybook/preview)
 * and will return a composed component that has all args/parameters/decorators/etc combined and applied to it.
 *
 *
 * It's very useful for reusing a story in scenarios outside of Storybook like unit testing.
 *
 * Example:
 *```jsx
 * import { render } from '@testing-library/react';
 * import { composeStory } from '@storybook/react';
 * import Meta, { Primary as PrimaryStory } from './Button.stories';
 *
 * const Primary = composeStory(PrimaryStory, Meta);
 *
 * test('renders primary button with Hello World', () => {
 *   const { getByText } = render(<Primary>Hello world</Primary>);
 *   expect(getByText(/Hello world/i)).not.toBeNull();
 * });
 *```
 *
 * @param story
 * @param componentAnnotations - e.g. (import Meta from './Button.stories')
 * @param [projectAnnotations] - e.g. (import * as projectAnnotations from '../.storybook/preview') this can be applied automatically if you use `setProjectAnnotations` in your setup files.
 * @param [exportsName] - in case your story does not contain a name and you want it to have a name.
 */
declare function composeStory<TArgs = Args>(story: ComposedStory<ReactFramework, TArgs>, componentAnnotations: Meta<TArgs | any>, projectAnnotations?: ProjectAnnotations<ReactFramework>, exportsName?: string): {
    (extraArgs: Partial<TArgs>): StoryFnReactReturnType;
    storyName: string;
    args: Args;
    play: _storybook_store.ComposedStoryPlayFn;
    parameters: _storybook_store.Parameters;
};
/**
 * Function that will receive a stories import (e.g. `import * as stories from './Button.stories'`)
 * and optionally projectAnnotations (e.g. `import * from '../.storybook/preview`)
 * and will return an object containing all the stories passed, but now as a composed component that has all args/parameters/decorators/etc combined and applied to it.
 *
 *
 * It's very useful for reusing stories in scenarios outside of Storybook like unit testing.
 *
 * Example:
 *```jsx
 * import { render } from '@testing-library/react';
 * import { composeStories } from '@storybook/react';
 * import * as stories from './Button.stories';
 *
 * const { Primary, Secondary } = composeStories(stories);
 *
 * test('renders primary button with Hello World', () => {
 *   const { getByText } = render(<Primary>Hello world</Primary>);
 *   expect(getByText(/Hello world/i)).not.toBeNull();
 * });
 *```
 *
 * @param csfExports - e.g. (import * as stories from './Button.stories')
 * @param [projectAnnotations] - e.g. (import * as projectAnnotations from '../.storybook/preview') this can be applied automatically if you use `setProjectAnnotations` in your setup files.
 */
declare function composeStories<TModule extends CSFExports<ReactFramework>>(csfExports: TModule, projectAnnotations?: ProjectAnnotations<ReactFramework>): Omit<StoriesWithPartialProps<ReactFramework, TModule>, keyof CSFExports<_storybook_csf.AnyFramework>>;

export { ComponentMeta, ComponentStory, ComponentStoryFn, ComponentStoryObj, DecoratorFn, Meta, Story, StoryFn, StoryObj, addDecorator, addParameters, clearDecorators, composeStories, composeStory, configure, forceReRender, getStorybook, raw, setAddon, setGlobalConfig, setProjectAnnotations, storiesOf };

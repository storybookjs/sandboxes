import { ComponentType, ReactElement } from 'react';

declare type ReactFramework = {
    component: ComponentType<any>;
    storyResult: StoryFnReactReturnType;
};
declare type StoryFnReactReturnType = ReactElement<unknown>;
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}

export { IStorybookSection as I, ReactFramework as R, StoryFnReactReturnType as S };

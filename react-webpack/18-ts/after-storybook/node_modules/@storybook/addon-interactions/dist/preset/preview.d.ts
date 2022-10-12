import * as _storybook_addons from '@storybook/addons';
import { ArgsEnhancer, AnyFramework, StepLabel, PlayFunction, PlayFunctionContext } from '@storybook/csf';

declare const argsEnhancers: ArgsEnhancer<AnyFramework, _storybook_addons.Args>[];
declare const runStep: (label: StepLabel, play: PlayFunction, context: PlayFunctionContext) => void | Promise<void>;
declare const parameters: {
    throwPlayFunctionExceptions: boolean;
};

export { argsEnhancers, parameters, runStep };

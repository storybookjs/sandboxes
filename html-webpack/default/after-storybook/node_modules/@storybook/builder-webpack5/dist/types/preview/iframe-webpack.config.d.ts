import type { Configuration } from 'webpack';
import type { Options } from '@storybook/core-common';
import type { TypescriptOptions } from '../types';
declare const _default: (options: Options & Record<string, any> & {
    typescriptOptions: TypescriptOptions;
}) => Promise<Configuration>;
export default _default;

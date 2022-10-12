import webpack, { Stats, Configuration } from 'webpack';
import type { Builder, Options } from '@storybook/core-common';
export * from './types';
declare type WebpackBuilder = Builder<Configuration, Stats>;
declare type BuilderStartOptions = Parameters<WebpackBuilder['start']>['0'];
export declare const executor: {
    get: (options: Options) => Promise<typeof webpack>;
};
export declare const getConfig: WebpackBuilder['getConfig'];
export declare const bail: WebpackBuilder['bail'];
export declare const start: (options: BuilderStartOptions) => Promise<void | {
    stats?: webpack.Stats | undefined;
    totalTime: [number, number];
    bail: (e?: Error | undefined) => Promise<void>;
}>;
export declare const build: (options: BuilderStartOptions) => Promise<void | webpack.Stats>;
export declare const corePresets: string[];
export declare const overridePresets: string[];

import { Builder } from '@storybook/core-common';
import * as esbuild from 'esbuild';
import { BuildOptions, BuildResult } from 'esbuild';

interface Stats {
    toJson: () => any;
}
declare type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};
declare type ManagerBuilder = Builder<WithRequiredProperty<BuildOptions, 'outdir'> & {
    entryPoints: string[];
}, Stats>;
declare type BuilderStartOptions = Parameters<ManagerBuilder['start']>['0'];
declare type Compilation = BuildResult;

declare let compilation: Compilation;
declare const getConfig: ManagerBuilder['getConfig'];
declare const executor: {
    get: () => Promise<typeof esbuild.build>;
};
declare const bail: ManagerBuilder['bail'];
declare const start: (options: BuilderStartOptions) => Promise<void | {
    stats?: Stats | undefined;
    totalTime: [number, number];
    bail: (e?: Error | undefined) => Promise<void>;
}>;
declare const build: (options: BuilderStartOptions) => Promise<void | Stats>;
declare const corePresets: ManagerBuilder['corePresets'];
declare const overridePresets: ManagerBuilder['overridePresets'];

export { bail, build, compilation, corePresets, executor, getConfig, overridePresets, start };

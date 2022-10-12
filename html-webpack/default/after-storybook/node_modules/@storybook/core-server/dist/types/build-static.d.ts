import type { LoadOptions, CLIOptions, BuilderOptions } from '@storybook/core-common';
export declare function buildStaticStandalone(options: CLIOptions & LoadOptions & BuilderOptions & {
    outputDir: string;
}): Promise<void>;

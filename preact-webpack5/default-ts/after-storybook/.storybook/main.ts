import type { StorybookConfig } from '@storybook/preact-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/preact-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

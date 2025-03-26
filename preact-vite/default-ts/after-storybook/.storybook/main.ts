import type { StorybookConfig } from '@storybook/preact-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/preact-vite",
    "options": {}
  }
};
export default config;
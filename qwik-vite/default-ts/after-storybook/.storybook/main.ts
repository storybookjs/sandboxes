import type { StorybookConfig } from 'storybook-framework-qwik';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "storybook-framework-qwik",
    "options": {}
  }
};
export default config;
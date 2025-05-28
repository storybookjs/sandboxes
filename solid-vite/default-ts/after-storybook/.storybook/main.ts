import type { StorybookConfig } from 'storybook-solidjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "storybook-solidjs-vite",
    "options": {}
  }
};
export default config;
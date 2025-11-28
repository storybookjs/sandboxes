import type { StorybookConfig } from 'storybook-web-components-rsbuild';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "storybook-web-components-rsbuild"
};
export default config;


/** @type { import('@storybook/preact-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/preact-vite",
    "options": {}
  }
};
export default config;
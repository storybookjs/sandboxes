

/** @type { import('storybook-solidjs-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "storybook-solidjs-vite",
    "options": {}
  }
};
export default config;


/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/svelte-vite",
    "options": {}
  }
};
export default config;
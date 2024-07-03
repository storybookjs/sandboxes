/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|svelte)"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
};
export default config;

import type { StorybookConfig } from "storybook-vue";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: ["@storybook/addon-essentials", "@chromatic-com/storybook"],
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
};
export default config;

import type { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "storybook-framework-qwik",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;

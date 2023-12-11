/** @type { import('@storybook/ember').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/ember",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../dist"],
};
export default config;

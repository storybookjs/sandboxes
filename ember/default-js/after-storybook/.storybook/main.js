

/** @type { import('@storybook/ember').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook"
  ],
  "framework": {
    "name": "@storybook/ember",
    "options": {}
  },
  "staticDirs": [
    "../dist"
  ]
};
export default config;
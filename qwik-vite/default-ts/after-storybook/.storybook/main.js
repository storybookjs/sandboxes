/** @type { import('storybook-framework-qwik').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: 'storybook-framework-qwik',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

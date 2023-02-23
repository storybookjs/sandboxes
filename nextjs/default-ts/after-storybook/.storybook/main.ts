import path from 'path';

import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    path.dirname(require.resolve(path.join('@storybook/addon-links', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-essentials', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-interactions', 'package.json'))),
  ],
  framework: {
    name: path.dirname(require.resolve(path.join('@storybook/nextjs', 'package.json'))),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

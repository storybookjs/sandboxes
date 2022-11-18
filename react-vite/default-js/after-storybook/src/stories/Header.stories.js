import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/react/writing-docs/docs-page
  tags: ['docsPage'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut = {};

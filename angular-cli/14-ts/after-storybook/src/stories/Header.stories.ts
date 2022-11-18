import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import Button from './button.component';
import Header from './header.component';

const meta: Meta<Header> = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/angular/writing-docs/docs-page
  tags: ['docsPage'],
  render: (args) => ({ props: args }),
  decorators: [
    moduleMetadata({
      declarations: [Button],
      imports: [CommonModule],
    }),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};

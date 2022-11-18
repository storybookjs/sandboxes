import type { Meta, StoryObj } from '@storybook/angular';
import Button from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
const meta: Meta<Button> = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/angular/writing-docs/docs-page
  tags: ['docsPage'],
  // More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
  render: (args: Button) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

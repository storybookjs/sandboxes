import type { Meta, StoryObj } from '@storybook/web-components';
import type { ButtonProps } from './Button';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
const meta: Meta<ButtonProps> = {
  title: 'Example/Button',
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/web-components/writing-docs/docs-page
  tags: ['docsPage'],
  render: (args: ButtonProps) => Button(args),
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
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

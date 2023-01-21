import { action } from '@storybook/addon-actions';
import { $ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { ButtonProps, Button } from './button';

export default {
  title: 'Button',
  args: {
    // automatic actions are not yet supported.
    // See https://github.com/literalpie/storybook-framework-qwik/issues/16
    // For now, use the legacy addon-actions API wrapped in a $ to make your own QRL action.
    onClick$: $((event, element) => {
      action('click action')({ event, element });
    }),
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  render: ({ label, backgroundColor, primary, onClick$, size }) => {
    return (
      <Button
        backgroundColor={backgroundColor}
        primary={primary}
        onClick$={(args, element) => onClick$?.(args, element)}
        size={size}
      >
        {label}
      </Button>
    );
  },
  component: Button,
} as Meta<ButtonProps & { label: string }>;

type Story = StoryObj<ButtonProps & { label: string }>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
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

import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { ButtonProps } from "./button";
import { Button } from "./button";

const meta = {
  title: "Button",
  args: { },
  argTypes: {
    onClick$: { action: 'onClick'},
    backgroundColor: { control: "color" },
  },
  component: Button,
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

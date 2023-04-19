import { action } from "@storybook/addon-actions";
import { $ } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { ButtonProps, onClickEvent } from "./button";
import { Button } from "./button";

const meta = {
  title: "Button",
  args: {
    // automatic actions are not yet supported.
    // See https://github.com/literalpie/storybook-framework-qwik/issues/16
    // For now, use the legacy addon-actions API wrapped in a $ to make your own QRL action.
    onClick$: $<onClickEvent>((event, element) => {
      action("click action")({ event, element });
    }),
  },
  argTypes: {
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

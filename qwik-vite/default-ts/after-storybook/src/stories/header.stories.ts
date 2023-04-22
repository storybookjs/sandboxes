import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { HeaderProps } from "./header";
import { Header } from "./header";
import { $ } from "@builder.io/qwik";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Example/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    // automatic actions are not yet supported.
    // See https://github.com/literalpie/storybook-framework-qwik/issues/16
    // For now, use the legacy addon-actions API wrapped in a $ to make your own QRL action.
    onCreateAccount$: $<() => void>(() => {
      action("Create Account Action")();
    }),
    onLogin$: $<() => void>(() => {
      action("Login Action")();
    }),
    onLogout$: $<() => void>(() => {
      action("Logout Action")();
    }),
  },
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const LoggedOut: Story = {};

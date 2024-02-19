import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { HeaderProps } from "./header";
import { Header } from "./header";

const meta = {
  title: "Example/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  args: { },
  argTypes: {
    onCreateAccount$: { action: 'onCreateAccount' },
    onLogin$: { action: 'onLogin' },
    onLogout$: { action: 'onLogout' },
  }
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

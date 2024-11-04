import { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import * as React from 'react';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {},
    onLogin: () => {},
    onLogout: () => {},
    onCreateAccount: () => {},
  },
};

export const LoggedOut: Story = {
  args: {
    onLogin: () => {},
    onLogout: () => {},
    onCreateAccount: () => {},
  },
};

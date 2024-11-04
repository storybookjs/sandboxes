import type { Meta } from '@storybook/react';
import * as HeaderStories from './Header.stories';
import { Page } from './Page';
import * as React from 'react';

export default {
  component: Page,
} as Meta<typeof Page>;

export const LoggedIn = {
  args: HeaderStories.LoggedIn.args,
};

export const LoggedOut = {
  args: HeaderStories.LoggedOut.args,
};

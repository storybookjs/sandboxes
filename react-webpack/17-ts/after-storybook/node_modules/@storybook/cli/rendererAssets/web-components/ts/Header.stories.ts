import type { Meta, StoryFn } from '@storybook/web-components';
import { Header, HeaderProps } from './Header';

export default {
  title: 'Example/Header',
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => Header(args);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};

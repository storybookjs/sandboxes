import m from 'mithril';

import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template = ({ label, ...args }) => ({
  view: () => m(Header, args, label),
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};

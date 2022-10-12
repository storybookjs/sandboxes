import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
  },
};

const Template = (args) => ({
  component: Button,
  props: args,
});

export const Text = Template.bind({});
Text.args = {
  label: 'Button',
  onClick: action('onClick'),
};

export const Emoji = Template.bind({});
Emoji.args = {
  label: '😀 😎 👍 💯',
};

export const TextWithAction = () => ({
  component: Button,
  props: {
    label: 'Trigger Action',
    onClick: () => action('This was clicked')(),
  },
});

TextWithAction.storyName = 'With an action';
TextWithAction.parameters = { notes: 'My notes on a button with emojis' };

export const ButtonWithLinkToAnotherStory = () => ({
  component: Button,
  props: {
    label: 'Go to Welcome Story',
    onClick: linkTo('example-introduction--page'),
  },
});

ButtonWithLinkToAnotherStory.storyName = 'button with link to another story';

import { within, userEvent } from '@storybook/testing-library';
import MyPage from './Page.vue';

export default {
  title: 'Example/Page',
  component: MyPage,
  render: () => ({
    // Components used in your story `template` are defined in the `components` object
    components: { MyPage },
    // Here we define the `template`
    template: '<my-page />',
  }),
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
};

export const LoggedOut = {};

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
export const LoggedIn = {
  render: () => ({
    components: {
      MyPage,
    },
    template: '<my-page />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};

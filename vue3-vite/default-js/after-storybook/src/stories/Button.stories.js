import MyButton from './Button.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: MyButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/docs-page
  tags: ['docsPage'],
  // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: {
      MyButton,
    },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return {
        args,
      };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<my-button v-bind="args" />',
  }),
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    onClick: {},
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

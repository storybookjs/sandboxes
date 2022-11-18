import Button from './Button.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/svelte/writing-docs/docs-page
  tags: ['docsPage'],
  // More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
  render: (args) => ({
    Component: Button,
    props: args,
    on: {
      click: args.onClick,
    },
  }),
  argTypes: {
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select' },
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

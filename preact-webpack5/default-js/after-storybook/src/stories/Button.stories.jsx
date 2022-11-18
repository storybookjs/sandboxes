import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/preact/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/preact/writing-docs/docs-page
  tags: ['docsPage'],
  // More on argTypes: https://storybook.js.org/docs/preact/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
};

// More on component templates: https://storybook.js.org/docs/preact/writing-stories/introduction#using-args
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

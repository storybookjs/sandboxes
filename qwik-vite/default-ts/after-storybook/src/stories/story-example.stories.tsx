import { Meta } from "storybook-framework-qwik";
import { StoryExample, StoryExampleProps } from "./story-example";

export default {
  title: "Story Example",
  args: {
    label: "Example label",
    color: "red",
  },
  argTypes: {
    color: {
      options: ["red", "green", "blue"],
      control: {
        type: "select",
      },
    },
  },
  render: ({ label, color }) => {
    return <StoryExample color={color}>{label}</StoryExample>;
  },
  component: StoryExample,
} as Meta<Options>;

type Options = StoryExampleProps & { label: string };

export const Default = {};

import type { PropFunction } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import buttonStyles from "./button.css?inline";

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick$?: PropFunction<onClickEvent> | undefined;
}

export const getClassForSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "storybook-button--small";
    case "medium":
      return "storybook-button--medium";
    case "large":
      return "storybook-button--large";
  }
};

export type onClickEvent = (
  event: MouseEvent,
  element: Element
) => void;

export const Button = component$<ButtonProps>(
  ({ primary = false, size = "medium", backgroundColor, label, onClick$ }) => {
    useStylesScoped$(buttonStyles);
    const classes = [
      "storybook-button",
      primary ? "storybook-button--primary" : "storybook-button--secondary",
      getClassForSize(size),
    ];
    return (
      <button
        class={classes}
        style={backgroundColor ? { backgroundColor } : {}}
        onClick$={onClick$}
      >
        {label}
      </button>
    );
  }
);

import { definePreview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
setCompodocJson(docJson);

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
});
import { definePreview } from '@storybook/react-webpack5'
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';

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
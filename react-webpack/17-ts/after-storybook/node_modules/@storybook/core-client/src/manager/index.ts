import global from 'global';
import { renderStorybookUI } from '@storybook/ui';

import Provider from './provider';

const { document } = global;

// We need to wait a promise "tick" to allow all subsequent addons etc to execute
// (alternatively, we could ensure this entry point is always loaded last)
Promise.resolve().then(() => {
  const rootEl = document.getElementById('root');
  renderStorybookUI(rootEl, new Provider());
});

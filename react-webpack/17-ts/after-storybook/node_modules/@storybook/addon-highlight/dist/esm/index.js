export { HIGHLIGHT, RESET_HIGHLIGHT } from './constants';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
} // make it work with --isolatedModules


export default {};
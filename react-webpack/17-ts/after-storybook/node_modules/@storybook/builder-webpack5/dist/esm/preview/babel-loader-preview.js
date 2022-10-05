import { getProjectRoot } from '@storybook/core-common';
export var createBabelLoader = function (options, typescriptOptions) {
  return {
    test: typescriptOptions.skipBabel ? /\.(mjs|jsx?)$/ : /\.(mjs|tsx?|jsx?)$/,
    use: [{
      loader: require.resolve('babel-loader'),
      options: options
    }],
    include: [getProjectRoot()],
    exclude: /node_modules/
  };
};
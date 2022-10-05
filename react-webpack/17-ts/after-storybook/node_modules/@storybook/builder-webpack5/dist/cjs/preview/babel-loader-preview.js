"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBabelLoader = void 0;

var _coreCommon = require("@storybook/core-common");

var createBabelLoader = function (options, typescriptOptions) {
  return {
    test: typescriptOptions.skipBabel ? /\.(mjs|jsx?)$/ : /\.(mjs|tsx?|jsx?)$/,
    use: [{
      loader: require.resolve('babel-loader'),
      options: options
    }],
    include: [(0, _coreCommon.getProjectRoot)()],
    exclude: /node_modules/
  };
};

exports.createBabelLoader = createBabelLoader;
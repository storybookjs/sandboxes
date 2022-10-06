process.env.NODE_ENV = 'development';
const host = process.env.HOST || 'localhost';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.html',
  devServer: {
    compress: true,
    hot: true,
    host,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.js$/i,
        exclude: /\.file.js$/i,
        loader: "babel-loader",
      },
      {
        test: /\.file.js$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        exclude: /\.file.css$/i,
        loader: "css-loader",
      },
      {
        test: /\.file.css$/i,
        type: "asset/resource",
      },
    ],
  },
}
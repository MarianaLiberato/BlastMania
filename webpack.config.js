// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main.ts', // Entry point of your TypeScript code
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/, // Use the TypeScript loader for .ts files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Specify the path to your index.html
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'), // Use 'static' instead of 'contentBase'
    historyApiFallback: true, // Enable client-side routing if needed
    open: true,
  },
};

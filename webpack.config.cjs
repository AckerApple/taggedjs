 

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { ResolveTsForJsPlugin } = require('./ResolveTsForJsPlugin.class.cjs');

const out = path.resolve(__dirname, 'dist');
console.debug(`🖊️ Writing bundle to ${out}`);

module.exports = {
  mode: 'production', // development
  devtool: 'source-map',
  entry: './ts/index.ts', // Entry point of your TypeScript application
  output: {
    filename: 'bundle.js',
    path: out,
    libraryTarget: 'module',
    chunkFormat: 'module',
  },
  experiments: {
    outputModule: true,
  },
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ResolveTsForJsPlugin(),
    new webpack.BannerPlugin({
      banner: '"use strict";',
      raw: true,
    }),
    // new CompressionPlugin({algorithm: 'gzip'}),
  ],
};
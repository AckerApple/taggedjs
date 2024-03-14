const path = require('path');

const out = path.resolve(__dirname, 'assets', 'dist');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts', // Entry point of your TypeScript application
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
    alias: {
      taggedjs: path.resolve(__dirname, '../main/ts'),
    }
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
};

// webpack.config.js
/*
const path = require('path');

const out = path.resolve(__dirname, 'assets', 'dist')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './assets/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: out,
    libraryTarget: 'module',
    chunkFormat: 'module', // Specify the chunkFormat
  },
  experiments: {
    outputModule: true, // Enable experiments.outputModule
  },
  target: 'node'
};
*/
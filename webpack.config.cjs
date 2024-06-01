const path = require('path');
const out = path.resolve(__dirname, 'dist');
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const { ResolveTsForJsPlugin } = require('./ResolveTsForJsPlugin.class.cjs');
console.debug(`🖊️ Writing bundle to ${out}`)

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
    alias: {
      // taggedjs: path.resolve(__dirname, '../main/ts'),
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
  optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
          chunks: 'all',
      },
  },
  plugins: [
      new ResolveTsForJsPlugin(),
      new CompressionPlugin({
          algorithm: 'gzip',
      }),
  ]
}

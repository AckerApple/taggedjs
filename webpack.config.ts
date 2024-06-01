import * as path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

import { fileURLToPath } from 'url'
import ResolveTsForJsPlugin from './ResolveTsForJsPlugin.class.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const out = path.resolve(__dirname, 'assets', 'dist')

export default {
  mode: 'production', // development
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
    /*splitChunks: {
        chunks: 'all',
    },*/
  },
  plugins: [
    new ResolveTsForJsPlugin(),
    new CompressionPlugin({
        algorithm: 'gzip',
    }),
  ]
}
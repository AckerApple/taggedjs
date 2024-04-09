const path = require('path');
const out = path.resolve(__dirname, 'dist');

console.debug(`🖊️ Writing bundle to ${out}`)

module.exports = {
  mode: 'development',
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
}

/*
const path = require('path');
const outPath = path.resolve(__dirname, 'dist')

console.debug(`🖊️ Writing bundle to ${outPath}`)

module.exports = {
  mode: 'production',
  entry: './js/index.js', // Your entry file
  output: {
    filename: 'index.js',
    path: outPath,
    libraryTarget: 'module',
    chunkFormat: 'module', // Specify the chunkFormat
  },
  experiments: {
    outputModule: true, // Enable experiments.outputModule
  },
  target: 'node',
  resolve: {
    extensions: ['.js']
  }
}
*/
const path = require('path');
// import * as path from 'path'

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Your entry file
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module',
    chunkFormat: 'module', // Specify the chunkFormat
  },
  experiments: {
    outputModule: true, // Enable experiments.outputModule
  },
  target: 'node'
}

// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './assets/js/app.js', // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets', 'dist'),
    libraryTarget: 'module',
    chunkFormat: 'module', // Specify the chunkFormat
  },
  experiments: {
    outputModule: true, // Enable experiments.outputModule
  },
  target: 'node'
};

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
  target: 'node'
}

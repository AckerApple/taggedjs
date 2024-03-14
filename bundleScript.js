// bundleScript.js
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// Create a compiler instance with the configuration
const compiler = webpack(webpackConfig);

module.exports.run = () => {
  console.log('🌎📦 bundling...')
  return new Promise((res, rej) => {
    compiler.run((err, stats) => {
      if (err) {
        console.error('🌎📦 🔴 bundle error', err)
        return rej(err)
      }

      if(stats.compilation.errors.length) {
        const error = stats.compilation.errors[0]
        console.error('🌎📦 🔴 bundle error', error)
        return rej(error)
      }

      res(stats)

      const assets = stats.compilation.assets
      console.log('🌎📦 ✅ bundled sizes in kilobytes', Object.entries(assets).reduce((all, [name, value]) => {
        all[name] = value.size() / 1000
        return all
      },{}))
    })
  })
}

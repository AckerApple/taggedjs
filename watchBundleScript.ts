import webpack from 'webpack'
import webpackConfig from './webpack.config'

// Create a compiler instance
const compiler = webpack(webpackConfig as any)

// Start watching for changes
compiler.watch({}, (err, stats) => {
  if (err) {
    console.error('Webpack watch error:', err)
    return
  }

  if (stats?.hasErrors()) {
    console.error('Webpack compile errors:\n', stats.toString('errors-only'))
  } else {
    console.log('Recompiled:\n', stats?.toString({ colors: true }))
  }
})

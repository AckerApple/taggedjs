// bundleScript.js
import * as fs from 'fs'
import * as path from 'path'
import webpack from 'webpack'
import webpackConfig from './webpack.config.mjs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create a compiler instance with the configuration
const compiler = webpack(webpackConfig);

export const run = () => {
  return new Promise((res, rej) => {
    compiler.run((err, stats) => {
      if (err) {
        console.log('err44')
        return rej({}/*err*/)
      }

      const outFilePath = path.resolve(__dirname, 'hmr.bundle.js')

      const fileString = fs.readFileSync(outFilePath).toString()
      const newFileString = fileString.replace(/var .{1,2}=new Error\("Cannot find module '"\+(.+)\+"'"\);/g, 'return import($1);')
      fs.writeFileSync(outFilePath, newFileString)
      
      console.log(`✏️ write bundle output of length ${fileString.length}`, {outFilePath})

      res(stats)
    })
  })
}

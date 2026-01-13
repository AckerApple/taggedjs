const fs = require('fs')
const path = require('path')

const pkgPath = path.join(__dirname, '..', 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

const outPath = path.join(__dirname, '..', 'ts', 'version.ts')
const contents = `export const version = "${pkg.version}"\n`

const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : ''
if (existing !== contents) {
  fs.writeFileSync(outPath, contents)
}

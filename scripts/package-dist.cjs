const fs = require('fs')
const path = require('path')
const pack = require('../package.json')

delete pack.scripts
delete pack.devDependencies
delete pack.private
pack.type = 'module'

const write = JSON.stringify(pack, null, 2)

const pathToWrite = path.join(__dirname,'../dist','package.json')
console.debug(`🖊️ writing to ${pathToWrite}`)
fs.writeFileSync(pathToWrite, write)

console.info('✅ wrote ' + pathToWrite)

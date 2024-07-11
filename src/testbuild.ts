import { BaseSupport, RouteProps, RouteQuery, RouteTag, Subject, Tag, TagSubject, Support, TemplaterResult, ValueSubject, ValueTypes, getValueType, oneRenderToSupport, renderTagOnly, StringTag, BasicTypes, ContextItem, getNewGlobal } from 'taggedjs'
import App from './pages/app.js'
import isolatedApp from './pages/isolatedApp.page.js'

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const run = () => {
  const param = ''
  
  const routeProps = {
    param,
    paramSubject: new ValueSubject(param),
    query: new RouteQuery(),
  }
  

  const routeTag: RouteTag = (extraProps?: Record<string, any>) => {
    const allProps: RouteProps = Object.assign({}, routeProps)
    Object.assign({}, extraProps)
    return (isolatedApp as any)(allProps) // ()
  }

  return App(routeTag)
}

const templater = run() as any as TemplaterResult

const html = templaterToHtml(templater)
const fileSavePath = './pages/isolatedApp.page.html'
const fullFileSavePath = path.join(__dirname, fileSavePath)
fs.writeFileSync(fullFileSavePath, html)
console.debug(`💾 wrote ${fileSavePath}`)

function templaterToSupport(
  templater: TemplaterResult,
) {
  const subject: ContextItem = {
    value: templater, tagJsType: getValueType(templater), global: getNewGlobal()
  }
  templater.props = templater.props || []
  const support = new BaseSupport(templater, subject) as any as Support

  readySupport(support, subject)

  return support
}

function readySupport(
  support: Support,
  subject: ContextItem,
) {
  subject.support = support
  support.subject.global.oldest = support

  renderTagOnly(support, support, subject as TagSubject)
  support.buildContext()
  
  return support
}

function templaterToHtml(
  templater: TemplaterResult,
) {
  const support = templaterToSupport(templater)
  const context = support.subject.global.context
  const tag = support.templater.tag as StringTag // TODO: most likely do not want strings below
  const template = (support.strings || tag?.strings) as string[] // support.getTemplate()
  const strings = new Array(...template) // clone
  const values = Object.values(context)
  
  values.reverse().forEach((subject, index) => {
    processValue(
      subject.value,
      strings,
      values.length - 1 - index,
      support,
      subject as TagSubject
    )
  })
  return strings.join('')
}

function processValue(
  value: any,
  strings: string[],
  index: number,
  support: Support,
  subject?: TagSubject,
) {

  const valueType = getValueType(value)

  switch (valueType) {
    case ValueTypes.tagComponent:
      const tagString = templaterToHtml(value as TemplaterResult)
      strings.splice(index+1, 0, tagString)
      break

    case ValueTypes.templater:
    case ValueTypes.tag:
      const tag = (value as any).tag as StringTag // ??? TODO
      const subStrings = new Array(...tag.strings) // .reverse()
      const string = subStrings.map((x, index) => {
        const value = tag.values[index]
        x + processValue(
          value,
          [],
          tag.strings.length - 1 -index,
          support,
          {value, tagJsType: getValueType(value), global: getNewGlobal()} as TagSubject
        )
      }).join('')
      strings.splice(index+1, 0, string)
      //const tempString = templaterToHtml(value as TemplaterResult)
      //strings.splice(index+1, 0, tempString)
      break
    
    case BasicTypes.function:
      if(!(value as any).oneRender) {
        strings.splice(index + 1, 0, '"' + value.toString() + '"')
        break // its not a function we should be messing with
      }

      const tSupport = oneRenderToSupport(
        value as any,
        subject as TagSubject,
        support, // ownerTagSupport as TagSupport,
      )

      readySupport(tSupport, subject as TagSubject)

      const fnString = templaterToHtml(tSupport.templater)
      strings.splice(index+1, 0, fnString)
      
      break
    
    default:
      if([undefined, null].includes(value)) {
        value = ''
      }

      strings.splice(index+1, 0, value.toString())
      break
  }

  return strings
}
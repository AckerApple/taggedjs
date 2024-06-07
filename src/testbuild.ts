import { BaseTagSupport, RouteProps, RouteQuery, RouteTag, Subject, Tag, TagSubject, TagSupport, TemplaterResult, ValueSubject, ValueTypes, getValueType, oneRenderToTagSupport, renderTagOnly } from 'taggedjs'
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
  const subject = new Subject<any>() as TagSubject

  templater.children = templater.children || new ValueSubject([])
  templater.props = templater.props || []

  const support = new BaseTagSupport(templater, subject) as any as TagSupport

  readySupport(support, subject)

  return support
}

function readySupport(
  support: TagSupport,
  subject: TagSubject,
) {
  subject.tagSupport = support
  support.global.oldest = support

  renderTagOnly(support, support, subject)
  support.update()
  
  return support
}

function templaterToHtml(
  templater: TemplaterResult,
  ownerTagSupport?: TagSupport,
) {
  const support = templaterToSupport(templater)
  const context = support.global.context
  const template = support.getTemplate()
  const strings = new Array(...template.strings) // clone
  const values = Object.values(context)
  
  values.reverse().forEach((subject, index) => {
    processValue(
      subject.value,
      strings,
      values.length - 1 - index,
      support,
      //ownerTagSupport,
      subject as TagSubject
    )
  })
  return strings.join('')
}

function processValue(
  value: any,
  strings: string[],
  index: number,
  support: TagSupport,
  // ownerTagSupport?: TagSupport,
  subject?: TagSubject,
) {

  const valueType = getValueType(value)

  switch (valueType) {
    case ValueTypes.tagComponent:
      const tagString = templaterToHtml(value as TemplaterResult, support)
      strings.splice(index+1, 0, tagString)
      break

    case ValueTypes.templater:
    case ValueTypes.tag:
      const tag = (value as any).tag as Tag
      const subStrings = new Array(...tag.strings) // .reverse()
      const string = subStrings.map((x, index) =>
        x + processValue(
          tag.values[index],
          [],
          tag.strings.length - 1 -index,
          support,
          new Subject<any>(tag.values[index]) as TagSubject
        )
      ).join('')
      strings.splice(index+1, 0, string)
      //const tempString = templaterToHtml(value as TemplaterResult)
      //strings.splice(index+1, 0, tempString)
      break
    
    case ValueTypes.function:
      if(!(value as any).oneRender) {
        strings.splice(index + 1, 0, '"' + value.toString() + '"')
        break // its not a function we should be messing with
      }

      const tagSupport = oneRenderToTagSupport(
        value as any,
        subject as TagSubject,
        support, // ownerTagSupport as TagSupport,
      )

      readySupport(tagSupport, subject as TagSubject)

      const fnString = templaterToHtml(tagSupport.templater, tagSupport)
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
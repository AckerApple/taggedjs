import { AnySupport, RouteProps, RouteQuery, RouteTag, Support, TemplaterResult, ValueSubject, ValueTypes, oneRenderToSupport, renderTagOnly, StringTag, ContextItem, getNewGlobal, getBaseSupport, SupportTagGlobal, SupportContextItem } from 'taggedjs'
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
  const subject: SupportContextItem = {
    renderCount: 0,
    value: templater,
    global: undefined as any, // populated below in getNewGlobal
    // checkValueChange: checkSimpleValueChange,
    // delete: deleteSimpleValue,
    withinOwnerElement: false,
  }
  
  getNewGlobal(subject) as SupportTagGlobal
  templater.props = templater.props || []
  const support = getBaseSupport(templater, subject) as any as Support

  readySupport(support, subject)

  return support
}

function readySupport(
  support: AnySupport,
  subject: SupportContextItem,
) {
  const global = subject.global
  global.newest = support
  global.oldest = support

  renderTagOnly(support, support, subject)
  // buildSupportContext(support)
  
  return support
}

function templaterToHtml(
  templater: TemplaterResult,
) {
  const support = templaterToSupport(templater)
  const global = support.subject.global as SupportTagGlobal
  const context = global.context as ContextItem[]
  const tag = support.templater.tag as StringTag // TODO: most likely do not want strings below
  const template = tag.strings // support.getTemplate()
  const strings = new Array(...template) // clone
  const values = Object.values(context)
  
  values.reverse().forEach((subject, index) => {
    processValue(
      subject.value,
      strings,
      values.length - 1 - index,
      support,
      subject,
    )
  })
  return strings.join('')
}

function processValue(
  value: any,
  strings: string[],
  index: number,
  support: Support,
  subject?: ContextItem,
) {

  if(value instanceof Object && value.tagJsType) {
    switch (value.tagJsType) {
      case ValueTypes.tagComponent:
        const tagString = templaterToHtml(value as TemplaterResult)
        strings.splice(index+1, 0, tagString)
        break
  
      case ValueTypes.renderOnce: 
        const tSupport = oneRenderToSupport(
          value as any,
          subject as ContextItem,
          support, // ownerTagSupport as TagSupport,
        )
  
        readySupport(tSupport, subject as SupportContextItem)
  
        const fnString = templaterToHtml(tSupport.templater)
        strings.splice(index+1, 0, fnString)
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
            {
              value,
              global: getNewGlobal(subject as ContextItem),
              // checkValueChange: checkSimpleValueChange,
              // delete: destorySupportByContextItem,
              withinOwnerElement: subject?.withinOwnerElement || false,
            }
          )
        }).join('')
        strings.splice(index+1, 0, string)
        break  
    }
  } else {
    if(value instanceof Function) {
      strings.splice(index + 1, 0, '"' + value.toString() + '"')
    } else {
      if([undefined, null].includes(value)) {
        value = ''
      }
    
      strings.splice(index+1, 0, value.toString())
    }
  }

  return strings
}

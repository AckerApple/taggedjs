import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import {  TagWrapper } from '../tag/tag.utils.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, appElements, buildBeforeElement, ContextItem, TagAppElement, TagGlobal, UseMemory, Wrapper } from '../index.js'
import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { processReplacementComponent } from '../tag/update/processFirstSubjectComponent.function.js'

export function registerTagElement(
  support: AnySupport,
  element: Element | HTMLElement,
  global: TagGlobal, // TODO: remove
  templater: TemplaterResult,
  app: TagMaker,
  placeholder: Text,
) {
  const context = support.context
  context.state.oldest = support
  context.state.newest = support
  
  // Copy newer to older when resetting
  context.state.older = context.state.newer


  // TODO: WORKING HERE to implement higher level tagElement using mock elements

  const tag = support.templater.tag as any
  if( !['dom','html'].includes(tag.tagJsType) ) {
    context.contexts = context.contexts || []
    const newFragment = document.createDocumentFragment()
    newFragment.appendChild(placeholder)
    processReplacementComponent(
      support.templater,
      context,
      support,
    )

    return newFragment
  }

  // console.debug('🏷️ Building element into tag...', {element, app, support})
  const result = buildBeforeElement(
    support,
    element,
    undefined,
  )

  let setUse = (templater as unknown as TagAppElement).setUse

  if (templater.tagJsType !== ValueTypes.stateRender) {
    const wrap = app as unknown as Wrapper
    const original = (wrap as unknown as TagWrapper<unknown>).original
    setUse = original.setUse as unknown as UseMemory; (original as any).isApp = true
  }

  ;(element as TagAppElement).setUse = setUse; (element as TagAppElement).ValueTypes = ValueTypes
  appElements.push({ element, support })

  return putDownTagDom(placeholder, result)
}

function putDownTagDom(
  placeholder: Text,
  result: {
    contexts: ContextItem[]
    dom: DomObjectChildren
  }
) {
  const newFragment = document.createDocumentFragment()
  newFragment.appendChild(placeholder)

  for (const domItem of result.dom) {
    putOneDomDown(domItem, newFragment)
  }

  // console.debug('🏷️ Element Tag DOM built ✅')
  return newFragment
}

function putOneDomDown(
  dom: DomObjectText | DomObjectElement,
  newFragment: DocumentFragment,
) {
  if(dom.domElement) {
    newFragment.appendChild(dom.domElement)
  }
  if(dom.marker) {
    newFragment.appendChild(dom.marker)
  }
}

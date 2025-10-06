import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import {  TagWrapper } from '../tag/tag.utils.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, appElements, BaseTagGlobal, buildBeforeElement, ContextItem, SupportContextItem, TagAppElement, UseMemory, Wrapper } from '../index.js'
import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { convertTagToElementManaged } from '../tag/update/convertTagToElementManaged.function.js'

export function registerTagElement(
  support: AnySupport,
  element: Element | HTMLElement,
  global: BaseTagGlobal,
  templater: TemplaterResult,
  app: TagMaker,
  placeholder: Text,
) {
  const tag = support.templater.tag as any
  if( !['dom','html'].includes(tag.tagJsType) ) {
    const context = {
      placeholder, // where to build off of
    } as SupportContextItem
    const conversion = convertTagToElementManaged(support, support, context)
    const dom = conversion.context.htmlDomMeta as DomObjectChildren
    const elmSetup = {
      dom,
      contexts: conversion.context.contexts
    }
    console.log('conversion', {elmSetup})
    return putDownTagDom(placeholder, elmSetup)
  }

  // console.debug('🏷️ Building element into tag...', {element, app, support})
  const result = buildBeforeElement(
    support,
    element,
    undefined,
  )

  const subject = support.context
  subject.state.oldest = support
  subject.state.newest = support
  
  // Copy newer to older when resetting
  subject.state.older = subject.state.newer

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

function putDownTagDom(placeholder: Text, result: { contexts: ContextItem[]; dom: DomObjectChildren }) {
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

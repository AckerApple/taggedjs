import { ParsedHtml } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { attachDomElements } from '../interpolations/optimizers/attachDomElements.function.js'
import { getDomMeta } from './domMetaCollector.js'
import { DomMetaMap } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js'
import { painting } from './paint.function.js'
import { AnySupport } from './Support.class.js'
import { processAttributeEmit, processNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { Context, ContextItem, DomTag, StringTag } from './Tag.class.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'
import { getValueType } from './getValueType.function.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'

/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(
  support: AnySupport,
  element?: Element,
  options?: ElementBuildOptions,
) {
  const global = support.subject.global as SupportTagGlobal

  global.oldest = support
  global.newest = support

  ++painting.locks
  const result = getHtmlDomMeta(support, options, element)
  global.htmlDomMeta = result.dom
  --painting.locks

  // return fragment
  return result
}

function getHtmlDomMeta(
  support: AnySupport,
  options: ElementBuildOptions = {
    counts: {added:0, removed: 0},
  },
  appendTo?: Element,
) {
  const domMeta = loadDomMeta(support)
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  const context: Context = []

  const global = support.subject.global as SupportTagGlobal
  global.context = context

  const result = attachDomElements(
    domMeta,
    values,
    support,
    options.counts,
    context,
    appendTo,
  )

  // const context = global.context = result.context
  // processContext(support, context)
      
  return result
}

function loadDomMeta(support: AnySupport): ParsedHtml {
  const templater = support.templater
  const thisTag = (templater.tag as StringTag | DomTag) // || templater

  if(thisTag.tagJsType === ValueTypes.dom) {
    return (thisTag as DomTag).dom as DomMetaMap
  }

  return getDomMeta((thisTag as StringTag).strings, thisTag.values)
}

function processContext(
  support: AnySupport,
  context: Context,
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values

  let index = 0
  const len = values.length
  while (index < len) {
    const contextItem = context[index]
    const value = values[index] as any
    const global = contextItem.global
    const nowValueType = global.nowValueType // = getValueType(value)

    runOneContext(
      value,
      values,
      index,
      context,
      support,
    )
    
    ++index
  }

  return context
}

export function runOneContext(
  value: unknown,
  values: unknown[],
  index: number,
  context: Context,
  ownerSupport: AnySupport,
): ContextItem {
  const global = getNewGlobal()
  const contextItem: ContextItem = {
    global
  }

  context.push(contextItem)
  const nowValueType = global.nowValueType = getValueType(value)

  processOneContext(
    values,
    values[index],
    contextItem,
    context,
    ownerSupport,
  )

  contextItem.value = value
  global.lastValueType = nowValueType


  if(!contextItem.global.locked) {
    ++contextItem.global.renderCount
  }

  return contextItem
}

/** returns boolean of did render */
function processOneContext(
  values: unknown[],
  value: unknown,
  contextItem: ContextItem,
  context: Context,
  ownerSupport: AnySupport,
): boolean {
  const global = contextItem.global

  if(global.isAttr) {
    // global.newest = ownerSupport
    if(global.isNameOnly) {
      processNameOnlyAttrValue(
        values,
        value as any,
        contextItem.value,
        global.element as Element,
        ownerSupport,
        global.howToSet as HowToSet,
        context,
      )

      return false
    }

    const element = contextItem.global.element as Element
    processAttributeEmit(
      value,
      contextItem.global.attrName as string,
      contextItem,
      element,
      ownerSupport,
      contextItem.global.howToSet as HowToSet,
      contextItem.global.isSpecial as boolean,
    )

    return false
  }

  return false
}

import { ParsedHtml } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { attachDomElement } from '../interpolations/optimizers/metaAttachDomElements.function.js'
import { getDomMeta } from './domMetaCollector.js'
import { DomMetaMap } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js'
import { painting } from './paint.function.js'
import { AnySupport } from './Support.class.js'
import { buildSupportContext } from './buildSupportContext.function.js'
import { processAttributeEmit, processNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { Context, DomTag, StringTag } from './Tag.class.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { ValueTypes } from './ValueTypes.enum.js'

/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(
  support: AnySupport,
  element?: Element,
  options?: ElementBuildOptions,
) {
  const global = support.subject.global

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
  const context = buildSupportContext(support)
  const result = attachDomElement(
    domMeta,
    context,
    support,
    options.counts,
    appendTo,
  )

  processContext(support, context)
      
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

    processOneContext(
      values,
      index,
      context,
      support,
    )

    contextItem.value = value
    contextItem.global.lastValue = value
    if(!contextItem.global.locked) {
      ++contextItem.global.renderCount
    }
    
    ++index
  }

  return context
}

/** returns boolean of did render */
function processOneContext(
  values: unknown[],
  index: number,
  context: Context,
  ownerSupport: AnySupport,
): boolean {
  const value = values[index] as any

  // is something already there?
  const contextItem = context[index]
  const global = context[index].global

  if(global.isAttr) {
    // global.newest = ownerSupport
    if(global.isNameOnly) {
      processNameOnlyAttrValue(
        value,
        contextItem.global.lastValue,
        global.element as Element,
        ownerSupport,
        global.howToSet as HowToSet,
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

import { attachDomElements } from '../interpolations/optimizers/attachDomElements.function.js'
import { DomMetaMap } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { Counts } from '../interpolations/interpolateTemplate.js'
import { AnySupport } from './AnySupport.type.js'
import { SupportContextItem } from './createHtmlSupport.function.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { ContextItem } from './Context.types.js'
import { ParsedHtml } from '../interpolations/index.js'
import { checkSimpleValueChange, deleteSimpleValue, destorySupportByContextItem } from './index.js'
import { getDomMeta } from './domMetaCollector.js'
import type { DomTag } from './DomTag.type.js'
import type { StringTag } from './StringTag.type.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { painting } from './paint.function.js'

/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(
  support: AnySupport,
  counts: Counts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const subject = support.subject
  subject.delete = destorySupportByContextItem
  const global = subject.global as SupportTagGlobal

  global.oldest = support
  global.newest = support

  ++painting.locks
  const result = attachHtmlDomMeta(support, counts, appendTo, insertBefore)
    
  global.htmlDomMeta = result.dom
  --painting.locks

  // return fragment
  return result
}

function attachHtmlDomMeta(
  support: AnySupport,
  counts: Counts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const domMeta = loadDomMeta(support)
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  const context:SupportContextItem[] = []

  const global = support.subject.global as SupportTagGlobal
  global.context = context

  const result = attachDomElements(
    domMeta,
    values,
    support,
    counts,
    context,
    0,
    appendTo,
    insertBefore,
  )
      
  return result
}

function loadDomMeta(support: AnySupport): ParsedHtml {
  const templater = support.templater
  const thisTag = (templater.tag as StringTag | DomTag) // || templater

  if(thisTag.tagJsType === ValueTypes.dom) {
    return (thisTag as DomTag).dom as DomMetaMap
  }

  const strings = (thisTag as StringTag).strings

  return getDomMeta(strings, thisTag.values)
}

export function addOneContext(
  value: unknown,
  context: ContextItem[],
  withinOwnerElement: boolean
): ContextItem {
  const contextItem: ContextItem = {
    value,
    checkValueChange: checkSimpleValueChange,
    delete: deleteSimpleValue,
    withinOwnerElement,
  }

  context.push(contextItem)

  return contextItem
}

import { attachDomElements } from './dom/attachDomElements.function.js'
import { DomMetaMap } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { Counts } from '../interpolations/interpolateTemplate.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { SupportContextItem } from '../tag/createHtmlSupport.function.js'
import { SupportTagGlobal } from '../tag/getTemplaterResult.function.js'
import { ContextItem } from '../tag/Context.types.js'
import { ParsedHtml } from '../interpolations/index.js'
import { destorySupportByContextItem } from '../tag/index.js'
import { getDomMeta } from '../tag/domMetaCollector.js'
import type { DomTag } from '../tag/DomTag.type.js'
import type { StringTag } from '../tag/StringTag.type.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
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
    checkValueChange: undefined as any, // checkSimpleValueChange,
    delete: undefined as any, // deleteSimpleValue,
    withinOwnerElement,
  }

  context.push(contextItem)

  return contextItem
}

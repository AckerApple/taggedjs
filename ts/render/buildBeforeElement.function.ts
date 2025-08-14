import { attachDomElements } from './dom/attachDomElements.function.js'
import { DomMetaMap } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { SupportTagGlobal } from '../tag/getTemplaterResult.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { ParsedHtml } from '../interpolations/index.js'
import { Tag } from '../tag/index.js'
import { getDomMeta } from '../tag/domMetaCollector.js'
import type { DomTag } from '../tag/DomTag.type.js'
import type { StringTag } from '../tag/StringTag.type.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { painting } from './paint.function.js'

/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(
  support: AnySupport,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const subject = support.context
  const global = subject.global as SupportTagGlobal
  
  // TODO this is only needed for components and not basic tags
  subject.state = subject.state || {}

  const stateMeta = subject.state
  
  stateMeta.oldest = support
  stateMeta.newest = support
  subject.state.older = subject.state.newer

  ++painting.locks
  const result = attachHtmlDomMeta(
    support,
    support.context,
    appendTo,
    insertBefore,
  )
    
  global.htmlDomMeta = result.dom
  --painting.locks

  // return fragment
  return result
}

function attachHtmlDomMeta(
  support: AnySupport,
  parentContext: ContextItem,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const domMeta = loadDomMeta(support)
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values
  const contexts: SupportContextItem[] = []

  support.context.contexts = contexts

  const result = attachDomElements(
    domMeta,
    values,
    support,
    parentContext,
    contexts,
    0, // depth
    appendTo,
    insertBefore,
  )
      
  return result
}

/** Extracts variables from support in order to merge strings & values with dom meta into a html array tree */
function loadDomMeta(support: AnySupport): ParsedHtml {
  const templater = support.templater
  const thisTag = templater.tag as Tag

  if(thisTag.tagJsType === ValueTypes.dom) {
    return (thisTag as DomTag).dom as DomMetaMap
  }

  const strings = (thisTag as StringTag).strings

  return getDomMeta(strings, thisTag.values)
}

import { AdvancedContextItem, AnySupport, ContextItem, deleteSubContext, guaranteeInsertBefore, onFirstSubContext, SubContext, Tag, TagCounts } from "../index.js"
import { ProcessInit } from "../tag/ProcessInit.type.js"
import { TemplateValue } from "../tag/TemplateValue.type.js"
import { forceUpdateExistingValue } from "../tag/update/index.js"
import { TagJsVar } from "./tagJsVar.type.js"

type InnerHTMLValue = TagJsVar & {
  tagJsType: 'innerHTML'
  processInit: ProcessInit
}

function handleInnerHTML(
  value: TemplateValue,
  newSupport: AnySupport,
  contextItem: ContextItem,
  counts: TagCounts,
) {
  const owner = (value as any).owner
  const realValue = owner._innerHTML
  realValue.processInit = realValue.oldProcessInit

  const context = contextItem.subContext?.contextItem as AdvancedContextItem

  forceUpdateExistingValue(
    context,
    realValue,
    newSupport,
    counts,
  )
}

function processInnerHTML(
  value: InnerHTMLValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  contextItem.subContext = {} as SubContext
  
  // contextItem.handler = handleInnerHTML
  value.processUpdate = handleInnerHTML

  checkInnerHTML(
    value,
    ownerSupport,
    contextItem,
    counts,
    insertBefore as Text,
    appendTo,
  )
}

function checkInnerHTML(
  value: unknown,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
  counts: TagCounts,
  insertBeforeOriginal: Text,
  appendTo?: Element,
) {
  const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal)

  const subContext = contextItem.subContext as SubContext
  subContext.appendMarker = appendMarker

  const owner = (value as any).owner
  const realValue = owner._innerHTML
  realValue.processInit = realValue.oldProcessInit
  

  /** Render the content that will CONTAIN the innerHTML */
  onFirstSubContext(
    realValue,
    subContext,
    ownerSupport,
    counts,
    insertBefore,
  )
}

export type TagJsVarInnerHTML = TagJsVar & {
  owner?: Tag
}

export function getInnerHTML(): TagJsVarInnerHTML {
  return {
    tagJsType: 'innerHTML',
    processInit: processInnerHTML,
    processUpdate: handleInnerHTML,
    delete: deleteSubContext,
  }
}

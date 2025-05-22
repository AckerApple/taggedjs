import { AdvancedContextItem, AnySupport, ContextItem, deleteSubContext, guaranteeInsertBefore, onFirstSubContext, SubContext, TagCounts } from "../index.js"
import { ProcessInit } from "../tag/ProcessInit.type.js"
import { TemplateValue } from "../tag/TemplateValue.type.js"
import { forceUpdateExistingValue } from "../tag/update/index.js"
import { TagJsVar } from "./tagJsVar.type.js"

type InnerHTMLValue = {
  tagJsType: 'innerHTML'
  processInit: ProcessInit
}

function handleInnerHTML(
  value: TemplateValue,
  newSupport: AnySupport,
  contextItem: ContextItem,
) {
  const owner = (value as any).owner
  const realValue = owner._innerHTML
  realValue.processInit = realValue.oldProcessInit

  const context = contextItem.subContext?.contextItem as AdvancedContextItem

  forceUpdateExistingValue(
    context,
    realValue,
    newSupport,
  )
}

function processInnerHTML(
  value: InnerHTMLValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
) {
  contextItem.subContext = {} as SubContext

  contextItem.handler = handleInnerHTML

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
  counts: TagCounts, // {added:0, removed:0}
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

export function getInnerHTML(): TagJsVar {
  return {
    tagJsType: 'innerHTML',
    processInit: processInnerHTML,
    delete: deleteSubContext,
    checkValueChange: () => console.log('weird innerHTML check') as any,
  }
}

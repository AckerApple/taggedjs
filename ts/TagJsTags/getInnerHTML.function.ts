import { AnySupport, ContextItem, deleteContextSubContext, guaranteeInsertBefore, onFirstSubContext, SubContext, TagJsComponent } from "../index.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { ProcessInit } from "../tag/ProcessInit.type.js"
import { TemplateValue } from "../tag/TemplateValue.type.js"
import { forceUpdateExistingValue } from "../tag/update/index.js"
import { TagJsTag } from "./TagJsTag.type.js"

type InnerHTMLValue = TagJsTag & {
  tagJsType: 'innerHTML'
  processInit: ProcessInit
}

function handleInnerHTML(
  value: TemplateValue,
  contextItem: ContextItem,
  newSupport: AnySupport,
) {
  ++contextItem.updateCount
  const owner = (value as any).owner
  const realValue = owner._innerHTML
  realValue.processInit = realValue.oldProcessInit

  const context = contextItem.subContext?.contextItem as ContextItem

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
  insertBefore?: Text,
  appendTo?: Element,
) {
  contextItem.subContext = {} as SubContext
  
  // contextItem.handler = handleInnerHTML
  value.processUpdate = handleInnerHTML

  checkInnerHTML(
    value,
    ownerSupport,
    contextItem,
    insertBefore as Text,
    appendTo,
  )
}

function checkInnerHTML(
  value: unknown,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
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
    insertBefore,
  )
}

export type TagJsTagInnerHTML = TagJsTag & {
  owner?: TagJsComponent<any>
}

export function getInnerHTML(): TagJsTagInnerHTML {
  return {
    component: false,
    tagJsType: 'innerHTML',
    hasValueChanged: () => 0, // not expected to do anything
    processInitAttribute: blankHandler,
    processInit: processInnerHTML,
    processUpdate: handleInnerHTML,
    destroy: deleteContextSubContext,
  }
}

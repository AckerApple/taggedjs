import { AnySupport, Subject } from '../index.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { painter } from '../render/paint.function.js'
import { ContextItem } from '../tag/index.js'
import { processNonElement } from './processChildren.function.js'

export function processElementVarFunction(
  item: any,
  element: HTMLElement | Text,
  context: ContextItem,
  ownerSupport: AnySupport,
  addedContexts: ContextItem[],
  paintBy: painter,
) {
  const subContexts: ContextItem[] = []
  const subContext: ContextItem = {
    updateCount: 0,
    parentContext: context,
    contexts: subContexts,
    value: item,
    htmlDomMeta: [],
    tagJsVar: {
      tagJsType: 'dynamic-text',
      hasValueChanged: () => 0,
      processInit: blankHandler,
      processInitAttribute: blankHandler,
      destroy: (_c, ownerSupport) => {
        ++subContext.updateCount
        subContexts.forEach(subSub =>
          subSub.tagJsVar.destroy(subSub, ownerSupport)
        )
      },
      processUpdate: (
        value: any,
        contextItem,
        ownerSupport: AnySupport,
        values: unknown[],
      ) => {
        ++subContext.updateCount
        const newValue = value(aSubContext)
        const result = aSubContext.tagJsVar.processUpdate(
          newValue,
          aSubContext,
          ownerSupport,
          values,
        )
        aSubContext.value = newValue
        contextItem.value = value
        return result
      }
    },

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  }

  addedContexts.push(subContext)

  const aSubContext = processNonElement(
    item(),
    context,
    subContext.contexts as ContextItem[],
    element,
    ownerSupport,
    paintBy,
  )

  return aSubContext
}
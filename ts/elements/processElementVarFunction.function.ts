import { AnySupport, isFunction, Subject } from '../index.js'
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
        /*
        if(typeof(value) !== 'function') {
          console.debug('value', {contextItem, value})
          throw new Error('issue of no function')
        }*/

        let newValue = value(aSubContext)
        const underFunction = (subContext as any).underFunction
        delete (subContext as any).underFunction
        if(newValue instanceof Function && !newValue.tagJsType) {
          if(underFunction && newValue.toString() === underFunction.toString()) {
            newValue = aSubContext.value
          } else {
            (subContext as any).underFunction = newValue
            newValue = newValue()
          }
        }

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

  let trueValue = item()
  if(isFunction(trueValue) && !trueValue.tagJsType) {
    ;(subContext as any).underFunction = trueValue
    trueValue = trueValue() // function returns function
  }

  const aSubContext = processNonElement(
    trueValue,
    context,
    subContext.contexts as ContextItem[],
    element,
    ownerSupport,
    paintBy,
  )

  return aSubContext
}
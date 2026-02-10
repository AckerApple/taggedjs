import { AnySupport, isFunction, Subject } from '../index.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { painter } from '../render/paint.function.js'
import { removeContextInCycle, setContextInCycle } from '../tag/cycles/setContextInCycle.function.js'
import { ContextItem } from '../tag/index.js'
import { processNonElement } from './processChildren.function.js'

export function processElementVarFunction(
  item: any,
  element: HTMLElement | Text,
  parentContext: ContextItem,
  ownerSupport: AnySupport,
  paintBy: painter,
) {
  const subContexts: ContextItem[] = []
  const subContext: ContextItem = {
    updateCount: 0,
    parentContext,
    contexts: subContexts,
    target: element as HTMLElement,
    value: item,
    htmlDomMeta: [],
    tagJsVar: {
      component: false,
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
        setContextInCycle(aSubContext)

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
        
        removeContextInCycle()

        return result
      }
    },

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
    render$: new Subject(),
    // paintCommands: [],
  }

  // addedContexts.push(subContext)
  setContextInCycle(subContext)

  let trueValue = item()
  const isAgainFunc = isFunction(trueValue) && !trueValue.tagJsType
  if(isAgainFunc) {
    ;(subContext as any).underFunction = trueValue
    trueValue = trueValue() // function returns function
  }

  const aSubContext = processNonElement(
    trueValue,
    subContext, // parentContext,
    element,
    ownerSupport,
    paintBy,
  )

  const contexts = parentContext.contexts as ContextItem[]
  contexts.push(subContext)

  removeContextInCycle()

  return aSubContext
}

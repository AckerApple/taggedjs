import { castTextValue } from '../castTextValue.function.js';
import { AnySupport, isFunction } from '../index.js';
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
import { getNewContext } from '../render/addOneContext.function.js';
import { painter, paintCommands } from '../render/paint.function.js';
import { removeContextInCycle, setContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { ContextItem } from '../tag/index.js';
import { processElementVar } from './processElementVar.function.js';
import { processElementVarFunction } from './processElementVarFunction.function.js';

export function processChildren(
  innerHTML: any[],
  parentContext: ContextItem,
  ownerSupport: AnySupport,
  element: HTMLElement | Text, // appendTo
  paintBy: painter, // paintAppend | paintBefore
) {
  innerHTML.forEach(item => {
    const type = typeof item;

    switch (type) {
      case 'string':
      case 'boolean':
      case 'number':
        return handleSimpleInnerValue(item, element, paintBy)

      case 'function': {
        if (item.tagJsType === 'element') {
          break // skip
        }

        const result = processElementVarFunction(
          item,
          element,
          parentContext,
          ownerSupport,
          paintBy,
        )

        return result
      }
    }

    if( item === null || item === undefined ) {
      return handleSimpleInnerValue(item, element, paintBy)
    }
    
    if (item.tagJsType === 'element') {
      const newElement = processElementVar(
        item,
        parentContext,
        ownerSupport,
        parentContext.contexts as ContextItem[],// addedContexts
      );
      
      paintCommands.push([paintBy, [element, newElement]]);
      
      const htmlDomMeta = parentContext.htmlDomMeta as DomObjectChildren
      htmlDomMeta.push({
        nn: newElement.tagName,
        domElement: newElement,
        // at: newElement.attributes,
        at: [],
      })

      return;
    }

    return processNonElement(
      item,
      parentContext,
      element,
      ownerSupport,
      paintBy,
    )
  })
}

/** used when a child is not another element and requires init processing */
export function processNonElement(
  item: any,
  parentContext: ContextItem,
  element: HTMLElement | Text,
  ownerSupport: AnySupport,
  paintBy: painter,
) {
  const newContext: ContextItem = getNewContext(
    item,
    [], // addedContexts
    true,
    parentContext,
  )

  const contexts = parentContext.contexts as ContextItem[]
  contexts.push(newContext)

  newContext.element = element as HTMLElement
  newContext.placeholder = document.createTextNode('');
  
  paintCommands.push([paintBy, [element, newContext.placeholder]]);

  setContextInCycle(newContext)

  newContext.tagJsVar.processInit(
    item,
    newContext, // context, // newContext,
    ownerSupport,
    newContext.placeholder
  )

  removeContextInCycle()

  return newContext
}

export function handleSimpleInnerValue(
  value: number | string,
  element: HTMLElement | Text,
  paintBy: painter,
) {
  const castedValue = castTextValue(value)
  const text = document.createTextNode(castedValue);
  paintCommands.push([paintBy, [element, text]]);
  return text;
}

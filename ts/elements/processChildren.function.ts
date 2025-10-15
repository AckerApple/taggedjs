import { castTextValue } from '../castTextValue.function.js';
import { AnySupport, Subject } from '../index.js';
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
import { getNewContext } from '../render/addOneContext.function.js';
import { painter, paintCommands } from '../render/paint.function.js';
import { ContextItem } from '../tag/index.js';
import { valueToTagJsVar } from '../tagJsVars/index.js';
import { processElementVar } from './processElementVar.function.js';
import { processElementVarFunction } from './processElementVarFunction.function.js';

export function processChildren(
  innerHTML: any[],
  context: ContextItem,
  ownerSupport: AnySupport,
  addedContexts: ContextItem[],
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
    }

    if( item === null || item === undefined ) {
      return handleSimpleInnerValue(item, element, paintBy)
    }

    if (item.tagJsType === 'element') {
      const newElement = processElementVar(
        item,
        context,
        ownerSupport,
        addedContexts
      );
      paintCommands.push([paintBy, [element, newElement]]);
      const htmlDomMeta = context.htmlDomMeta as DomObjectChildren
      htmlDomMeta.push({
        nn: newElement.tagName,
        domElement: newElement,
        // at: newElement.attributes,
        at: [],
      })
      return;
    }

    if(type === 'function') {
      return processElementVarFunction(
        item,
        element,
        context,
        ownerSupport,
        addedContexts,
        paintBy,
      )
    }

    return processNonElement(
      item,
      context,
      addedContexts,
      element,
      ownerSupport,
      paintBy,
    );
  });
}

export function processNonElement(
  item: any,
  context: ContextItem,
  addedContexts: ContextItem[],
  element: HTMLElement | Text,
  ownerSupport: AnySupport,
  paintBy: painter,
) {
  const newContext: ContextItem = getNewContext(
    item,
    addedContexts,
    true,
    context,
  )

  addedContexts.push(newContext);
  newContext.placeholder = document.createTextNode('');
  
  paintCommands.push([paintBy, [element, newContext.placeholder]]);

  newContext.tagJsVar.processInit(
    item,
    newContext, // context, // newContext,
    ownerSupport,
    newContext.placeholder
  );

  return newContext;
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

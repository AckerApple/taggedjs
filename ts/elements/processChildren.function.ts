import { AnySupport, Subject } from '../index.js';
import { paintAppends, paintAppend, painter, paintCommands } from '../render/paint.function.js';
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
    if (item.tagJsType === 'element') {
      const newElement = processElementVar(
        item,
        context,
        ownerSupport,
        addedContexts
      );
      paintCommands.push([paintBy, [element, newElement]]);
      return;
    }

    const type = typeof item;

    switch (type) {
      case 'string':
      case 'number':
        return handleSimpleInnerValue(item, element, paintBy);

      case 'function':
        return processElementVarFunction(
          item,
          element,
          context,
          ownerSupport,
          addedContexts,
          paintBy,
        );
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
  const tagJsVar = valueToTagJsVar(item);
  const newContext: ContextItem = {
    updateCount: 0,
    value: item,
    parentContext: context,
    tagJsVar,

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  };

  addedContexts.push(newContext);
  newContext.placeholder = document.createTextNode('');
  
  paintCommands.push([paintBy, [element, newContext.placeholder]]);

  tagJsVar.processInit(
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
  const text = document.createTextNode(value as string);
  paintCommands.push([paintBy, [element, text]]);
  return text;
}

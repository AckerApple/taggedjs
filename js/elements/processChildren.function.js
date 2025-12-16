import { castTextValue } from '../castTextValue.function.js';
import { getNewContext } from '../render/addOneContext.function.js';
import { paintCommands } from '../render/paint.function.js';
import { removeContextInCycle, setContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { processElementVar } from './processElementVar.function.js';
import { processElementVarFunction } from './processElementVarFunction.function.js';
export function processChildren(innerHTML, parentContext, ownerSupport, element, // appendTo
paintBy) {
    innerHTML.forEach(item => {
        const type = typeof item;
        switch (type) {
            case 'string':
            case 'boolean':
            case 'number':
                return handleSimpleInnerValue(item, element, paintBy);
            case 'function': {
                if (item.tagJsType === 'element') {
                    break; // skip
                }
                const result = processElementVarFunction(item, element, parentContext, ownerSupport, paintBy);
                return result;
            }
        }
        if (item === null || item === undefined) {
            return handleSimpleInnerValue(item, element, paintBy);
        }
        if (item.tagJsType === 'element') {
            const newElement = processElementVar(item, parentContext, ownerSupport, parentContext.contexts);
            paintCommands.push([paintBy, [element, newElement]]);
            const htmlDomMeta = parentContext.htmlDomMeta;
            htmlDomMeta.push({
                nn: newElement.tagName,
                domElement: newElement,
                // at: newElement.attributes,
                at: [],
            });
            return;
        }
        return processNonElement(item, parentContext, element, ownerSupport, paintBy);
    });
}
/** used when a child is not another element and requires init processing */
export function processNonElement(item, parentContext, element, ownerSupport, paintBy) {
    const newContext = getNewContext(item, [], // addedContexts
    true, parentContext);
    const contexts = parentContext.contexts;
    contexts.push(newContext);
    newContext.element = element;
    newContext.placeholder = document.createTextNode('');
    paintCommands.push([paintBy, [element, newContext.placeholder]]);
    setContextInCycle(newContext);
    newContext.tagJsVar.processInit(item, newContext, // context, // newContext,
    ownerSupport, newContext.placeholder);
    removeContextInCycle();
    return newContext;
}
export function handleSimpleInnerValue(value, element, paintBy) {
    const castedValue = castTextValue(value);
    const text = document.createTextNode(castedValue);
    paintCommands.push([paintBy, [element, text]]);
    return text;
}
//# sourceMappingURL=processChildren.function.js.map
import { Subject } from '..';
import { paintAppends, paintAppend } from '../render/paint.function';
import { valueToTagJsVar } from '../tagJsVars';
import { processElementVar } from './processElementVar.function';
import { processElementVarFunction } from './processElementVarFunction.function';
export function processChildren(innerHTML, context, ownerSupport, addedContexts, element) {
    innerHTML.forEach(item => {
        if (item.tagJsType === 'element') {
            const newElement = processElementVar(item, context, ownerSupport, addedContexts);
            paintAppends.push([paintAppend, [element, newElement]]);
            return;
        }
        const type = typeof item;
        switch (type) {
            case 'string':
            case 'number':
                return handleSimpleInnerValue(item, element);
            case 'function':
                return processElementVarFunction(item, element, context, ownerSupport, addedContexts);
        }
        return processNonElement(item, context, addedContexts, element, ownerSupport);
    });
}
export function processNonElement(item, context, addedContexts, element, ownerSupport) {
    const tagJsVar = valueToTagJsVar(item);
    const newContext = {
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
    paintAppends.push([paintAppend, [element, newContext.placeholder]]);
    tagJsVar.processInit(item, newContext, // context, // newContext,
    ownerSupport, newContext.placeholder);
    return newContext;
}
export function handleSimpleInnerValue(value, element) {
    const text = document.createTextNode(value);
    paintAppends.push([paintAppend, [element, text]]);
    return text;
}
//# sourceMappingURL=processChildren.js.map
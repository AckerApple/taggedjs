import { Subject } from '../index.js';
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function';
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function';
import { blankHandler } from '../render/dom/blankHandler.function';
import { processAttributeArray } from '../render/dom/processAttributeArray.function';
import { paintAppends, paintAppend } from '../render/paint.function';
import { handleSimpleInnerValue, processNonElement } from './designElement.function';
export function processElementVar(value, context, ownerSupport, addedContexts) {
    const element = document.createElement(value.tagName);
    context.element = element;
    processAttributeArray(value.attributes, [], // values,
    element, ownerSupport, context, // context.parentContext,
    addedContexts);
    value.innerHTML.forEach(item => {
        const type = typeof item;
        switch (type) {
            case 'string':
            case 'number':
                return handleSimpleInnerValue(item, element);
            case 'function': {
                if (item.tagJsType === 'element') {
                    const newElement = processElementVar(item, context, ownerSupport, addedContexts);
                    paintAppends.push([paintAppend, [element, newElement]]);
                    return;
                }
                const subContexts = [];
                const subContext = {
                    parentContext: context,
                    contexts: subContexts,
                    tagJsVar: {
                        tagJsType: 'dynamic-text',
                        hasValueChanged: () => 0,
                        processInit: blankHandler,
                        processInitAttribute: blankHandler,
                        destroy: (_c, ownerSupport) => {
                            subContexts.forEach(subSub => subSub.tagJsVar.destroy(subSub, ownerSupport));
                        },
                        processUpdate: (value, contextItem, ownerSupport, values) => {
                            const newValue = item(newContext);
                            const result = newContext.tagJsVar.processUpdate(newValue, newContext, ownerSupport, values);
                            newContext.value = newValue;
                            return result;
                        }
                    },
                    // TODO: Not needed
                    valueIndex: -1,
                    withinOwnerElement: true,
                    destroy$: new Subject(),
                };
                addedContexts.push(subContext);
                const newContext = processNonElement(item(), context, subContext.contexts, // addedContexts,
                element, ownerSupport);
                return newContext;
                // const textElement = handleSimpleInnerValue(item(), element)
                // return textElement
            }
        }
        if (item.tagJsType === 'element') {
            const newElement = processElementVar(item, context, ownerSupport, addedContexts);
            paintAppends.push([paintAppend, [element, newElement]]);
            return;
        }
        processNonElement(item, context, addedContexts, element, ownerSupport);
    });
    value.listeners.forEach(listener => {
        const wrap = (...args) => {
            const result = listener[1](...args);
            const stateSupport = getSupportWithState(ownerSupport);
            console.log('listener hit', stateSupport);
            // renderTagUpdateArray([stateSupport]);
            return result;
        };
        addSupportEventListener(ownerSupport.appSupport, listener[0], // eventName
        element, wrap);
    });
    return element;
}
//# sourceMappingURL=processElementVar.js.map
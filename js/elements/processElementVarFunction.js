import { Subject } from '../index.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { processNonElement } from './designElement.function.js';
export function processElementVarFunction(item, context, ownerSupport, element) {
    const subContexts = [];
    let aSubContext; // populated in the init
    const subContext = {
        updateCount: 0,
        parentContext: context,
        contexts: subContexts,
        value: item,
        tagJsVar: {
            tagJsType: 'dynamic-text',
            hasValueChanged: () => 0,
            processInit: () => {
                const trueValue = item();
                subContext.value = item;
                // this is the process init
                aSubContext = processNonElement(trueValue, context, element, ownerSupport);
                aSubContext.tagJsVar.processInit(trueValue, aSubContext, ownerSupport, element);
                subContexts.push(aSubContext);
                console.log('process init element var function good!');
            },
            /** not used here */
            processInitAttribute: blankHandler,
            destroy: (_c, ownerSupport) => {
                ++subContext.updateCount;
                subContexts.forEach(subSub => subSub.tagJsVar.destroy(subSub, ownerSupport));
            },
            processUpdate: (value, contextItem, ownerSupport, values) => {
                ++subContext.updateCount;
                console.log('value', {
                    value,
                    item,
                    aSubContext,
                    equal: value === item
                });
                const newValue = item(aSubContext);
                // const newValue = value(newContext)
                const result = aSubContext.tagJsVar.processUpdate(newValue, aSubContext, ownerSupport, values);
                aSubContext.value = newValue;
                contextItem.value = value; // the function that was given
                return result;
            }
        },
        // TODO: Not needed
        valueIndex: -1,
        withinOwnerElement: true,
        destroy$: new Subject(),
    };
    return subContext;
}
//# sourceMappingURL=processElementVarFunction.js.map
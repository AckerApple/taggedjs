import { isFunction, Subject } from '../index.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { removeContextInCycle, setContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { processNonElement } from './processChildren.function.js';
export function processElementVarFunction(item, element, parentContext, ownerSupport, paintBy) {
    const subContexts = [];
    const subContext = {
        updateCount: 0,
        parentContext,
        contexts: subContexts,
        element: element,
        value: item,
        htmlDomMeta: [],
        tagJsVar: {
            tagJsType: 'dynamic-text',
            hasValueChanged: () => 0,
            processInit: blankHandler,
            processInitAttribute: blankHandler,
            destroy: (_c, ownerSupport) => {
                ++subContext.updateCount;
                subContexts.forEach(subSub => subSub.tagJsVar.destroy(subSub, ownerSupport));
            },
            processUpdate: (value, contextItem, ownerSupport, values) => {
                ++subContext.updateCount;
                setContextInCycle(aSubContext);
                let newValue = value(aSubContext);
                const underFunction = subContext.underFunction;
                delete subContext.underFunction;
                if (newValue instanceof Function && !newValue.tagJsType) {
                    if (underFunction && newValue.toString() === underFunction.toString()) {
                        newValue = aSubContext.value;
                    }
                    else {
                        subContext.underFunction = newValue;
                        newValue = newValue();
                    }
                }
                const result = aSubContext.tagJsVar.processUpdate(newValue, aSubContext, ownerSupport, values);
                aSubContext.value = newValue;
                contextItem.value = value;
                removeContextInCycle();
                return result;
            }
        },
        // TODO: Not needed
        valueIndex: -1,
        withinOwnerElement: true,
        destroy$: new Subject(),
        render$: new Subject(),
    };
    // addedContexts.push(subContext)
    setContextInCycle(subContext);
    let trueValue = item();
    const isAgainFunc = isFunction(trueValue) && !trueValue.tagJsType;
    if (isAgainFunc) {
        ;
        subContext.underFunction = trueValue;
        trueValue = trueValue(); // function returns function
    }
    const aSubContext = processNonElement(trueValue, subContext, // parentContext,
    element, ownerSupport, paintBy);
    const contexts = parentContext.contexts;
    contexts.push(subContext);
    removeContextInCycle();
    return aSubContext;
}
//# sourceMappingURL=processElementVarFunction.function.js.map
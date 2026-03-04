// taggedjs-no-compile
import { setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { BasicTypes, empty } from '../../tag/ValueTypes.enum.js';
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js';
import { isNoDisplayValue } from './isNoDisplayValue.function.js';
import { processAttribute } from './processAttribute.function.js';
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js';
import { processTagJsTagAttribute } from './processTagJsAttribute.function.js';
import { valueToTagJsVar } from '../../TagJsTags/valueToTagJsVar.function.js';
// single/stand alone attributes
export function processStandAloneAttribute(values, attrValue, element, ownerSupport, howToSet, contexts, parentContext, contextItem) {
    if (isNoDisplayValue(attrValue)) {
        return;
    }
    const type = typeof attrValue;
    // process an object of attributes ${{class:'something, checked:true}}
    if (type === BasicTypes.object) {
        for (const name in attrValue) {
            processOneStandAlone(name, element, attrValue, values, ownerSupport, contexts, parentContext, contexts);
        }
        return contexts;
    }
    if (type === 'function') {
        const relay = createMiddleFunctionTagJsVar(contextItem);
        contextItem.tagJsVar = relay;
        setContextInCycle(contextItem);
        const result = attrValue(contextItem);
        const attrCallResult = valueToTagJsVar(result);
        removeContextInCycle();
        if (attrCallResult?.tagJsType) {
            contextItem.state = {
                newer: {
                    state: [],
                    states: [],
                },
            };
            const newContext = processTagJsTagAttribute(attrCallResult, contexts, // contexts,
            parentContext, attrCallResult, -1, // varIndex,
            ownerSupport, 'attr', // attrName,
            element, true);
            newContext.tagJsVar = attrCallResult;
            contextItem.subContext = newContext;
            return contexts;
        }
        processOneStandAlone('attr', element, attrValue, values || [], ownerSupport, contexts, parentContext, contexts);
        return contexts;
    }
    // regular attributes
    if (attrValue.length === 0) {
        return; // ignore, do not set at this time
    }
    howToSet(element, attrValue, empty);
}
function processOneStandAlone(name, element, attrValue, values, ownerSupport, contexts, parentContext, newContexts) {
    const isSpecial = isSpecialAttr(name, element.tagName); // only object variables are evaluated for is special attr
    const value = attrValue[name];
    const howToSet = setNonFunctionInputValue;
    const subContext = processAttribute(name, value, values, element, ownerSupport, howToSet, contexts, parentContext, isSpecial);
    if (subContext !== undefined) {
        if (Array.isArray(subContext)) {
            newContexts.push(...subContext);
        }
        else {
            newContexts.push(subContext);
        }
    }
}
/** used for an output function variable */
function createMiddleFunctionTagJsVar(context) {
    const myTagJsVar = {
        tagJsType: 'relay',
        component: false,
        hasValueChanged: (value, context, ownerSupport) => {
            return context.subContext.tagJsVar.hasValueChanged(value, context.subContext, ownerSupport);
        },
        processInitAttribute: (name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
        element, tagJsVar, contextItem, ownerSupport, // may not be needed?
        howToSet) => {
            return contextItem.subContext.tagJsVar.processInitAttribute(name, value, element, tagJsVar, contextItem.subContext, // contextItem,
            ownerSupport, howToSet);
        },
        destroy: (contextItem, ownerSupport) => {
            return contextItem.subContext.tagJsVar.destroy(contextItem.subContext, ownerSupport);
        },
        processUpdate: (value, contextItem, ownerSupport, values) => {
            const result = value(contextItem.subContext);
            return contextItem.subContext.tagJsVar.processUpdate(result, contextItem.subContext, ownerSupport, values);
        },
        processInit: (value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
        contextItem, ownerSupport, insertBefore, appendTo) => {
            return contextItem.subContext.tagJsVar.processInit(value, contextItem.subContext, ownerSupport, insertBefore, appendTo);
        },
        matchesInjection: (inject) => {
            return context.subContext.tagJsVar.matchesInjection(inject, context.subContext);
        },
    };
    return myTagJsVar;
}
//# sourceMappingURL=processStandAloneAttribute.function.js.map
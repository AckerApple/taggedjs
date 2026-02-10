import { blankHandler } from '../../render/dom/blankHandler.function.js';
import { Subject, valueToTagJsVar } from '../../index.js';
/** Used for bolts like div.style(() => {{backgroundColor:}}) */
export function processFunctionAttr(value, parentContext, // parent context
attrName, element, howToSet) {
    const innerValue = value();
    const TagJsTagOverride = {
        component: false,
        tagJsType: 'dynamic-attr',
        matchesInjection: (inject) => {
            const TagJsTag = subContext.tagJsVar;
            if (TagJsTag.matchesInjection) {
                const rtn = TagJsTag.matchesInjection(inject, subContext);
                return rtn;
            }
        },
        hasValueChanged: (_value, _contextItem, ownerSupport) => {
            const newValue = value();
            return subContext.tagJsVar.hasValueChanged(newValue, subContext, ownerSupport);
        },
        processInit: blankHandler,
        processInitAttribute: blankHandler,
        destroy: (_contextItem, ownerSupport) => {
            subContext.tagJsVar.destroy(subContext, ownerSupport);
        },
        processUpdate: (value, contextItem, ownerSupport, values) => {
            ++contextItem.updateCount;
            const newValue = value();
            // const oldValue = subContext.value
            // const newTagJsTag = valueToTagJsVar(newValue)
            subContext.tagJsVar.processUpdate(newValue, // newTagJsTag as any,
            subContext, ownerSupport, values);
            subContext.value = newValue;
        }
    };
    const subContext = {
        updateCount: 0,
        isAttr: true,
        target: element,
        parentContext,
        value: innerValue, // used for new value comparing
        tagJsVar: valueToTagJsVar(innerValue),
        // TODO: Not needed
        valueIndex: -1,
        withinOwnerElement: true,
        destroy$: new Subject(),
        render$: new Subject(),
        // paintCommands: [],
    };
    const contextItem = {
        updateCount: 0,
        isAttr: true,
        contexts: [subContext],
        target: element,
        parentContext,
        value,
        tagJsVar: TagJsTagOverride,
        // TODO: Not needed
        valueIndex: -1,
        withinOwnerElement: true,
        destroy$: new Subject(),
        render$: new Subject(),
        // paintCommands: [],
    };
    subContext.tagJsVar.processInitAttribute(attrName, innerValue, element, subContext.tagJsVar, subContext, {}, howToSet);
    return contextItem;
}
//# sourceMappingURL=processFunctionAttr.function.js.map
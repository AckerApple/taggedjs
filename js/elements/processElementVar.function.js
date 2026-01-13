import { isPromise } from '../index.js';
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js';
import { afterTagCallback } from '../interpolations/attributes/bindSubjectCallback.function.js';
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js';
import { isSpecialAttr } from '../interpolations/attributes/isSpecialAttribute.function.js';
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js';
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js';
import { paint, paintAppend, painting } from '../render/paint.function.js';
import { processChildren } from './processChildren.function.js';
/** The first and recursive processor for elements */
export function processElementVar(value, context, ownerSupport, _addedContexts) {
    const element = document.createElement(value.tagName);
    context.target = element;
    // mark special attributes
    value.attributes.forEach(x => {
        const name = x[0];
        if (typeof (name) !== 'string') {
            return;
        }
        x[2] = isSpecialAttr(name);
    });
    processAttributeArray(value.attributes, [], // values,
    element, ownerSupport, context);
    /*
    value.listeners.forEach((listener, index) =>
      registerListener(value, index, ownerSupport, listener, element)
    )*/
    processChildren(value.innerHTML, context, // parentContext
    ownerSupport, element, paintAppend);
    value.listeners.forEach((listener, index) => registerListener(value, index, ownerSupport, listener, element));
    return element;
}
function registerListener(value, index, ownerSupport, listener, element) {
    const wrap = (...args) => {
        const listenScope = value.listeners[index];
        const toCall = listenScope[1];
        const stateSupport = getSupportWithState(ownerSupport);
        const updateCount = stateSupport.context.updateCount;
        stateSupport.context.locked = 1;
        ++painting.locks;
        const result = toCall(...args);
        --painting.locks;
        delete stateSupport.context.locked;
        const needsRender = updateCount === stateSupport.context.updateCount;
        if (needsRender) {
            return afterTagCallback(result, stateSupport);
        }
        else {
            paint();
        }
        if (isPromise(result)) {
            return result.then(() => {
                const newest = stateSupport.context.state.newest;
                renderTagUpdateArray([newest]);
                return 'promise-no-data-ever';
            });
        }
        return 'no-data-ever';
    };
    addSupportEventListener(ownerSupport.appSupport, listener[0], // eventName
    element, wrap);
}
//# sourceMappingURL=processElementVar.function.js.map
import { paint, paintBefore, painting } from '../render/paint.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { elementFunctions } from './elementFunctions.js';
import { destroyDesignByContexts } from './destroyDesignElement.function.js';
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js';
import { processChildren } from './processChildren.function.js';
import { getPushKid } from './designElement.function.js';
import { destroyHtmlDomMeta } from '../tag/destroyHtmlDomMeta.function.js';
/** used when you do NOT have a root element returned for your function */
export const noElement = noElementMaker();
export function noElementMaker() {
    const element = {
        tagJsType: 'element',
        processInitAttribute: blankHandler, // its never an attribute
        processInit: processNoElmInit,
        destroy: destroyNoElement,
        processUpdate: processDesignElementUpdate,
        hasValueChanged: checkTagElementValueChange,
        tagName: 'no-element',
        innerHTML: [],
        attributes: [],
        listeners: [],
        allListeners: [],
        elementFunctions,
    };
    const pushKid = getPushKid(element, elementFunctions);
    pushKid.tagName = 'no-element';
    return pushKid;
}
function processNoElmInit(value, context, ownerSupport, insertBefore) {
    context.contexts = context.contexts || []; // added contexts
    context.htmlDomMeta = [];
    processChildren(value.innerHTML, context, ownerSupport, insertBefore, paintBefore);
}
function destroyNoElement(context, ownerSupport) {
    ++context.updateCount;
    const contexts = context.contexts;
    const promises = [];
    if (contexts.length) {
        destroyDesignByContexts(contexts, ownerSupport, promises);
        contexts.length = 0;
        if (promises.length) {
            const htmlDomMeta = context.htmlDomMeta;
            return Promise.all(promises).then(() => {
                ++painting.locks;
                destroyHtmlDomMeta(htmlDomMeta);
                --painting.locks;
                paint();
            });
        }
    }
}
//# sourceMappingURL=noElement.function.js.map
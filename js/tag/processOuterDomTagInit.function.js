// taggedjs-no-compile
import { ValueTypes } from './ValueTypes.enum.js';
import { getSupportInCycle } from './cycles/getSupportInCycle.function.js';
import { processDomTagInit } from './update/processDomTagInit.function.js';
import { checkTagValueChangeAndUpdate } from '../index.js';
import { forceUpdateExistingValue } from './update/forceUpdateExistingValue.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js';
/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
export function processOuterDomTagInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
insertBefore, appendTo) {
    const outerHTML = value.outerHTML;
    processDomTagInit(outerHTML, contextItem, // could be tag via result.tag
    ownerSupport, // owningSupport
    insertBefore, appendTo);
    // contextItem.handler = function outDomTagHanlder(
    const tagJsVar = contextItem.tagJsVar;
    tagJsVar.processUpdate = function outDomTagHanlder(value, contextItem2, newSupport) {
        forceUpdateExistingValue(contextItem2, value?.outerHTML || value, newSupport);
    };
    // TODO: Not best idea to swap out the original values changeChecker
    value.hasValueChanged = checkOuterTagValueChange;
}
function checkOuterTagValueChange(newValue, contextItem) {
    return checkTagValueChangeAndUpdate(newValue, // (newValue as Tag)?.outerHTML || newValue,
    contextItem);
}
/** tag(html``) When runtime is in browser */
export function getStringTag(strings, values) {
    const tag = {
        values,
        ownerSupport: getSupportInCycle(),
        tagJsType: ValueTypes.tag,
        processInitAttribute: blankHandler,
        processInit: processDomTagInit,
        processUpdate: tagValueUpdateHandler,
        hasValueChanged: checkTagValueChangeAndUpdate,
        destroy: destroySupportByContextItem,
        strings,
        /** Used within an array.map() that returns html aka array.map(x => html``.key(x)) */
        key(arrayValue) {
            return keyTag(arrayValue, tag);
        },
        /** aka setInnerHTML */
        setHTML: function setHTML(innerHTML) {
            innerHTML.outerHTML = tag;
            tag._innerHTML = innerHTML;
            innerHTML.oldProcessInit = innerHTML.processInit;
            // TODO: Not best idea to override the init
            innerHTML.processInit = processOuterDomTagInit;
            return tag;
        },
        /** Used within the outerHTML tag to signify that it can use innerHTML */
        acceptInnerHTML: function acceptInnerHTML(useTagVar) {
            // TODO: datatype
            useTagVar.owner = tag;
            return tag;
        },
        html: function html(strings, values) {
            tag.children = { strings, values };
            return tag;
        }
    };
    Object.defineProperty(tag, 'innerHTML', {
        set(innerHTML) {
            return tag.setHTML(innerHTML);
        },
    });
    return tag;
}
export function keyTag(arrayValue, tag) {
    keyTag(arrayValue, tag);
    tag.arrayValue = arrayValue;
    return tag;
}
//# sourceMappingURL=processOuterDomTagInit.function.js.map
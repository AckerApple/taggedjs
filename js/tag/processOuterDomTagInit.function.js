// taggedjs-no-compile
import { ValueTypes } from './ValueTypes.enum.js';
import { getSupportInCycle } from './getSupportInCycle.function.js';
import { processDomTagInit } from './update/processDomTagInit.function.js';
import { checkTagValueChange, destroySupportByContextItem } from '../index.js';
import { forceUpdateExistingValue } from './update/forceUpdateExistingValue.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
export function processOuterDomTagInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, appendTo, insertBefore) {
    const outerHTML = value.outerHTML;
    processDomTagInit(outerHTML, contextItem, // could be tag via result.tag
    ownerSupport, // owningSupport
    counts, appendTo, insertBefore);
    // contextItem.handler = function outDomTagHanlder(
    const tagJsVar = contextItem.tagJsVar;
    tagJsVar.processUpdate = function outDomTagHanlder(value, newSupport, contextItem2, _values, counts) {
        forceUpdateExistingValue(contextItem2, value?.outerHTML || value, newSupport, counts);
    };
    // TODO: Not best idea to swap out the original values changeChecker
    value.checkValueChange = checkOuterTagValueChange;
}
function checkOuterTagValueChange(newValue, contextItem, counts) {
    return checkTagValueChange(newValue, // (newValue as Tag)?.outerHTML || newValue,
    contextItem, // subContext.contextItem as any,
    counts);
}
/** When runtime is in browser */
export function getStringTag(strings, values) {
    const tag = {
        values,
        ownerSupport: getSupportInCycle(),
        tagJsType: ValueTypes.tag,
        processInit: processDomTagInit,
        processUpdate: tagValueUpdateHandler,
        checkValueChange: checkTagValueChange,
        delete: destroySupportByContextItem,
        strings,
        /** Used within an array.map() that returns html aka array.map(x => html``.key(x)) */
        key(arrayValue) {
            tag.arrayValue = arrayValue;
            return tag;
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
//# sourceMappingURL=processOuterDomTagInit.function.js.map
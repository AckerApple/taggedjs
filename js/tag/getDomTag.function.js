// taggedjs-no-compile
import { ValueTypes } from './ValueTypes.enum.js';
import { getSupportInCycle } from './getSupportInCycle.function.js';
import { processDomTagInit } from './update/processDomTagInit.function.js';
import { checkTagValueChange, destroySupportByContextItem } from '../index.js';
import { forceUpdateExistingValue } from './update/forceUpdateExistingValue.function.js';
/** When compiled to then run in browser */
export function getDomTag(dom, values) {
    const tag = {
        values,
        ownerSupport: getSupportInCycle(),
        dom,
        tagJsType: ValueTypes.dom,
        processInit: processDomTagInit,
        checkValueChange: checkTagValueChange,
        delete: destroySupportByContextItem,
        key: function keyFun(arrayValue) {
            tag.arrayValue = arrayValue;
            return tag;
        },
        /** Used within the outerHTML tag to signify that it expects innerHTML */
        setInnerHTML: function setInnerHTML(innerHTML) {
            innerHTML.owner = tag;
            return tag;
        },
        html: {
            dom: function dom(dom, // ObjectChildren
            values) {
                tag.children = { dom: dom, values };
                return tag;
            }
        }
    };
    Object.defineProperty(tag, 'innerHTML', {
        set(innerHTML) {
            innerHTML.outerHTML = tag;
            tag._innerHTML = innerHTML;
            innerHTML.oldProcessInit = innerHTML.processInit;
            // TODO: Not best idea to override the init
            innerHTML.processInit = processOuterDomTagInit;
        },
    });
    return tag;
}
/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
function processOuterDomTagInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, appendTo, insertBefore) {
    const outerHTML = value.outerHTML;
    processDomTagInit(outerHTML, contextItem, // could be tag via result.tag
    ownerSupport, // owningSupport
    counts, appendTo, insertBefore);
    contextItem.handler = (value, newSupport, contextItem, _values, counts) => {
        forceUpdateExistingValue(contextItem, value?.outerHTML || value, newSupport, counts);
    };
    // TODO: Not best idea to swap out the original values changeChecker
    value.checkValueChange = function outerCheckValueChange(newValue, contextItem, counts) {
        return checkOuterTagValueChange(newValue, contextItem, counts);
    };
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
        checkValueChange: checkTagValueChange,
        delete: destroySupportByContextItem,
        strings,
        /** Used within an array.map() that returns html aka array.map(x => html``.key(x)) */
        key(arrayValue) {
            tag.arrayValue = arrayValue;
            return tag;
        },
        /** Used within the outerHTML tag to signify that it expects innerHTML */
        setInnerHTML: function setInnerHTML(innerHTML) {
            innerHTML.owner = tag;
            return tag;
        },
        html: function html(strings, values) {
            tag.children = { strings, values };
            return tag;
        }
    };
    Object.defineProperty(tag, 'innerHTML', {
        set(innerHTML) {
            innerHTML.outerHTML = tag;
            innerHTML.processInit = processOuterDomTagInit;
        },
    });
    return tag;
}
//# sourceMappingURL=getDomTag.function.js.map
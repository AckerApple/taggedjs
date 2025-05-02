// taggedjs-no-compile
import { ValueTypes } from './ValueTypes.enum.js';
import { getSupportInCycle } from './getSupportInCycle.function.js';
import { processDomTagInit } from './update/processDomTagInit.function.js';
export const variablePrefix = ':tagvar';
export const variableSuffix = ':';
export function getStringTag(strings, values) {
    const tag = {
        values,
        ownerSupport: getSupportInCycle(),
        tagJsType: ValueTypes.tag,
        processInit: processDomTagInit,
        strings,
        /** Used within an array.map() that returns html aka array.map(x => html``.key(x)) */
        key(arrayValue) {
            tag.arrayValue = arrayValue;
            return tag;
        },
        html: function html(strings, values) {
            tag.children = { strings, values };
            return tag;
        }
    };
    return tag;
}
export function getDomTag(dom, values) {
    const tag = {
        values,
        ownerSupport: getSupportInCycle(),
        dom,
        tagJsType: ValueTypes.dom,
        processInit: processDomTagInit,
        key: function keyFun(arrayValue) {
            tag.arrayValue = arrayValue;
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
    return tag;
}
//# sourceMappingURL=getDomTag.function.js.map
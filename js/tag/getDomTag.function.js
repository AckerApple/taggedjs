// taggedjs-no-compile
import { ValueTypes } from './ValueTypes.enum.js';
import { getSupportInCycle } from './cycles/getSupportInCycle.function.js';
import { processDomTagInit } from './update/processDomTagInit.function.js';
import { checkTagValueChangeAndUpdate } from '../index.js';
import { processOuterDomTagInit } from './processOuterDomTagInit.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js';
/** When compiled to then run in browser */
export function getDomTag(dom, values) {
    const tag = {
        values,
        ownerSupport: getSupportInCycle(),
        dom,
        tagJsType: ValueTypes.dom,
        processInitAttribute: blankHandler,
        processInit: processDomTagInit,
        processUpdate: tagValueUpdateHandler,
        hasValueChanged: checkTagValueChangeAndUpdate,
        destroy: destroySupportByContextItem,
        key: function keyFun(arrayValue) {
            tag.arrayValue = arrayValue;
            return tag;
        },
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
            return tag.setHTML(innerHTML);
        },
    });
    return tag;
}
//# sourceMappingURL=getDomTag.function.js.map
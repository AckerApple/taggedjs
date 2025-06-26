import { attachDomElements } from './dom/attachDomElements.function.js';
import { getDomMeta } from '../tag/domMetaCollector.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { painting } from './paint.function.js';
import { valueToTagJsVar } from '../tagJsVars/valueToTagJsVar.function.js';
/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(support, counts, appendTo, insertBefore) {
    const subject = support.context;
    const global = subject.global;
    global.oldest = support;
    global.newest = support;
    ++painting.locks;
    const result = attachHtmlDomMeta(support, counts, appendTo, insertBefore);
    global.htmlDomMeta = result.dom;
    --painting.locks;
    // return fragment
    return result;
}
function attachHtmlDomMeta(support, counts, appendTo, insertBefore) {
    const domMeta = loadDomMeta(support);
    const thisTag = support.templater.tag;
    const values = thisTag.values;
    const contexts = [];
    const global = support.context.global;
    global.contexts = contexts;
    const result = attachDomElements(domMeta, values, support, counts, contexts, 0, appendTo, insertBefore);
    return result;
}
function loadDomMeta(support) {
    const templater = support.templater;
    const thisTag = templater.tag;
    if (thisTag.tagJsType === ValueTypes.dom) {
        return thisTag.dom;
    }
    const strings = thisTag.strings;
    return getDomMeta(strings, thisTag.values);
}
export function addOneContext(value, context, withinOwnerElement) {
    const contextItem = {
        value,
        tagJsVar: valueToTagJsVar(value),
        withinOwnerElement,
    };
    context.push(contextItem);
    return contextItem;
}
//# sourceMappingURL=buildBeforeElement.function.js.map
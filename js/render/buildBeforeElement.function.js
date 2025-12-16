import { attachDomElements } from './dom/attachDomElements.function.js';
import { getDomMeta } from '../tag/domMetaCollector.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { painting } from './paint.function.js';
/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(support, appendTo, insertBefore) {
    const subject = support.context;
    // TODO this is only needed for components and not basic tags
    subject.state = subject.state || {};
    const stateMeta = subject.state;
    stateMeta.oldest = support;
    stateMeta.newest = support;
    subject.state.older = subject.state.newer;
    ++painting.locks;
    const result = attachHtmlDomMeta(support, support.context, appendTo, insertBefore);
    subject.htmlDomMeta = result.dom;
    --painting.locks;
    // return fragment
    return result;
}
function attachHtmlDomMeta(support, parentContext, appendTo, insertBefore) {
    const domMeta = loadDomMeta(support);
    const thisTag = support.templater.tag;
    const values = thisTag.values;
    const contexts = [];
    const context = support.context;
    parentContext = context;
    context.contexts = contexts;
    const result = attachDomElements(domMeta, values, support, parentContext, 0, // depth
    appendTo, insertBefore);
    return result;
}
/** Extracts variables from support in order to merge strings & values with dom meta into a html array tree */
function loadDomMeta(support) {
    const templater = support.templater;
    const thisTag = templater.tag;
    if (thisTag.tagJsType === ValueTypes.dom) {
        return thisTag.dom;
    }
    const strings = thisTag.strings;
    return getDomMeta(strings, thisTag.values);
}
//# sourceMappingURL=buildBeforeElement.function.js.map
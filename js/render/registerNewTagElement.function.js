import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { appElements, buildBeforeElement } from '../index.js';
import { processReplacementComponent } from '../tag/update/processFirstSubjectComponent.function.js';
/** Only called by renderTagElement */
export function registerTagElement(support, element, global, // TODO: remove
templater, app, placeholder) {
    const context = support.context;
    context.state.oldest = support;
    context.state.newest = support;
    // Copy newer to older when resetting
    context.state.older = context.state.newer;
    // TODO: WORKING HERE to implement higher level tagElement using mock elements
    const tag = support.templater.tag;
    if (!['dom', 'html'].includes(tag.tagJsType)) {
        context.contexts = context.contexts || [];
        const newFragment = document.createDocumentFragment();
        newFragment.appendChild(placeholder);
        processReplacementComponent(support.templater, context, support);
        return newFragment;
    }
    // console.debug('🏷️ Building element into tag...', {element, app, support})
    const result = buildBeforeElement(support, element, undefined);
    let setUse = templater.setUse;
    if (templater.tagJsType !== ValueTypes.stateRender) {
        const wrap = app;
        const original = wrap.original;
        setUse = original.setUse;
        original.isApp = true;
    }
    ;
    element.setUse = setUse;
    element.ValueTypes = ValueTypes;
    appElements.push({ element, support });
    return putDownTagDom(placeholder, result);
}
function putDownTagDom(placeholder, result) {
    const newFragment = document.createDocumentFragment();
    newFragment.appendChild(placeholder);
    for (const domItem of result.dom) {
        putOneDomDown(domItem, newFragment);
    }
    // console.debug('🏷️ Element Tag DOM built ✅')
    return newFragment;
}
function putOneDomDown(dom, newFragment) {
    if (dom.domElement) {
        newFragment.appendChild(dom.domElement);
    }
    if (dom.marker) {
        newFragment.appendChild(dom.marker);
    }
}
//# sourceMappingURL=registerNewTagElement.function.js.map
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { appElements, buildBeforeElement } from '../index.js';
export function registerTagElement(support, element, global, templater, app, placeholder) {
    console.debug('🏷️ Building element into tag...', { element, app, support });
    const result = buildBeforeElement(support, { added: 0, removed: 0 }, element, undefined);
    global.oldest = support;
    global.newest = support;
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
    const newFragment = document.createDocumentFragment();
    newFragment.appendChild(placeholder);
    for (const domItem of result.dom) {
        putOneDomDown(domItem, newFragment);
    }
    console.debug('🏷️ Element Tag DOM built ✅');
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
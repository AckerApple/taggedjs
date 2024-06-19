import { elementInitCheck } from './elementInitCheck.js';
/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export function afterElmBuild(elm, options, context, ownerSupport) {
    if (!elm.getAttribute) {
        return;
    }
    let diff = options.counts.added;
    diff = elementInitCheck(elm, options.counts) - diff;
    const hasFocusFun = elm.focus;
    if (hasFocusFun) {
        if (elm.hasAttribute('autofocus')) {
            elm.focus();
        }
        if (elm.hasAttribute('autoselect')) {
            elm.select();
        }
    }
    const children = elm.children;
    if (children) {
        for (let index = children.length - 1; index >= 0; --index) {
            const child = children[index];
            const subOptions = {
                ...options,
                counts: options.counts,
            };
            afterElmBuild(child, subOptions, context, ownerSupport);
        }
    }
}
//# sourceMappingURL=interpolateTemplate.js.map
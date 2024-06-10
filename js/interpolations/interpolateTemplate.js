import { elementInitCheck } from './elementInitCheck.js';
import { scanTextAreaValue } from './scanTextAreaValue.function.js';
import { subscribeToTemplate } from './subscribeToTemplate.function.js';
export function interpolateTemplate(fragment, insertBefore, // <template end interpolate /> (will be removed)
context, // variable scope of {`__tagvar${index}`:'x'}
ownerSupport, // Tag class
counts) {
    if (!insertBefore.hasAttribute('end')) {
        return; // only care about <template end>
    }
    const variableName = insertBefore.getAttribute('id');
    const subject = context[variableName];
    subject.global.insertBefore = insertBefore;
    // process dynamics later
    /*
    ??? newly removed
    
    const isDynamic = isTagComponent(subject._value) || isTagArray(subject.value)
    if(isDynamic) {
      return {
        variableName,
        ownerSupport,
        subject,
        insertBefore
      }
    }
    */
    subscribeToTemplate(fragment, insertBefore, subject, ownerSupport, counts);
    return;
}
/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export function afterElmBuild(elm, options, context, ownerSupport) {
    if (!elm.getAttribute) {
        return;
    }
    // Elements that alter innerHTML
    const tagName = elm.nodeName; // elm.tagName
    if (tagName === 'TEXTAREA') {
        scanTextAreaValue(elm, context, ownerSupport);
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
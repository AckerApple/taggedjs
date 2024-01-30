import { ValueSubject } from "./ValueSubject.js";
import { redrawTag } from "./redrawTag.function.js";
import { runBeforeRender } from "./tagRunner.js";
export function getSubjectFunction(value, tag) {
    return new ValueSubject(bindSubjectFunction(value, tag));
}
/**
 * @param {*} value
 * @param {Tag} tag
 * @returns
 */
export function bindSubjectFunction(value, tag) {
    function subjectFunction(element, args) {
        const renderCount = tag.tagSupport.renderCount;
        const method = value.bind(element);
        const callbackResult = method(...args);
        if (renderCount !== tag.tagSupport.renderCount) {
            return; // already rendered
        }
        tag.tagSupport.render();
        if (callbackResult instanceof Promise) {
            callbackResult.then(() => {
                tag.tagSupport.render();
            });
        }
        return callbackResult;
    }
    subjectFunction.tagFunction = value;
    return subjectFunction;
}
/**
 *
 * @param {*} templater
 * @param {ExistingValue} existing
 * @param {Tag} ownerTag
 */
export function setValueRedraw(templater, // latest tag function to call for rendering
existing, ownerTag) {
    // redraw does not communicate to parent
    templater.redraw = (force // forces redraw on children
    ) => {
        // Find previous variables
        const existingTag = existing.tag;
        const { remit, retag } = redrawTag(existingTag, templater, ownerTag);
        existing.tagSupport = retag.tagSupport;
        if (!remit) {
            return;
        }
        existing.set(templater);
        if (force) {
            const context = existingTag.tagSupport.memory.context;
            Object.values(context).forEach((item) => {
                if (!item.value?.isTemplater) {
                    return;
                }
                runBeforeRender(item.tag.tagSupport, item.tag);
                item.tag.beforeRedraw();
                item.value.redraw();
            });
        }
        return retag;
    };
}
export function elementDestroyCheck(nextSibling, stagger) {
    const onDestroyDoubleWrap = nextSibling.ondestroy; // nextSibling.getAttribute('onDestroy')
    if (!onDestroyDoubleWrap) {
        return;
    }
    const onDestroyWrap = onDestroyDoubleWrap.tagFunction;
    if (!onDestroyWrap) {
        return;
    }
    const onDestroy = onDestroyWrap.tagFunction;
    if (!onDestroy) {
        return;
    }
    const event = { target: nextSibling, stagger };
    return onDestroy(event);
}
//# sourceMappingURL=Tag.utils.js.map
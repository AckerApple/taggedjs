/** File largely responsible for reacting to element events, such as onclick */
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { renderTagSupport } from '../tag/render/renderTagSupport.function.js';
export function bindSubjectCallback(value, tagSupport) {
    // Is this children? No override needed
    if (value.isChildOverride) {
        return value;
    }
    const subjectFunction = (element, args) => runTagCallback(value, tagSupport, element, args);
    // link back to original. Mostly used for <div oninit ondestroy> animations
    subjectFunction.tagFunction = value;
    return subjectFunction;
}
export function runTagCallback(value, tagSupport, bindTo, args) {
    const myGlobal = tagSupport.global;
    const renderCount = myGlobal.renderCount;
    const method = value.bind(bindTo);
    const callbackResult = method(...args);
    const sameRenderCount = renderCount === myGlobal.renderCount;
    const last = myGlobal.newest;
    const skipRender = !sameRenderCount;
    // already rendered OR tag was deleted before event processing
    if (skipRender) {
        if (callbackResult instanceof Promise) {
            return callbackResult.then(() => {
                return 'promise-no-data-ever'; // tag was deleted during event processing
            });
        }
        return 'no-data-ever'; // already rendered
    }
    // If we are NOT a component than we need to render my owner instead
    if (tagSupport.templater.tagJsType === ValueTypes.templater) {
        const owner = last.ownerTagSupport;
        const newest = owner.global.newest;
        return renderCallbackSupport(newest, callbackResult, owner.global);
    }
    return renderCallbackSupport(last, callbackResult, last.global);
}
function renderCallbackSupport(last, callbackResult, global) {
    if (global.deleted) {
        return 'no-data-ever'; // || last.global.deleted
    }
    const newest = renderTagSupport(last, true);
    global.newest = newest;
    if (callbackResult instanceof Promise) {
        return callbackResult.then(() => {
            if (global.deleted) {
                return 'promise-no-data-ever'; // tag was deleted during event processing
            }
            const newInPromise = renderTagSupport(global.newest, true);
            global.newest = newInPromise;
            return 'promise-no-data-ever';
        });
    }
    return 'no-data-ever';
}
//# sourceMappingURL=bindSubjectCallback.function.js.map
import { tags } from '../tag/tag.utils.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { destroySupport } from './destroySupport.function.js';
import { paint, painting } from './paint.function.js';
import { setUseMemory } from '../index.js';
import { createSupport } from '../tag/createSupport.function.js';
import { runAfterRender } from '../render/afterRender.function.js';
import { executeWrap } from './executeWrap.function.js';
import { registerTagElement } from './registerNewTagElement.function.js';
import { loadNewBaseSupport } from '../tag/loadNewBaseSupport.function.js';
import { reState } from '../state/state.utils.js';
export function renderTagElement(app, global, templater, templater2, element, subject, isAppFunction) {
    const placeholder = document.createTextNode('');
    tags.push((templater.wrapper || { original: templater }));
    const support = runWrapper(templater, placeholder, element, subject, isAppFunction);
    global.isApp = true;
    if (isAppFunction) {
        templater2.tag = support.templater.tag;
    }
    if (!element) {
        throw new Error(`Cannot tagElement, element received is type ${typeof element} and not type Element`);
    }
    // enables hmr destroy so it can control entire app
    ;
    element.destroy = function () {
        const events = global.events;
        for (const eventName in events) {
            const callback = events[eventName];
            element.removeEventListener(eventName, callback);
        }
        global.events = {};
        ++painting.locks;
        const toAwait = destroySupport(support, global); // never return anything here
        --painting.locks;
        paint();
        return toAwait;
    };
    ++painting.locks;
    const newFragment = registerTagElement(support, element, global, templater, app, placeholder);
    --painting.locks;
    paint();
    element.appendChild(newFragment);
    return {
        support,
        tags,
        ValueTypes,
    };
}
export function runWrapper(templater, placeholder, appElement, subject, isAppFunction) {
    subject.placeholder = placeholder;
    const global = subject.global;
    const oldest = global.oldest;
    const isFirstRender = global.newest === oldest;
    const newSupport = createSupport(templater, global.newest, global.newest.appSupport, // ownerSupport.appSupport as AnySupport,
    subject);
    if (!isFirstRender) {
        reState(newSupport, global.newest, // global.oldest, // global.newest,
        setUseMemory.stateConfig, oldest.state);
    }
    if (templater.tagJsType === ValueTypes.stateRender) {
        return executeStateWrap(templater, isAppFunction, newSupport, subject, appElement);
    }
    // Call the apps function for our tag templater
    const wrapper = templater.wrapper;
    const nowSupport = wrapper(newSupport, subject);
    runAfterRender(newSupport);
    return nowSupport;
}
function executeStateWrap(templater, isAppFunction, newSupport, subject, appElement) {
    const result = (templater.wrapper || { original: templater });
    if (!isAppFunction) {
        const newSupport = loadNewBaseSupport(templater, subject, appElement);
        runAfterRender(newSupport);
        return newSupport;
    }
    executeWrap(templater, result, newSupport);
    runAfterRender(newSupport);
    return newSupport;
}
//# sourceMappingURL=renderTagElement.function.js.map
import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js';
import { buildBeforeElement } from './buildBeforeElement.function.js';
import { tags } from './tag.utils.js';
import { getNewGlobal } from './update/getNewGlobal.function.js';
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js';
import { destroySupport } from './destroySupport.function.js';
import { PropWatches } from './index.js';
import { runAfterRender } from './afterRender.function.js';
import { executeWrap } from './executeWrap.function.js';
import { paint, painting } from './paint.function.js';
import { initState, reState } from '../state/state.utils.js';
import { isTagComponent } from '../isInstance.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { checkTagValueChange, destorySupportByContextItem } from './checkTagValueChange.function.js';
import { createSupport } from './createSupport.function.js';
const appElements = [];
/**
 *
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns
 */
export function tagElement(app, element, props) {
    const appElmIndex = appElements.findIndex(appElm => appElm.element === element);
    if (appElmIndex >= 0) {
        const support = appElements[appElmIndex].support;
        destroySupport(support, support.subject.global);
        appElements.splice(appElmIndex, 1);
        // an element already had an app on it
        console.warn('Found and destroyed app element already rendered to element', { element });
    }
    // Create the app which returns [props, runOneTimeFunction]
    let templater = (() => templater2(props));
    templater.propWatch = PropWatches.NONE;
    templater.tagJsType = ValueTypes.stateRender;
    // todo: props should be an array
    templater.props = [props];
    templater.isApp = true;
    // create observable the app lives on
    const subject = getNewSubject(templater, element);
    const global = subject.global;
    initState(global.newest, setUseMemory.stateConfig);
    let templater2 = app(props);
    const isAppFunction = typeof templater2 == BasicTypes.function;
    if (!isAppFunction) {
        if (!isTagComponent(templater2)) {
            templater.tag = templater2;
            templater2 = app;
        }
        else {
            global.newest.propsConfig = {
                latest: [props],
                castProps: [props],
            };
            templater.propWatch = templater2.propWatch;
            templater.tagJsType = templater2.tagJsType;
            templater.wrapper = templater2.wrapper;
            templater = templater2;
        }
    }
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
function registerTagElement(support, element, global, templater, app, placeholder) {
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
    return newFragment;
}
function getNewSubject(templater, appElement) {
    const subject = {
        value: templater,
        checkValueChange: checkTagValueChange,
        delete: destorySupportByContextItem,
        withinOwnerElement: false, // i am the highest owner
        renderCount: 0,
        global: undefined, // gets set below in getNewGlobal()
    };
    const global = getNewGlobal(subject);
    global.events = {};
    loadNewBaseSupport(templater, subject, appElement);
    return subject;
}
function loadNewBaseSupport(templater, subject, appElement) {
    const global = subject.global;
    const newSupport = getBaseSupport(templater, subject);
    upgradeBaseToSupport(templater, newSupport, newSupport);
    newSupport.appElement = appElement;
    global.oldest = global.oldest || newSupport;
    global.newest = newSupport;
    return newSupport;
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
function putOneDomDown(dom, newFragment) {
    if (dom.domElement) {
        newFragment.appendChild(dom.domElement);
    }
    if (dom.marker) {
        newFragment.appendChild(dom.marker);
    }
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
//# sourceMappingURL=tagElement.js.map
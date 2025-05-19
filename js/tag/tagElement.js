import { getNewGlobal } from './update/getNewGlobal.function.js';
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js';
import { destroySupport } from '../render/destroySupport.function.js';
import { PropWatches } from './index.js';
import { initState } from '../state/state.utils.js';
import { isTagComponent } from '../isInstance.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { checkTagValueChange, destorySupportByContextItem } from './checkTagValueChange.function.js';
import { renderTagElement } from '../render/renderTagElement.function.js';
import { loadNewBaseSupport } from './loadNewBaseSupport.function.js';
export const appElements = [];
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
    return renderTagElement(app, global, templater, templater2, element, subject, isAppFunction);
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
//# sourceMappingURL=tagElement.js.map
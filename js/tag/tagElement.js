import { getNewGlobal } from './update/getNewGlobal.function.js';
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js';
import { destroySupport } from '../render/destroySupport.function.js';
import { PropWatches } from './index.js';
import { initState } from '../state/state.utils.js';
import { isTagComponent } from '../isInstance.js';
import { checkTagValueChange, destroySupportByContextItem } from './checkTagValueChange.function.js';
import { renderTagElement } from '../render/renderTagElement.function.js';
import { loadNewBaseSupport } from './loadNewBaseSupport.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
if (typeof (document) === 'object') {
    if (document.taggedJs) {
        console.warn('🏷️🏷️ Multiple versions of taggedjs are loaded. May cause issues.');
    }
    document.taggedJs = true;
}
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
        destroySupport(support, support.context.global);
        appElements.splice(appElmIndex, 1);
        // an element already had an app on it
        console.warn('Found and destroyed app element already rendered to element', { element });
    }
    // Create the app which returns [props, runOneTimeFunction]
    let templater = (() => templater2(props));
    templater.propWatch = PropWatches.NONE;
    templater.tagJsType = ValueTypes.stateRender;
    templater.processUpdate = tagValueUpdateHandler;
    // todo: props should be an array
    templater.props = [props];
    templater.isApp = true;
    // create observable the app lives on
    const subject = getNewSubject(templater, element);
    const global = subject.global;
    initState(global.newest);
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
    const tagJsVar = {
        tagJsType: 'templater',
        checkValueChange: checkTagValueChange,
        delete: destroySupportByContextItem,
        processInit: function appDoNothing() {
            console.debug('do nothing app function');
        },
        processUpdate: tagValueUpdateHandler,
    };
    const subject = {
        value: templater,
        valueIndex: 0,
        valueIndexSetBy: 'getNewSubject',
        withinOwnerElement: false, // i am the highest owner
        renderCount: 0,
        global: undefined, // gets set below in getNewGlobal()
        tagJsVar,
    };
    const global = getNewGlobal(subject);
    // TODO: events are only needed on the base and not every support
    // for click events and such read at a higher level
    global.events = {};
    loadNewBaseSupport(templater, subject, appElement);
    return subject;
}
//# sourceMappingURL=tagElement.js.map
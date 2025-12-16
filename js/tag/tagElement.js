import { getNewGlobal } from './update/getNewGlobal.function.js';
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js';
import { destroySupport } from '../render/destroySupport.function.js';
import { PropWatches } from './index.js';
import { initState } from '../state/state.utils.js';
import { isTagComponent } from '../isInstance.js';
import { checkTagValueChangeAndUpdate } from './checkTagValueChange.function.js';
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js';
import { renderTagElement } from '../render/renderTagElement.function.js';
import { loadNewBaseSupport } from './loadNewBaseSupport.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { setSupportInCycle } from './cycles/getSupportInCycle.function.js';
import { Subject } from '../subject/Subject.class.js';
import { removeContextInCycle } from './cycles/setContextInCycle.function.js';
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
export function tagElement(app, element, // aka appElement
props) {
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
    const newest = subject.state.newest;
    initState(newest.context);
    setSupportInCycle(newest);
    let templater2 = app(props);
    const isAppFunction = typeof templater2 == BasicTypes.function;
    if (!isAppFunction) {
        if (!isTagComponent(templater2)) {
            templater.tag = templater2;
            templater2 = app;
        }
        else {
            subject.state.newest.propsConfig = {
                latest: [props],
                castProps: [props],
            };
            templater.propWatch = templater2.propWatch;
            templater.tagJsType = templater2.tagJsType;
            templater.wrapper = templater2.wrapper;
            templater = templater2;
        }
    }
    const result = renderTagElement(app, global, templater, templater2, element, subject, isAppFunction);
    removeContextInCycle();
    return result;
}
function getNewSubject(templater, appElement) {
    const tagJsVar = {
        tagJsType: 'templater',
        hasValueChanged: checkTagValueChangeAndUpdate,
        destroy: destroySupportByContextItem,
        processInitAttribute: blankHandler,
        processInit: function appDoNothing() {
            console.debug('do nothing app function');
        },
        processUpdate: tagValueUpdateHandler,
    };
    const context = {
        updateCount: 0,
        value: templater,
        valueIndex: 0,
        varCounter: 0,
        destroy$: new Subject(),
        render$: new Subject(),
        withinOwnerElement: false, // i am the highest owner
        renderCount: 0,
        global: undefined, // gets set below in getNewGlobal()
        state: {},
        // parentContext: undefined as any,
        tagJsVar,
    };
    // sets new global on context
    getNewGlobal(context);
    // TODO: events are only needed on the base and not every support
    // for click events and such read at a higher level
    context.events = {};
    loadNewBaseSupport(templater, context, appElement);
    return context;
}
//# sourceMappingURL=tagElement.js.map
import { getSupport } from '../Support.class.js';
import { runAfterRender } from '../tagRunner.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { executeWrap } from '../executeWrap.function.js';
import { initState, reState } from '../../state/state.utils.js';
import { setUseMemory } from '../../state/setUse.function.js';
export function renderTagOnly(newSupport, prevSupport, // causes restate
subject, ownerSupport) {
    const global = subject.global;
    const oldRenderCount = global.renderCount;
    beforeWithRender(newSupport, prevSupport?.state);
    const templater = newSupport.templater;
    let reSupport;
    // NEW TAG CREATED HERE
    if (templater.tagJsType === ValueTypes.stateRender) {
        const result = templater; // .wrapper as any// || {original: templater} as any
        const useSupport = getSupport(templater, ownerSupport, newSupport.appSupport, // ownerSupport.appSupport as Support,
        subject);
        reSupport = executeWrap(templater, result, useSupport);
    }
    else {
        // functions wrapped in tag()
        const wrapper = templater.wrapper;
        // calls the function returned from getTagWrap()
        reSupport = wrapper(newSupport, subject, prevSupport);
    }
    /* AFTER */
    runAfterRender(newSupport, ownerSupport);
    global.newest = reSupport;
    // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
    if (global.renderCount > oldRenderCount + 1) {
        return global.newest;
    }
    return reSupport;
}
function beforeWithRender(support, // new
prevState) {
    if (prevState) {
        const lastState = prevState;
        support.state = lastState;
        reState(support, setUseMemory.stateConfig);
        return;
    }
    // first time render
    initState(support, setUseMemory.stateConfig);
}
//# sourceMappingURL=renderTagOnly.function.js.map
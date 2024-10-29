import { getSupport } from '../Support.class.js';
import { beforeRerender } from './beforeRerender.function.js';
import { executeWrap } from '../executeWrap.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { runAfterRender } from '../afterRender.function.js';
import { initState } from '../../state/state.utils.js';
import { setUseMemory } from '../../state/setUse.function.js';
export function renderTagOnly(newSupport, prevSupport, // causes restate
subject, ownerSupport) {
    const global = subject.global;
    const oldRenderCount = subject.renderCount;
    const prevState = prevSupport?.state;
    const config = setUseMemory.stateConfig;
    if (prevState) {
        config.prevSupport = prevSupport;
        beforeRerender(newSupport, prevState);
    }
    else {
        initState(newSupport, config);
    }
    const templater = newSupport.templater;
    let reSupport;
    // NEW TAG CREATED HERE
    if (templater.tagJsType === ValueTypes.stateRender) {
        const result = templater; // .wrapper as any// || {original: templater} as any
        // TODO: Not sure if useSupport could be replaced by just using "newSupport"
        const useSupport = getSupport(templater, ownerSupport, newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
        subject);
        reSupport = executeWrap(templater, result, useSupport);
        reSupport.states = newSupport.states;
    }
    else {
        // functions wrapped in tag()
        const wrapper = templater.wrapper;
        // calls the function returned from getTagWrap()
        reSupport = wrapper(newSupport, subject, prevSupport);
        reSupport.states = newSupport.states;
    }
    runAfterRender(reSupport, ownerSupport);
    // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
    // TODO: below most likely not needed
    if (subject.renderCount > oldRenderCount + 1) {
        return global.newest;
    }
    return reSupport;
}
//# sourceMappingURL=renderTagOnly.function.js.map
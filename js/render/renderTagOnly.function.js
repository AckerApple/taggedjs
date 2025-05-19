import { executeWrap } from './executeWrap.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { runAfterRender } from './afterRender.function.js';
import { initState, reState } from '../state/state.utils.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { createSupport } from '../tag/createSupport.function.js';
export function renderTagOnly(newSupport, prevSupport, // causes restate
subject, ownerSupport) {
    runBeforeRender(newSupport, prevSupport);
    const templater = newSupport.templater;
    let reSupport;
    // NEW TAG CREATED HERE
    if (templater.tagJsType === ValueTypes.stateRender) {
        const result = templater; // .wrapper as any// || {original: templater} as any
        reSupport = createSupport(templater, ownerSupport, newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
        subject);
        executeWrap(templater, result, reSupport);
    }
    else {
        // functions wrapped in tag()
        const wrapper = templater.wrapper;
        // calls the function returned from getTagWrap()
        reSupport = wrapper(newSupport, subject, prevSupport);
    }
    runAfterRender(reSupport, ownerSupport);
    return reSupport;
}
function runBeforeRender(newSupport, prevSupport) {
    const prevState = prevSupport?.state;
    const config = setUseMemory.stateConfig;
    if (prevState) {
        reState(newSupport, prevSupport, setUseMemory.stateConfig, prevState);
        return;
    }
    initState(newSupport, config);
}
//# sourceMappingURL=renderTagOnly.function.js.map
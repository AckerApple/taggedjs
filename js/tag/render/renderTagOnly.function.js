import { runBeforeRedraw, runBeforeRender } from '../tagRunner.js';
import { setUse } from '../../state/index.js';
import { runAfterRender } from '../tagRunner.js';
export function renderTagOnly(newTagSupport, prevSupport, subject, ownerSupport) {
    const oldRenderCount = newTagSupport.global.renderCount;
    beforeWithRender(newTagSupport, ownerSupport, prevSupport);
    const templater = newTagSupport.templater;
    // NEW TAG CREATED HERE
    const wrapper = templater.wrapper;
    let reSupport = wrapper(newTagSupport, subject);
    /* AFTER */
    runAfterRender(newTagSupport, ownerSupport);
    // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
    if (reSupport.global.renderCount > oldRenderCount + 1) {
        return newTagSupport.global.newest;
    }
    newTagSupport.global.newest = reSupport;
    return reSupport;
}
function beforeWithRender(tagSupport, // new
parentSupport, prevSupport) {
    const lastOwnerSupport = prevSupport?.ownerTagSupport;
    const runtimeOwnerSupport = lastOwnerSupport || parentSupport;
    if (prevSupport) {
        if (prevSupport !== tagSupport) {
            const lastState = prevSupport.memory.state;
            const memory = tagSupport.memory;
            tagSupport.global = prevSupport.global;
            memory.state.length = 0;
            memory.state.push(...lastState);
        }
        runBeforeRedraw(tagSupport, prevSupport);
    }
    else {
        // first time render
        runBeforeRender(tagSupport, runtimeOwnerSupport);
        // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
        const providers = setUse.memory.providerConfig;
        providers.ownerSupport = runtimeOwnerSupport;
    }
}
//# sourceMappingURL=renderTagOnly.function.js.map
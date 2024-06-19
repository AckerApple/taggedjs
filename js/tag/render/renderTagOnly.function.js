import { runBeforeRedraw, runBeforeRender } from '../tagRunner.js';
import { runAfterRender } from '../tagRunner.js';
export function renderTagOnly(newSupport, prevSupport, subject, ownerSupport) {
    const oldRenderCount = subject.global.renderCount;
    beforeWithRender(newSupport, ownerSupport, prevSupport);
    const templater = newSupport.templater;
    // NEW TAG CREATED HERE
    const wrapper = templater.wrapper;
    let reSupport = wrapper(newSupport, subject, prevSupport);
    /* AFTER */
    runAfterRender(newSupport, ownerSupport);
    subject.global.newest = reSupport;
    if (!prevSupport && ownerSupport) {
        ownerSupport.subject.global.childTags.push(reSupport);
    }
    // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
    if (subject.global.renderCount > oldRenderCount + 1) {
        return subject.global.newest;
    }
    return reSupport;
}
function beforeWithRender(support, // new
parentSupport, prevSupport) {
    const lastOwnerSupport = prevSupport?.ownerSupport;
    const runtimeOwnerSupport = lastOwnerSupport || parentSupport;
    if (prevSupport) {
        if (prevSupport !== support) {
            const lastState = prevSupport.state;
            support.subject.global = prevSupport.subject.global;
            support.state.length = 0;
            support.state.push(...lastState);
        }
        return runBeforeRedraw(support, prevSupport);
    }
    // first time render
    return runBeforeRender(support, runtimeOwnerSupport);
}
//# sourceMappingURL=renderTagOnly.function.js.map
import { ValueTypes } from '../tag/index.js';
import { createSupport } from '../tag/createSupport.function.js';
import { executeWrap } from './executeWrap.function.js';
import { runAfterSupportRender } from './runAfterRender.function.js';
export function callTag(newSupport, prevSupport, // causes restate
context, ownerSupport) {
    let reSupport;
    const templater = newSupport.templater;
    // NEW TAG CREATED HERE
    if (templater.tagJsType === ValueTypes.stateRender) {
        const result = templater; // .wrapper as any// || {original: templater} as any
        reSupport = createSupport(templater, context, ownerSupport, newSupport.appSupport);
        executeWrap(templater, result, reSupport);
    }
    else {
        // functions wrapped in tag()
        const wrapper = templater.wrapper;
        // calls the function returned from getTagWrap()
        reSupport = wrapper(newSupport, context, prevSupport);
    }
    runAfterSupportRender(reSupport, ownerSupport);
    reSupport.ownerSupport = newSupport.ownerSupport; // || lastOwnerSupport) as AnySupport
    return reSupport;
}
//# sourceMappingURL=callTag.function.js.map
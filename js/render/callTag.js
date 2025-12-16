import { ValueTypes } from '../tag';
import { createSupport } from '../tag/createSupport.function';
import { executeWrap } from './executeWrap.function';
import { runAfterRender } from './runAfterRender.function';
export function callTag(newSupport, prevSupport, // causes restate
context, ownerSupport) {
    let reSupport;
    const templater = newSupport.templater;
    // NEW TAG CREATED HERE
    if (templater.tagJsType === ValueTypes.stateRender) {
        const result = templater; // .wrapper as any// || {original: templater} as any
        reSupport = createSupport(templater, ownerSupport, newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
        context);
        executeWrap(templater, result, reSupport);
    }
    else {
        // functions wrapped in tag()
        const wrapper = templater.wrapper;
        // calls the function returned from getTagWrap()
        reSupport = wrapper(newSupport, context, prevSupport);
    }
    runAfterRender(reSupport, ownerSupport);
    reSupport.ownerSupport = newSupport.ownerSupport; // || lastOwnerSupport) as AnySupport
    return reSupport;
}
//# sourceMappingURL=callTag.js.map
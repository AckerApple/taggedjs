import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js';
import { getNewGlobal } from './getNewGlobal.function.js';
export function processTagComponentInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, appendTo) {
    getNewGlobal(contextItem);
    if (appendTo) {
        const processResult = processFirstSubjectComponent(value, contextItem, ownerSupport, counts, appendTo);
        return processResult;
    }
    const processResult = processReplacementComponent(value, contextItem, ownerSupport, counts);
    return processResult;
}
//# sourceMappingURL=processTagComponentInit.function.js.map
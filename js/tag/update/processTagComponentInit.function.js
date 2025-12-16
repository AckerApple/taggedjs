import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js';
import { getNewGlobal } from './getNewGlobal.function.js';
export function processTagComponentInit(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
_insertBefore, appendTo) {
    getNewGlobal(contextItem);
    if (appendTo) {
        return processFirstSubjectComponent(value, contextItem, ownerSupport, appendTo);
    }
    return processReplacementComponent(value, contextItem, ownerSupport);
}
//# sourceMappingURL=processTagComponentInit.function.js.map
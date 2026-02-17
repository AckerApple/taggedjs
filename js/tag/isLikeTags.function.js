import { BasicTypes, ValueTypes } from './ValueTypes.enum.js';
export function isLikeTags(newSupport, // new
oldSupport) {
    const isLike = isLikeBaseTags(newSupport, oldSupport);
    // is this perhaps an outerHTML compare?      
    if (!isLike && oldSupport.templater.tag?._innerHTML) {
        if (isLikeBaseTags(newSupport.outerHTML, oldSupport)) {
            return true;
        }
    }
    return isLike;
}
/** @deprecated */
function isLikeBaseTags(newSupport, // new
oldSupport) {
    const templater0 = newSupport.templater;
    const templater1 = oldSupport.templater;
    const newTag = templater0?.tag || newSupport;
    const oldTag = templater1.tag; // || (oldSupport as any)
    if (templater0?.tagJsType === ValueTypes.stateRender) {
        return templater0.dom === templater1.dom;
    }
    if (!oldTag &&
        !newTag.returnValue) {
        return true;
    }
    if (!newTag.returnValue) {
        return false;
    }
    throw new Error(`unknown tagJsType of ${newTag.tagJsType}`);
}
export function isLikeValueSets(values0, values1) {
    const valuesLengthsMatch = values0.length === values1.length;
    if (!valuesLengthsMatch) {
        return false;
    }
    const allVarsMatch = values1.every(function isEveryValueAlike(value, index) {
        const compareTo = values0[index];
        const isFunctions = typeof (value) === BasicTypes.function && typeof (compareTo) === BasicTypes.function;
        if (isFunctions) {
            const stringMatch = value.toString() === compareTo.toString();
            if (stringMatch) {
                return true;
            }
            return false;
        }
        return true;
    });
    if (allVarsMatch) {
        return true;
    }
    return false;
}
//# sourceMappingURL=isLikeTags.function.js.map
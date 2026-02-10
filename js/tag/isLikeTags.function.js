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
    switch (newTag.tagJsType) {
        case ValueTypes.dom: {
            if (oldTag?.tagJsType !== ValueTypes.dom) {
                return false; // newTag is not even same type
            }
            return isLikeDomTags(newTag, oldTag);
        }
        case ValueTypes.tag: {
            const like = isLikeStringTags(newTag, oldTag, newSupport, oldSupport);
            return like;
        }
    }
    throw new Error(`unknown tagJsType of ${newTag.tagJsType}`);
}
// used when compiler was used
export function isLikeDomTags(newTag, oldTag) {
    const domMeta0 = newTag.dom;
    const domMeta1 = oldTag.dom;
    return domMeta0 === domMeta1;
}
// used for no compiling
function isLikeStringTags(newTag, oldTag, newSupport, // new
oldSupport) {
    const strings0 = newTag.strings;
    const strings1 = oldTag.strings;
    if (strings0.length !== strings1.length) {
        return false;
    }
    const everyStringMatched = strings0.every((string, index) => strings1[index].length === string.length // performance, just compare length of strings // TODO: Document this
    );
    if (!everyStringMatched) {
        return false;
    }
    const values0 = newSupport.templater.values || newTag.values;
    const values1 = oldSupport.templater.values || oldTag.values;
    return isLikeValueSets(values0, values1);
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
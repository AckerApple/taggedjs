// taggedjs-no-compile
import { isObject } from '../../isInstance.js';
export function getTagJsTag(attrPart) {
    if (isObject(attrPart) && 'TagJsTag' in attrPart)
        return attrPart.tagJsVar;
    return -1;
    // return (attrPart as TagVarIdNum)?.tagJsVar || -1
}
//# sourceMappingURL=getTagJsTag.function.js.map
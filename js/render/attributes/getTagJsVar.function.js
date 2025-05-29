// taggedjs-no-compile
import { isObject } from '../../isInstance.js';
export function getTagJsVar(attrPart) {
    if (isObject(attrPart) && 'tagJsVar' in attrPart)
        return attrPart.tagJsVar;
    return -1;
    // return (attrPart as TagVarIdNum)?.tagJsVar || -1
}
//# sourceMappingURL=getTagJsVar.function.js.map
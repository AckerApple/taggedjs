import { isArray } from '../isInstance.js';
import { getSimpleTagVar } from './getSimpleTagVar.function.js';
import { getArrayTagVar } from './getArrayTagJsTag.function.js';
export function valueToTagJsVar(value) {
    const tagJsType = value?.tagJsType;
    if (tagJsType) {
        return value;
    }
    return getBasicTagVar(value);
}
function getBasicTagVar(value) {
    if (isArray(value)) {
        return getArrayTagVar(value);
    }
    return getSimpleTagVar(value);
}
//# sourceMappingURL=valueToTagJsVar.function.js.map
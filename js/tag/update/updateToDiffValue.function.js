import { BasicTypes, ValueTypes } from '../index.js';
import { tryUpdateToTag } from './tryUpdateToTag.function.js';
import { isArray } from '../../isInstance.js';
import { processTagArray } from './processTagArray.js';
import { processNowRegularValue } from './processRegularValue.function.js';
import { getArrayTagVar } from '../../tagJsVars/getArrayTagJsVar.function.js';
export function updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed, counts) {
    // is new value a tag?
    const tagJsType = newValue && newValue.tagJsType;
    if (tagJsType) {
        if (tagJsType === ValueTypes.renderOnce) {
            return;
        }
        tryUpdateToTag(contextItem, newValue, ownerSupport, counts);
        return;
    }
    if (isArray(newValue)) {
        processTagArray(contextItem, newValue, ownerSupport, counts);
        contextItem.tagJsVar = getArrayTagVar(newValue);
        return;
    }
    if (typeof (newValue) === BasicTypes.function) {
        contextItem.value = newValue; // do not render functions that are not explicity defined as tag html processing
        return;
    }
    if (ignoreOrDestroyed) {
        processNowRegularValue(newValue, contextItem);
    }
}
//# sourceMappingURL=updateToDiffValue.function.js.map
import { BasicTypes, ValueTypes } from '../index.js';
import { tryUpdateToTag } from './tryUpdateToTag.function.js';
import { isArray } from '../../isInstance.js';
import { processTagArray } from './processTagArray.js';
import { processNowRegularValue } from './processRegularValue.function.js';
export function updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed) {
    // is new value a tag?
    const tagJsType = newValue && newValue.tagJsType;
    if (tagJsType) {
        if (tagJsType === ValueTypes.renderOnce) {
            return;
        }
        tryUpdateToTag(contextItem, newValue, ownerSupport);
        return;
    }
    if (isArray(newValue)) {
        processTagArray(contextItem, newValue, ownerSupport, { added: 0, removed: 0 });
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
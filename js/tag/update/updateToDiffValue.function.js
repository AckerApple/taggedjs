import { BasicTypes, ValueTypes } from '../index.js';
import { tryUpdateToTag } from './tryUpdateToTag.function.js';
import { isArray } from '../../isInstance.js';
import { processTagArray } from './arrays/processTagArray.js';
import { processNowRegularValue } from './processRegularValue.function.js';
import { getArrayTagVar } from '../../TagJsTags/getArrayTagJsTag.function.js';
export function updateToDiffValue(newValue, context, ownerSupport, ignoreOrDestroyed) {
    // is new value a tag?
    const tagJsType = newValue && newValue.tagJsType;
    delete context.deleted;
    if (tagJsType) {
        if (tagJsType === ValueTypes.renderOnce) {
            return;
        }
        tryUpdateToTag(context, newValue, ownerSupport);
        return;
    }
    if (isArray(newValue)) {
        processTagArray(context, newValue, ownerSupport);
        context.oldTagJsVar = context.tagJsVar;
        context.tagJsVar = getArrayTagVar(newValue);
        return;
    }
    if (typeof (newValue) === BasicTypes.function) {
        context.value = newValue; // do not render functions that are not explicity defined as tag html processing
        return;
    }
    if (ignoreOrDestroyed) { // TODO: is this check really needed?
        processNowRegularValue(newValue, context);
    }
}
//# sourceMappingURL=updateToDiffValue.function.js.map
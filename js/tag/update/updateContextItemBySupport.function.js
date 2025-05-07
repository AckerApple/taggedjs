import { BasicTypes } from '../ValueTypes.enum.js';
import { handleStillTag } from './handleStillTag.function.js';
export function updateContextItemBySupport(support, contextItem, value, ownerSupport) {
    if (typeof (value) === BasicTypes.function) {
        return;
    }
    handleStillTag(support, contextItem, value, ownerSupport);
    return;
}
//# sourceMappingURL=updateContextItemBySupport.function.js.map
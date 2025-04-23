import { isSkipPropValue } from '../../alterProp.function.js';
import { BasicTypes } from '../ValueTypes.enum.js';
import { isArray } from '../../isInstance.js';
import { updateExistingObject } from './updateExistingObject.function.js';
import { updateExistingArray } from './updateExistingArray.function.js';
export function syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport, maxDepth, depth) {
    if (priorProp === undefined || priorProp === null) {
        return prop;
    }
    if (typeof (priorProp) === BasicTypes.function) {
        // the prop i am receiving, is already being monitored/controlled by another parent
        if (prop.mem) {
            priorProp.mem = prop.mem;
            return prop;
        }
        priorProp.mem = prop;
        return priorProp;
    }
    // prevent infinite recursion
    if (depth === maxDepth) {
        return prop;
    }
    if (isSkipPropValue(prop)) {
        return prop; // no children to crawl through
    }
    if (isArray(prop)) {
        return updateExistingArray(prop, priorProp, newSupport, ownerSupport, depth);
    }
    return updateExistingObject(prop, priorProp, newSupport, ownerSupport, depth, maxDepth);
}
//# sourceMappingURL=syncPriorPropFunction.function.js.map
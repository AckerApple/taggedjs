import { syncPriorPropFunction } from './syncPriorPropFunction.function.js';
export function updateExistingArray(prop, priorProp, newSupport, ownerSupport, depth) {
    for (let index = prop.length - 1; index >= 0; --index) {
        const x = prop[index];
        const oldProp = priorProp[index];
        prop[index] = syncPriorPropFunction(oldProp, x, newSupport, ownerSupport, depth + 1, index);
    }
    return prop;
}
//# sourceMappingURL=updateExistingArray.function.js.map
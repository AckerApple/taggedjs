import { syncPriorPropFunction } from './syncPriorPropFunction.function.js';
export function updateExistingArray(prop, priorProp, newSupport, ownerSupport, depth, maxDepth) {
    for (let index = prop.length - 1; index >= 0; --index) {
        const x = prop[index];
        const oldProp = priorProp[index];
        prop[index] = syncPriorPropFunction(oldProp, x, newSupport, ownerSupport, maxDepth, depth + 1);
    }
    return prop;
}
//# sourceMappingURL=updateExistingArray.function.js.map
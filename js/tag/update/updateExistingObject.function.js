import { syncPriorPropFunction } from './syncPriorPropFunction.function.js';
export function updateExistingObject(prop, priorProp, newSupport, ownerSupport, depth, maxDepth) {
    const keys = Object.keys(prop);
    for (const name of keys) {
        const subValue = prop[name];
        const oldProp = priorProp[name];
        const result = syncPriorPropFunction(oldProp, subValue, newSupport, ownerSupport, maxDepth, depth + 1);
        if (subValue === result) {
            continue;
        }
        const hasSetter = Object.getOwnPropertyDescriptor(prop, name)?.set;
        if (hasSetter) {
            continue;
        }
        prop[name] = result;
    }
    return prop;
}
//# sourceMappingURL=updateExistingObject.function.js.map
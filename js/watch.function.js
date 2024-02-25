import { state } from "./state.js";
/** When an item in watch array changes, callback function will be triggered */
export function watch(currentValues, callback) {
    let previousValues = state(undefined)(x => [previousValues, previousValues = x]);
    if (previousValues === undefined) {
        callback(currentValues, previousValues);
        const result = { currentValues, previousValues };
        previousValues = currentValues;
        return result;
    }
    const allExact = currentValues.every((item, index) => item === previousValues[index]);
    if (allExact) {
        return { currentValues, previousValues };
    }
    callback(currentValues, previousValues);
    const result = { currentValues, previousValues };
    previousValues = currentValues;
    return result;
}
//# sourceMappingURL=watch.function.js.map
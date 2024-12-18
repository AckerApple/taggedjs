export function syncStates(stateFrom, stateTo, oldStates, statesFrom) {
    // sync state()
    for (let index = stateFrom.length - 1; index >= 0; --index) {
        const fromValue = stateFrom[index].get();
        const callback = stateTo[index].callback; // is it a let state?
        if (!callback) {
            continue;
        }
        callback(fromValue); // set the value
    }
    for (let index = statesFrom.length - 1; index >= 0; --index) {
        const oldValues = [];
        const oldGetCallback = (...args) => {
            oldValues.push(args);
            return args;
        };
        // trigger getting all old values
        statesFrom[index](oldGetCallback);
        let getIndex = 0;
        const newSetCallback = (_) => {
            return oldValues[getIndex++];
        };
        // trigger setting updated values
        oldStates[index](newSetCallback);
    }
}
//# sourceMappingURL=syncStates.function.js.map
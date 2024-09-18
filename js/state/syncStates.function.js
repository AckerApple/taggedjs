export function syncStates(stateFrom, stateTo) {
    for (let index = stateFrom.length - 1; index >= 0; --index) {
        const fromValue = stateFrom[index].get();
        const callback = stateTo[index].callback; // is it a let state?
        if (!callback) {
            continue;
        }
        callback(fromValue); // set the value
    }
}
//# sourceMappingURL=syncStates.function.js.map
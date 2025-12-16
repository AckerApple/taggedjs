/**
 * Sync two supports
 * @param support FROM
 * @param newestSupport  ONTO
 * @returns
 */
export function syncSupports(support, // from
newestSupport) {
    const stateMeta = support.context.state;
    const newestStateMeta = newestSupport.context.state;
    const fromStates = stateMeta.newer.states;
    const toStates = newestStateMeta.newer.states;
    return syncStatesArray(fromStates, toStates);
}
export function syncStatesArray(from, onto) {
    for (let index = 0; index < from.length; ++index) {
        const getter = from[index];
        const setter = onto[index];
        syncStates(getter, setter);
    }
}
let got;
function syncFromState(...x) {
    got = x;
    return x;
}
function syncOntoState() {
    return got;
}
export function syncStates(from, onto) {
    from(syncFromState, 1);
    onto(syncOntoState, 2);
}
/** @deprecated favor using syncSupports */
export function oldSyncStates(stateFrom, stateTo, intoStates, statesFrom) {
    for (let index = stateFrom.length - 1; index >= 0; --index) {
        const stateFromTarget = stateFrom[index];
        const fromValue = stateFromTarget.get(); // get without setting
        // const fromValue = getStateValue(stateFromTarget) // get without setting
        const stateToTarget = stateTo[index];
        const callback = stateToTarget.callback; // is it a let state?
        if (!callback) {
            continue;
        }
        callback(fromValue); // set the value
    }
    // loop statesFrom to set on the oldStates
    for (let index = statesFrom.length - 1; index >= 0; --index) {
        oldValues.length = 0;
        getIndex = 0;
        const stateFromTarget = statesFrom[index];
        // trigger getting all old values
        stateFromTarget(oldGetCallback);
        // trigger setting updated values
        intoStates[index](newSetCallback);
    }
}
let getIndex = 0;
const oldValues = [];
function oldGetCallback(...args) {
    oldValues.push(args);
    return args;
}
// This is the "get" argument that will be called and all arguments are ignored
function newSetCallback(..._) {
    return oldValues[getIndex++];
}
//# sourceMappingURL=syncStates.function.js.map
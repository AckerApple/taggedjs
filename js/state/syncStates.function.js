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
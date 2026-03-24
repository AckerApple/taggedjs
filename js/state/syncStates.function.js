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
//# sourceMappingURL=syncStates.function.js.map
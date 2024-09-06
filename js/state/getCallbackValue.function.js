export class StateEchoBack {
}
// sends a fake value and then sets back to received value
export function getCallbackValue(callback) {
    const oldState = callback(StateEchoBack); // get value and set to undefined
    const [value] = oldState;
    const [checkValue] = callback(value); // set back to original value
    return [value, checkValue];
}
//# sourceMappingURL=getCallbackValue.function.js.map
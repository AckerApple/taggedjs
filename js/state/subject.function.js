import { Subject, ValueSubject } from '../subject/index.js';
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
import { setUseMemory } from './setUseMemory.object.js';
import { state } from './state.function.js';
import { syncStates } from './syncStates.function.js';
/** Create a Subject that on updates will sync state values to keep chained functions using latest variables */
export function subject(initialValue, onSubscription) {
    const support = getSupportInCycle();
    if (support) {
        return state(() => new Subject(initialValue));
    }
    return new Subject(initialValue);
}
subject._value = (value) => {
    const oldestState = state(function subjectValue() {
        return {
            stateArray: setUseMemory.stateConfig.stateArray,
            states: setUseMemory.stateConfig.states,
        };
    });
    const nowSupport = getSupportInCycle();
    return state(function subjectValue() {
        const subject = new ValueSubject(value).pipe(x => {
            syncStates(nowSupport.state, oldestState.stateArray, nowSupport.states, oldestState.states);
            return x;
        });
        return subject;
    });
};
function all(args) {
    const oldestState = state(() => ({
        stateArray: setUseMemory.stateConfig.stateArray,
        states: setUseMemory.stateConfig.states,
    }));
    const nowSupport = getSupportInCycle();
    return Subject.all(args).pipe(x => {
        syncStates(nowSupport.state, oldestState.stateArray, nowSupport.states, oldestState.states);
        return x;
    });
}
subject.all = all;
//# sourceMappingURL=subject.function.js.map
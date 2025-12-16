import { Subject, ValueSubject } from '../subject/index.js';
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { setUseMemory } from './setUseMemory.object.js';
import { state } from './state.function.js';
import { oldSyncStates } from './syncStates.function.js';
/** Create a Subject that on updates will sync state values to keep chained functions using latest variables */
export function subject(initialValue) {
    const support = getSupportInCycle();
    if (support) {
        return state(() => new Subject(initialValue));
    }
    return new Subject(initialValue);
}
subject._value = (value) => {
    const oldestState = state(function subjectValue() {
        return {
            state: setUseMemory.stateConfig.state,
            states: setUseMemory.stateConfig.states,
        };
    });
    const nowSupport = getSupportInCycle();
    return state(function subjectValue() {
        const subject = new ValueSubject(value).pipe(x => {
            const context = nowSupport.context;
            const stateMeta = context.state;
            const newer = stateMeta.newer;
            oldSyncStates(newer.state, oldestState.state, newer.states, oldestState.states);
            return x;
        });
        return subject;
    });
};
function all(args) {
    const oldestState = state(() => ({
        state: setUseMemory.stateConfig.state,
        states: setUseMemory.stateConfig.states,
    }));
    const nowSupport = getSupportInCycle();
    return Subject.all(args).pipe(x => {
        const context = nowSupport.context;
        const stateMeta = context.state;
        const newer = stateMeta.newer;
        if (newer) {
            oldSyncStates(newer.state, oldestState.state, newer.states, oldestState.states);
        }
        return x;
    });
}
subject.all = all;
//# sourceMappingURL=subject.function.js.map
import { ValueSubject } from '../subject/index.js';
import { tag } from '../tag/index.js';
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { setUseMemory } from './setUseMemory.object.js';
import { state } from './state.function.js';
/** @deprecated -
 * When an item in watch array changes, callback function will be triggered.
 * Triggers on initial watch setup. TIP: try watch.noInit()
 * @param currentValues T[]
 * @param callback WatchCallback
 * @returns T[]
 */
export const watch = ((currentValues, callback) => {
    return setupWatch(currentValues, callback).pastResult;
});
const defaultFinally = (x) => x;
function newWatch(setup) {
    const method = (currentValues, callback) => {
        return setupWatch(currentValues, callback, setup).pastResult;
    };
    method.setup = setup;
    defineOnMethod(() => method, method);
    return method;
}
/**
 * puts above functionality together
 * @param currentValues values being watched
 * @param callback (currentValue, previousValues) => resolveToValue
 * @param param2
 * @returns
 */
const setupWatch = (currentValues, callback, { init, before, final = defaultFinally, } = {}) => {
    const previous = state({
        pastResult: undefined,
        values: undefined,
    });
    const isFun = typeof (currentValues) === 'function';
    const realValues = isFun ? currentValues() : currentValues;
    const isFirstRender = previous.values === undefined;
    let renderCount = 0;
    if (isFirstRender) {
        if (typeof (currentValues) === 'function') {
            tag.onRender(() => {
                ++renderCount;
                if (renderCount === 1) {
                    return; // first run is already performed
                }
                const realValues = currentValues();
                processRealValues(realValues);
            });
        }
    }
    function processRealValues(realValues) {
        // First time running watch?
        if (previous.values === undefined) {
            if (before && !before(realValues)) {
                previous.values = realValues;
                return previous; // do not continue
            }
            const castedInit = init || callback;
            const result = castedInit(realValues, previous.values);
            previous.pastResult = final(result);
            previous.values = realValues;
            return previous;
        }
        const allExact = realValues.every((item, index) => item === previous.values[index]);
        if (allExact) {
            return previous;
        }
        if (before && !before(realValues)) {
            previous.values = realValues;
            return previous; // do not continue
        }
        const result = callback(realValues, previous.values);
        previous.pastResult = final(result);
        previous.values.length = 0;
        previous.values.push(...realValues);
        return previous;
    }
    return processRealValues(realValues);
};
function defineOnMethod(getWatch, attachTo) {
    Object.defineProperty(attachTo, 'noInit', {
        get() {
            const watch = getWatch();
            watch.setup.init = () => undefined;
            return watch;
        },
    });
    Object.defineProperty(attachTo, 'asSubject', {
        get() {
            const oldWatch = getWatch();
            const firstSupport = state(() => getSupportInCycle());
            const subject = state(() => {
                return new ValueSubject(undefined);
            });
            const oldState = state(() => ({
                state: setUseMemory.stateConfig.state,
                states: setUseMemory.stateConfig.states,
            }));
            const method = (currentValues, callback) => {
                const handler = (realValues, previousValues) => {
                    const nowSupport = getSupportInCycle();
                    const setTo = callback(realValues, previousValues);
                    if (nowSupport !== firstSupport) {
                        const newestState = oldState.state;
                        const context = firstSupport.context;
                        const stateMeta = context.state;
                        const oldestStateSupport = stateMeta.older;
                        if (oldestStateSupport) {
                            /*
                            const oldestState = oldestStateSupport.state
                            
                            const newStates = oldState.states
                            const oldStates = oldestStateSupport.states
                            
                            oldSyncStates(
                              newestState,
                              oldestState,
                              newStates,
                              oldStates,
                            )
                            */
                        }
                    }
                    subject.next(setTo);
                };
                setupWatch(currentValues, handler, oldWatch.setup);
                return subject;
            };
            method.setup = oldWatch.setup;
            defineOnMethod(() => method, method);
            return method;
        },
    });
    Object.defineProperty(attachTo, 'truthy', {
        get() {
            const watch = getWatch();
            watch.setup.before = (currentValues) => currentValues.every(x => x);
            return watch;
        },
    });
    return attachTo;
}
defineOnMethod(() => newWatch({}), watch);
//# sourceMappingURL=watch.function.js.map
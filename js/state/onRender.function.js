import { getContextInCycle, removeContextInCycle, setContextInCycle } from "../tag/cycles/setContextInCycle.function.js";
import { tag } from "../tagJsVars/tag.function.js";
export function onRender(callback) {
    const context = getContextInCycle();
    const callbackWrap = (_isFirst) => {
        // remember current context (old)
        // const oldIndex = setUseMemory.stateConfig.statesIndex
        const lastContext = getContextInCycle();
        // set to inner context cycle with previous state position
        setContextInCycle(context);
        const result = callback();
        // restore previous cycle
        removeContextInCycle();
        setContextInCycle(lastContext);
        return result;
    };
    const subscription = context.render$.subscribe(() => callbackWrap());
    const result = callbackWrap();
    tag.onDestroy(() => subscription.unsubscribe());
    return result;
}
//# sourceMappingURL=onRender.function.js.map
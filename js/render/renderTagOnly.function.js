import { initState } from '../state/state.utils.js';
import { callTag } from './callTag.function.js';
import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { removeContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { reStateSupport } from '../state/reState.function.js';
export function reRenderTag(newSupport, prevSupport, // causes restate
context, ownerSupport) {
    const stateMeta = context.state;
    const prevState = stateMeta.older.state;
    reStateSupport(newSupport, prevSupport, prevState);
    return callTag(newSupport, prevSupport, context, ownerSupport);
}
/** Used during first renders of a support */
export function firstTagRender(newSupport, prevSupport, // causes restate
context, ownerSupport) {
    initState(newSupport.context);
    setSupportInCycle(newSupport);
    const result = callTag(newSupport, prevSupport, context, ownerSupport);
    removeContextInCycle();
    return result;
}
export function getSupportOlderState(support) {
    const context = support?.context;
    const stateMeta = context?.state;
    return stateMeta?.older?.state;
}
/*
export function getSupportNewerState(support?: AnySupport) {
  const context = support?.context as SupportContextItem
  const stateMeta = context?.state
  return stateMeta?.newer?.state
}
*/ 
//# sourceMappingURL=renderTagOnly.function.js.map
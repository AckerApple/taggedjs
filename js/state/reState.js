import { setContextInCycle } from '../tag/cycles/setContextInCycle.function';
import { reStateByPrev } from './state.utils';
export function reState(context) {
    setContextInCycle(context);
    const stateMeta = context.state;
    return reStateByPrev(stateMeta.newer.state);
}
//# sourceMappingURL=reState.js.map
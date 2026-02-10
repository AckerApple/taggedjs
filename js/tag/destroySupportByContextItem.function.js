import { destroySupport } from '../render/destroySupport.function.js';
export function destroySupportByContextItem(context) {
    ++context.updateCount;
    const global = context.global;
    const state = context.state;
    const lastSupport = state.newest;
    delete context.inputsHandler;
    delete context.updatesHandler;
    // destroy old component, value is not a component
    destroySupport(lastSupport, global);
    destroySupportContext(context);
}
function destroySupportContext(context) {
    // delete context.htmlDomMeta
    context.htmlDomMeta = [];
    delete context.contexts;
    delete context.state;
    delete context.global;
    context.renderCount = 0;
}
//# sourceMappingURL=destroySupportByContextItem.function.js.map
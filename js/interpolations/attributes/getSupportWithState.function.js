import { isTagComponent } from '../../isInstance.js';
export function findStateSupportUpContext(context) {
    const stateMeta = context.state;
    if (stateMeta && stateMeta.newest && stateMeta.newest) {
        return stateMeta.newest;
    }
    if (context.parentContext) {
        return findStateSupportUpContext(context.parentContext);
    }
}
export function getSupportWithState(support) {
    // get actual component owner not just the html`` support
    let component = support;
    while (component.ownerSupport && !isTagComponent(component.templater)) {
        component = component.ownerSupport;
    }
    const context = component.context;
    const stateMeta = context.state;
    if (!stateMeta) {
        return component;
    }
    return stateMeta.newest || component;
}
//# sourceMappingURL=getSupportWithState.function.js.map
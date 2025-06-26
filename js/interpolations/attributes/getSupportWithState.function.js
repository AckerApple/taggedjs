import { isTagComponent } from '../../isInstance.js';
export function getSupportWithState(support) {
    // get actual component owner not just the html`` support
    let component = support;
    while (component.ownerSupport && !isTagComponent(component.templater)) {
        component = component.ownerSupport;
    }
    return component.context.global.newest || component;
}
//# sourceMappingURL=getSupportWithState.function.js.map
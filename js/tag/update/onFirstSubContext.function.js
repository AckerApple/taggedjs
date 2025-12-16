import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
export function onFirstSubContext(value, subContext, ownerSupport, // ownerSupport ?
insertBefore) {
    subContext.hasEmitted = true;
    return subContext.contextItem = createAndProcessContextItem(value, ownerSupport, [], insertBefore);
}
//# sourceMappingURL=onFirstSubContext.function.js.map
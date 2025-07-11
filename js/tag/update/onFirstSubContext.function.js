import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
export function onFirstSubContext(value, subContext, ownerSupport, // ownerSupport ?
counts, // used for animation stagger computing
insertBefore) {
    subContext.hasEmitted = true;
    return subContext.contextItem = createAndProcessContextItem(value, ownerSupport, counts, [], insertBefore);
}
//# sourceMappingURL=onFirstSubContext.function.js.map
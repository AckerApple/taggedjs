import { processReplacementComponent } from '../tag/update/processFirstSubjectComponent.function.js';
/** Only called by renderTagElement */
export function registerTagElement(support, element, global, // TODO: remove
templater, app, placeholder) {
    const context = support.context;
    context.state.oldest = support;
    context.state.newest = support;
    // Copy newer to older when resetting
    context.state.older = context.state.newer;
    context.contexts = context.contexts || [];
    const newFragment = document.createDocumentFragment();
    newFragment.appendChild(placeholder);
    processReplacementComponent(support.templater, context, support);
    return newFragment;
}
//# sourceMappingURL=registerNewTagElement.function.js.map
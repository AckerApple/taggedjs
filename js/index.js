export * from './tag/index.js';
export * from './errors.js';
export * from './isInstance.js';
export * from './state/index.js';
export { states } from './state/states.function.js';
export * from './subject/index.js';
export * from './interpolations/index.js';
export * from './tag/getSupport.function.js';
export * from './interpolations/attributes/howToSetInputValue.function.js';
export * from './interpolations/attributes/ElementTargetEvent.interface.js';
import { renderTagOnly } from './tag/render/renderTagOnly.function.js';
import { renderSupport } from './tag/render/renderSupport.function.js';
import { renderWithSupport } from './tag/render/renderWithSupport.function.js';
import { tagElement } from './tag/tagElement.js';
import { paint } from './tag/paint.function.js';
export { tagElement, renderWithSupport, renderSupport, renderTagOnly, paint, };
export const hmr = {
    tagElement, renderWithSupport, renderSupport,
    renderTagOnly, paint,
};
//# sourceMappingURL=index.js.map
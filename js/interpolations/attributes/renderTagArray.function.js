import { paint, painting } from '../../render/paint.function.js';
import { renderSupport } from '../../render/renderSupport.function.js';
export function renderTagUpdateArray(supports) {
    ++painting.locks;
    supports.forEach(mapTagUpdate);
    --painting.locks;
    paint();
}
function mapTagUpdate(support) {
    const global = support.context.global;
    if (!global) {
        return; // while rendering a parent, a child may have been deleted (pinbowl)
    }
    renderSupport(global.newest);
}
//# sourceMappingURL=renderTagArray.function.js.map
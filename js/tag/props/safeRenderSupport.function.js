import { isInlineHtml, renderInlineHtml } from '../../render/renderSupport.function.js';
import { renderExistingSupport } from '../../render/renderExistingTag.function.js';
export function safeRenderSupport(newest) {
    const subject = newest.context;
    const isInline = isInlineHtml(newest.templater);
    if (isInline) {
        return renderInlineHtml(newest);
    }
    return renderExistingSupport(newest, newest, subject);
}
//# sourceMappingURL=safeRenderSupport.function.js.map
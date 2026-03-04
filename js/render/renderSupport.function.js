import { ValueTypes } from '../tag/ValueTypes.enum.js';
export function isInlineHtml(templater) {
    return ValueTypes.templater === templater.tagJsType;
}
//# sourceMappingURL=renderSupport.function.js.map
import { processAttribute } from './processAttribute.function.js';
import { empty } from '../tag/ValueTypes.enum.js';
const search = new RegExp('\\s*<template interpolate end id="tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');
const underTagVarMatch = /:tagvar(\d{1,4}):/;
export function scanTextAreaValue(textarea, context, ownerSupport) {
    const value = textarea.value;
    if (value.search(search) >= 0) {
        const match = value.match(underTagVarMatch);
        const token = match ? match[0] : empty;
        const dynamic = '{' + token + '}';
        textarea.value = empty;
        textarea.setAttribute('text-var-value', dynamic);
        const howToSet = (_elm, _name, value) => textarea.value = value;
        const attrs = [
            'text-var-value',
            dynamic, // realValue, // context[token].value,
        ];
        processAttribute(attrs, textarea, context, ownerSupport, howToSet);
    }
}
//# sourceMappingURL=scanTextAreaValue.function.js.map
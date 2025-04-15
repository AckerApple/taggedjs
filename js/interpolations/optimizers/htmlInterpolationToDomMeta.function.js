import { variablePrefix, variableSuffix } from "../../tag/getDomTag.function.js";
import { parseHTML } from "./parseHTML.function.js";
const fragReplacer = /(^:tagvar\d+:|:tagvar\d+:$)/g;
const safeVar = '__safeTagVar';
/** Run only during compile step OR when no compile step occurred at runtime */
export function htmlInterpolationToDomMeta(strings, values) {
    htmlInterpolationToPlaceholders(strings, values);
    // Parse the modified fragments
    const htmlString = htmlInterpolationToPlaceholders(strings, values).join('');
    const domMeta = parseHTML(htmlString);
    return domMeta;
}
export function htmlInterpolationToPlaceholders(strings, values) {
    // Sanitize placeholders in the fragments
    const sanitizedFragments = sanitizePlaceholders(strings);
    // Add placeholders to the fragments
    return addPlaceholders(sanitizedFragments, values);
}
function sanitizePlaceholders(fragments) {
    return fragments.map(fragment => fragment.replace(fragReplacer, (match, index) => safeVar + index));
}
function addPlaceholders(strings, values) {
    const results = strings.map((fragment, index) => {
        if (index < values.length) {
            return fragment + variablePrefix + index + variableSuffix;
        }
        return fragment;
    });
    balanceArrayByArrays(results, strings, values);
    return results;
}
export function balanceArrayByArrays(results, strings, values) {
    const diff = values.length - strings.length;
    if (diff > 0) {
        for (let x = diff; x > 0; --x) {
            results.push(variablePrefix + (strings.length + x - 1) + variableSuffix);
        }
    }
}
//# sourceMappingURL=htmlInterpolationToDomMeta.function.js.map
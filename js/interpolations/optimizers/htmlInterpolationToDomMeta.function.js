import { variablePrefix, variableSuffix } from "../../tag/DomTag.type.js";
import { parseHTML } from "./parseHTML.function.js";
// const fragReplacer = /(^:tagvar\d+:|:tagvar\d+:$)/g
export const realTagsRegEx = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'gi');
export const findRealTagsRegEx = new RegExp('(' + variablePrefix + '\\d+' + variableSuffix + ')', 'gi');
// without last letter
const shortFront = variablePrefix.slice(0, variablePrefix.length - 1);
// export const fakeTagsRegEx = new RegExp(variablePrefix + '(x)*(x)+(\\d+)(x)*(x)+' + variableSuffix, 'gi')
export const fakeTagsRegEx = new RegExp(shortFront + '&#x72;(\\d+)' + variableSuffix, 'gi');
// variable prefix minus one letter and then the letter "r" as hex
const replacement = shortFront + '&#x72;$1' + variableSuffix;
/** Run only during compile step OR when no compile step occurred at runtime */
export function htmlInterpolationToDomMeta(strings, values) {
    // Parse the modified fragments
    const htmlString = htmlInterpolationToPlaceholders(strings, values).join('');
    const domMeta = parseHTML(htmlString);
    return domMeta;
}
export function htmlInterpolationToPlaceholders(strings, values) {
    // Sanitize placeholders in the fragments
    const sanitizedFragments = strings;
    // const sanitizedFragments = sanitizePlaceholders(strings)
    // Add placeholders to the fragments
    return addPlaceholders(sanitizedFragments, values);
}
/*
function sanitizePlaceholders(fragments: string[]) {
  return fragments.map(santizeFragment)
}

function santizeFragment(fragment: string) {
  return fragment.replace(
    fragReplacer,
    (match, index) => safeVar + index)
}
*/
function addPlaceholders(strings, values) {
    const results = [];
    for (let index = 0; index < strings.length; ++index) {
        const fragment = strings[index];
        const safeFragment = fragment.replace(realTagsRegEx, replacement);
        if (index < values.length) {
            results.push(safeFragment + variablePrefix + index + variableSuffix);
            continue;
        }
        results.push(safeFragment);
    }
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
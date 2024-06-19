import { variableSuffix, variablePrefix } from "../../tag/Tag.class.js";
import { replacePlaceholders } from "./replacePlaceholders.function.js";
import { restorePlaceholders } from "./restorePlaceholders.function.js";
const fragReplacer = /(^:tagvar\d+:|:tagvar\d+:$)/g;
const safeVar = '__safeTagVar';
const regexAttr = /([:_a-zA-Z0-9\-\.]+)(?:="([^"]*)"|=(\S+))?/g;
const regexTagOrg = /<\/?([a-zA-Z0-9\-]+)([^>]*)>/;
export function htmlInterpolationToDomMeta(strings, values) {
    // Sanitize placeholders in the fragments
    const sanitizedFragments = sanitizePlaceholders(strings);
    // Add placeholders to the fragments
    const fragmentsWithPlaceholders = addPlaceholders(sanitizedFragments, values);
    // Parse the modified fragments
    const htmlString = fragmentsWithPlaceholders.join('');
    const parsedElements = parseHTML(htmlString);
    return parsedElements;
}
export function exchangeParsedForValues(parsedElements, values) {
    // Replace placeholders with actual dynamic values
    replacePlaceholders(parsedElements, values);
    // Restore any sanitized placeholders in text nodes
    restorePlaceholders(parsedElements);
    return parsedElements;
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
function parseHTML(html) {
    const elements = [];
    const stack = [];
    let currentElement = null;
    let valueIndex = 0;
    let position = 0;
    const regexTag = new RegExp(regexTagOrg, 'g');
    while (position < html.length) {
        const tagMatch = regexTag.exec(html);
        if (!tagMatch) {
            break;
        }
        const [fullMatch, tagName, attrString] = tagMatch;
        const isClosingTag = fullMatch.startsWith('</');
        const isSelfClosing = fullMatch.endsWith('/>');
        if (position < tagMatch.index) {
            const textContent = html.slice(position, tagMatch.index);
            if (textContent.trim()) {
                const textNode = {
                    nodeName: 'text',
                    textContent // : textContent.trim() ??? new removed
                };
                if (currentElement) {
                    if (!currentElement.children) {
                        currentElement.children = [];
                    }
                    currentElement.children.push(textNode);
                }
                else {
                    elements.push(textNode);
                }
            }
        }
        position = tagMatch.index + fullMatch.length;
        if (isClosingTag) {
            currentElement = stack.pop() || null;
            continue;
        }
        const element = {
            nodeName: tagName,
            attributes: []
        };
        let attrMatch;
        while ((attrMatch = regexAttr.exec(attrString)) !== null) {
            let [_, attrName, attrValueQuoted, attrValueUnquoted] = attrMatch;
            let attrValue = attrValueQuoted || attrValueUnquoted;
            if (attrValue === undefined) {
                const standAloneVar = attrName.slice(0, variablePrefix.length) === variablePrefix;
                if (standAloneVar) {
                    element.attributes.push([attrName]); // the name itself is dynamic
                    continue;
                }
                attrValue = variablePrefix + (valueIndex++) + variableSuffix;
            }
            element.attributes.push([attrName.toLowerCase(), attrValue]);
        }
        if (currentElement) {
            if (!currentElement.children) {
                currentElement.children = [];
            }
            currentElement.children.push(element);
        }
        else {
            elements.push(element);
        }
        if (!isSelfClosing) {
            stack.push(currentElement);
            currentElement = element;
        }
    }
    if (position < html.length) {
        const textContent = html.slice(position);
        if (textContent.trim()) {
            const textNode = {
                nodeName: 'text',
                textContent: textContent.trim()
            };
            if (currentElement) {
                if (!currentElement.children) {
                    currentElement.children = [];
                }
                currentElement.children.push(textNode);
            }
            else {
                elements.push(textNode);
            }
        }
    }
    return elements;
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
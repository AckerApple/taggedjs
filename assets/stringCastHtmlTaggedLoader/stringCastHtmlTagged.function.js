// taggedjs-no-compile
import { parseHtmlTemplates } from "./parseHtmlTemplates.function.js";
import { reconstructCode } from "./reconstructCode.function.js";
export const string = 'string';
// TODO: this function seem useless or its just cloning?
export function extractTemplateParts(parsedResults) {
    return parsedResults.map(item => {
        if (typeof item === string) {
            return item;
        }
        else {
            const { html, strings, values } = item;
            return { html, strings, values };
        }
    });
}
function recursiveTemplateParse(parsedResults) {
    const recurseValues = (values) => {
        return values.map(value => {
            if (value.includes('html`')) {
                const parsed = parseHtmlTemplates(value);
                const result = parseHtmlResults(value, parsed);
                return result;
            }
            return value;
        });
    };
    return parsedResults.map(item => {
        if (typeof item === 'object') {
            if (item.html) {
                item.values = recurseValues(item.values);
            }
        }
        return item;
    });
}
export function stringCastHtml(code) {
    const parsedResults = parseHtmlTemplates(code);
    return parseHtmlResults(code, parsedResults);
}
function parseHtmlResults(code, parsedResults) {
    if (parsedResults.every((template) => typeof template === string)) {
        return code;
    }
    const detailedResults = extractTemplateParts(parsedResults);
    return recursiveTemplateParse(detailedResults);
}
export function stringCastHtmlTagged(code, filePath) {
    // return code
    if (code.includes('taggedjs-no-compile')) {
        return code;
    }
    const finalResults = stringCastHtml(code);
    if (typeof finalResults === string) {
        return finalResults;
    }
    const reconstructed = reconstructCode(finalResults);
    const allStrings = `\nconst allStrings: (string[])[] = ${JSON.stringify(reconstructed.allStrings)}`;
    const output = reconstructed.code + allStrings;
    return output;
}
//# sourceMappingURL=stringCastHtmlTagged.function.js.map
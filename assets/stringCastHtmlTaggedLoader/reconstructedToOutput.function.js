// taggedjs-no-compile
import { getDomMeta } from "taggedjs/js/tag/domMetaCollector.js";
import { domMetaArrayToOutput } from "./domMetaArrayToOutput.function.js";
export function reconstructedToOutput(reconstructed, filePath) {
    const allDom = reconstructed.allStrings.map((data) => {
        const { strings, valueCount } = data;
        let values = [];
        if (valueCount) {
            values = ','.repeat(valueCount - 1).split(',');
        }
        return getDomMeta(strings, values);
    });
    return domMetaArrayToOutput(reconstructed, allDom, filePath);
}
//# sourceMappingURL=reconstructedToOutput.function.js.map
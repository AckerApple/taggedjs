// taggedjs-no-compile
import { reconstructCode } from "./reconstructCode.function.js";
import { reconstructedToOutput } from "./reconstructedToOutput.function.js";
import { string, stringCastHtml } from "./stringCastHtmlTagged.function.js";
export default function domCastTagged(code, filePath) {
    // return code
    if (code.includes('taggedjs-no-compile')) {
        return code;
    }
    const finalResults = stringCastHtml(code);
    if (typeof finalResults === string) {
        return finalResults;
    }
    const reconstructed = reconstructCode(finalResults, 'html.dom');
    return reconstructedToOutput(reconstructed, filePath);
}
//# sourceMappingURL=domCastTagged.function.js.map
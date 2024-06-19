// taggedjs-no-compile

import { reconstructCode } from "./reconstructCode.function"
import { reconstructedToOutput } from "./reconstructedToOutput.function"
import { ParsedResults, string, stringCastHtml } from "./stringCastHtmlTagged.function"

export default function domCastTagged(
  code: string,
  filePath: string
) {
// return code
  if(code.includes('taggedjs-no-compile')) {
    return code
  }

  const finalResults = stringCastHtml(code)

  if(typeof finalResults === string) {
    return finalResults
  }

  const reconstructed = reconstructCode(
    finalResults as ParsedResults,
    'html.dom',
  );

  return reconstructedToOutput(reconstructed, filePath)
}

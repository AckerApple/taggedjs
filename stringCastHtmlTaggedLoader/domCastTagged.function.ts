// taggedjs-no-compile

import { reconstructCode } from "./reconstructCode.function.js"
import { reconstructedToOutput } from "./reconstructedToOutput.function.js"
import { ParsedResults, string, stringCastHtml } from "./stringCastHtmlTagged.function.js"

export default function domCastTagged(
  code: string,
  filePath: string
) {
// return code
  if(code.includes('taggedjs-no-compile')) {
    return code
  }

  const finalResults = stringCastHtml(code)

  /*
  if(filePath.includes('input.ts')) {
    console.debug('---------------')
    console.debug(finalResults)
    console.debug('---------------')
  }
  */


  // was not intended to be parsed
  if(typeof finalResults === string) {
    return finalResults
  }

  const reconstructed = reconstructCode(
    finalResults as ParsedResults,
    'html.dom',
  );

/*
  if(filePath.includes('input.ts')) {
    console.debug('---------------')
    console.debug(reconstructed)
    console.debug('---------------')
  }
*/
  return reconstructedToOutput(reconstructed, filePath)
}

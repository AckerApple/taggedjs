// taggedjs-no-compile

import { Reconstructed } from "./reconstructCode.function.js"
import { getDomMeta } from "taggedjs/js/tag/domMetaCollector.js"
import { domMetaArrayToOutput } from "./domMetaArrayToOutput.function.js"

export function reconstructedToOutput(
  reconstructed: Reconstructed,
  filePath: string,
) {  
  const allDom = reconstructed.allStrings.map((data) => {
    const {strings, valueCount} = data
    let values: any[] = []
    
    if(valueCount) {
      values = ','.repeat(valueCount - 1).split(',')
    }
    
    return getDomMeta(strings, values)
  })

  return domMetaArrayToOutput(reconstructed, allDom, filePath)
}

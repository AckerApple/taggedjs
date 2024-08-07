import { ParsedHtml } from "taggedjs/js/interpolations/optimizers/htmlInterpolationToDomMeta.function.js";
import { Reconstructed } from "./reconstructCode.function.js"
import { DomMetaMap } from "taggedjs/js/interpolations/optimizers/exchangeParsedForValues.function.js";

export function domMetaArrayToOutput(
  reconstructed: Reconstructed,
  allDom: ParsedHtml[],
  filePath: string,
) {
  const outputVarString = customStringify(allDom)
  const allStrings = `\n// @ts-ignore\nconst allStrings = ${outputVarString}`
  const output = reconstructed.code + allStrings
  return output;
}

function customStringify(obj: ParsedHtml[]) { 
  const funStrings = obj.map(o => JSON.stringify(o))
  const jsonString = '[' + funStrings.join(',') + ']'

  return jsonString.replace(/"__isFunction\*\*(.*?)\*\*isFunction__"/g, (match, p1) => {
      return p1 // .replace(/\\"/g, '"').replace(/\\n/g, '\n');
  });
}
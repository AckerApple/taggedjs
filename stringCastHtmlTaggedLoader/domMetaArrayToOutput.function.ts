import { ParsedHtml } from "taggedjs/js/interpolations/optimizers/htmlInterpolationToDomMeta.function.js";
import { Reconstructed } from "./reconstructCode.function.js"
import { DomMetaMap } from "taggedjs/js/interpolations/optimizers/exchangeParsedForValues.function.js";

export function domMetaArrayToOutput(
  reconstructed: Reconstructed,
  allDom: ParsedHtml[],
  filePath: string,
) {
  // const outputVarString = JSON.stringify(allDom)
  const outputVarString = customStringify(allDom)
  const allStrings = `\n// @ts-ignore\nconst allStrings = ${outputVarString}`
  // console.log('\n\n', allStrings, '\n\n')
  // const allStrings = `\nconst allStrings: {pos: any[], domMeta: any[], org:any[]}[] = ${JSON.stringify(allDom)}`
  const output = reconstructed.code + allStrings
  return output;
}

function customStringify(obj: ParsedHtml[]) {
  // const seen = new WeakSet();
/*
  function replacer(key: any, value: any) {
      if (typeof value === 'function') {
          return '__isFunction**' + value.toString() + '**isFunction__'
      }
      return value;
  }
  const jsonString = JSON.stringify(obj, replacer, 0);
  */
 
  const funStrings = obj.map(o => '() => ' + JSON.stringify(o))
  const jsonString = '[' + funStrings.join(',') + ']'

  return jsonString.replace(/"__isFunction\*\*(.*?)\*\*isFunction__"/g, (match, p1) => {
      return p1 // .replace(/\\"/g, '"').replace(/\\n/g, '\n');
  });
}
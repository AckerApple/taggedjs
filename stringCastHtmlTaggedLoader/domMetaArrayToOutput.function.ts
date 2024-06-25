import { ObjectChildren } from "taggedjs/js/interpolations/optimizers/ObjectNode.types.js"
import { Reconstructed } from "./reconstructCode.function.js"

export function domMetaArrayToOutput(
  reconstructed: Reconstructed,
  allDom: ObjectChildren[],
  filePath: string,
) {
  // const allStrings = `\nconst allStrings: any[] = ${JSON.stringify(allDom)}`;
  const allStrings = `\nconst allStrings = ${JSON.stringify(allDom)}`;
  const output = reconstructed.code + allStrings;
  const target = filePath.includes('tagSwitchDebug.component.ts')
  return output;
}
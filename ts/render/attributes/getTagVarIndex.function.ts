import { variableSuffix, variablePrefix } from "../../tag/DomTag.type.js";
export const placeholderRegex = new RegExp(variablePrefix + '(\\d+)' + variableSuffix, 'g');

export function getTagVarIndex(value: string) {
  if(value.search && value.startsWith(variablePrefix)) {
    return value.search(placeholderRegex)
  }
  return -1
}
import { replacePlaceholders } from "./replacePlaceholders.function.js"
import { restorePlaceholders } from "./restorePlaceholders.function.js"
import { ObjectElement, ObjectText } from "./ObjectNode.types.js"
import { variablePrefix, variableSuffix } from "../../tag/Tag.class.js"

export type ValuePos = {
  value: unknown // TODO: remove
  pos: (string | number)[]
  isAttr?: true
}

export function exchangeParsedForValues(
  parsedElements: (ObjectElement | ObjectText)[],
  values: unknown[],
) {
  const valuePositions: ValuePos[] = []
  // Replace placeholders with actual dynamic values
  replacePlaceholders(parsedElements, values, valuePositions)
  
  // ???new
  replaceHoldersByPosMaps(parsedElements, values, valuePositions)
  // console.log('valuePositions', {valuePositions, parsedElements})
  
  // Restore any sanitized placeholders in text nodes
  restorePlaceholders(parsedElements)

  return parsedElements
}

function replaceHoldersByPosMaps(
  parsedElements: (ObjectElement | ObjectText)[],
  values: unknown[],
  valuePositions: ValuePos[],
) {
  for (let index = valuePositions.length - 1; index >= 0; --index) {
    const valuePosMeta = valuePositions[index]
    replaceHolderByPosMap(parsedElements, values, valuePosMeta, index)
  }
}

function replaceHolderByPosMap(
  parsedElements: (ObjectElement | ObjectText)[],
  values: unknown[],
  valuePosition: ValuePos,
  valueIndex: number,
) {
  let varPart: any = parsedElements

  const posMap = valuePosition.pos
  const stopAt = posMap.length - 1 // leave the last variable name for setting
  const lastName = posMap[stopAt]
  for (let index=0; index < stopAt; ++index) {
    varPart = varPart[ posMap[index] ]
  }

  if(varPart[lastName] != values[valueIndex] && typeof(varPart[lastName]) !== 'string') {
    console.log('varPart here', {
      varPart, lastName, valueIndex,
      valuePosition,
      parsedElements,
    })
  }

  varPart[lastName] = values[valueIndex]
}

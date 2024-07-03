import { ObjectElement, ObjectText } from "./ObjectNode.types.js"

export type ValuePos = {
  pos: (string | number)[]
  // isAttr?: true
  isAttr?: boolean
}

export type DomMetaMap = {
  domMeta: (ObjectElement | ObjectText)[],
  pos: ValuePos[]
}

export function replaceHoldersByPosMaps(
  parsedElements: (ObjectElement | ObjectText)[],
  values: unknown[],
  valuePositions: ValuePos[],
) {
  Object.values(valuePositions).forEach((valuePosMeta, index) =>
    replaceHolderByPosMap(parsedElements, values, valuePosMeta, index)
  )
}

function replaceHolderByPosMap(
  parsedElements: (ObjectElement | ObjectText)[],
  values: unknown[],
  valuePosition: ValuePos,
  valueIndex: number,
) {
  const posMap = [...valuePosition.pos]
  const lastName = posMap.pop()
  const varPart: any = posMap.reduce((
    all: any,
    name: string | number,
  ) => {
    return all[ name as any ]
  }, parsedElements)

  varPart[lastName as any] = values[valueIndex]
}

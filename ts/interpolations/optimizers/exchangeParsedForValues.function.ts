import { ParsedHtml } from "./htmlInterpolationToDomMeta.function.js"
import { ObjectElement, ObjectText } from "./ObjectNode.types.js"

export type ValuePos = (elements:any) => ([any, string | number] | any[])
export type ObjectChildren = (ObjectText | ObjectElement)[]

// used for runtime processing
export type DomMetaMap = ParsedHtml
// used for imports with no typing
export type LikeObjectChildren = LikeObjectElement[]

// A looser typing for compiled code
type LikeObjectElement = {
  nn: string // nodeName
  tc?: string // textContent
  v?: any // value
  at?: any[], // attributes
  ch?: LikeObjectElement[] // children
  
  domElement?: any
}


// TODO: remove
export function replaceHoldersByPosMaps(
  parsedElements: ParsedHtml[],
  valuePositions: ValuePos[],
) {
  return Object.values(valuePositions).map((valuePosMeta, index) =>
    replaceHolderByPosMap(parsedElements, valuePosMeta)
  )
}

function replaceHolderByPosMap(
  parsedElements: ParsedHtml[],
  valuePosition: ValuePos,
) {
  return valuePosition(parsedElements)
}
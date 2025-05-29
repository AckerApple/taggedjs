import { SpecialDefinition } from "../../render/attributes/Special.types.js"
import { ObjectChildren } from "./LikeObjectElement.type.js"

type ObjectNode = {
  nn: string // nodeName
  v?: unknown // value
  marker?: Text
}

export type ObjectText = ObjectNode & {
  tc: string // textContent
  domElement?: Text
}

export type Attribute = [
  string, // name
  any?, // value
  SpecialDefinition? // isSpecial
] | [any]

export type ObjectElement = ObjectNode & {
  at?: Attribute[] // attributes
  ch?: ObjectChildren // children
  
  domElement?: HTMLElement
}


export type DomObjectText = ObjectText & {
  tc: string // textContent
  domElement: Text
  marker: Text
}
export type DomObjectElement = ObjectElement & {
  at: [
    string, // name
    any, // value
    boolean, // isSpecial
  ][] // attributes
  domElement: HTMLElement
  
  ch?: DomObjectChildren // children
  marker?: Text
}
export type DomObjectChildren = (DomObjectText | DomObjectElement)[]

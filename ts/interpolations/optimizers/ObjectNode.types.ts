import { ObjectChildren, ValuePos } from "./exchangeParsedForValues.function"

type ObjectNode = {
  nodeName: string
  value?: unknown
  marker?: Text
}

export type ObjectText = ObjectNode & {
  textContent: string  
  domElement?: Text
}

export type Attribute = [string, any?] | [any]

export type ObjectElement = ObjectNode & {
  attributes?: Attribute[]
  children?: ObjectChildren
  domElement?: HTMLElement
}


export type DomObjectText = ObjectText & {
  textContent: string
  domElement: Text
  marker: Text
}
export type DomObjectElement = ObjectElement & {
  attributes: [string, any][]
  domElement: HTMLElement
  
  children?: DomObjectChildren
  marker?: Text
}
export type DomObjectChildren = (DomObjectText | DomObjectElement)[]

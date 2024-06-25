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

// A looser typing for compiled code
export type LikeObjectElement = {
  nodeName: string
  textContent?: string
  attributes?: any[],
  children?: LikeObjectElement[]
  domElement?: any
}

export type ObjectChildren = (ObjectText | ObjectElement)[]
export type LikeObjectChildren = LikeObjectElement[]

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

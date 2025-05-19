import { blankHandler } from "./dom/attachDomElements.function.js"

export type PaintCommand = {
  processor: (
    ...args: any[]
  ) => any
  args: any[]
}

export let paintCommands = [] as PaintCommand[]
export let paintContent: (() => any)[] = []
export let setContent: [string, Text][] = []

export let paintAppends: PaintCommand[] = []

export let paintAfters: (() => any)[] = [] // callbacks after all painted

export const painting = {
  locks: 0
}

export function paint() {
  if(painting.locks > 0) {
    return
  }

  for(const content of paintContent) {
    content()
  }

  for(const [text, textNode] of setContent) {
    textNode.textContent = text
  }

  for(const now of paintAppends) {
    now.processor(...now.args)
  }

  for (const item of paintCommands) {
    item.processor(...item.args)
  }

  paintReset()

  for(const now of paintAfters) {
    now()
  }

  paintAfters = []
}

function paintReset() {
  paintCommands = []
  paintContent = []
  paintAppends = []
  setContent = []
}

export function paintRemover(element: Text | Element) {
  const parentNode = element.parentNode as ParentNode
  parentNode.removeChild(element as Element)
}

export function paintBefore(
  relative: Text | Element,
  element: Text | Element,
) {
  ((relative as Text).parentNode as ParentNode).insertBefore(element, relative as Text)
}

export function paintAppend(
  relative: Text | Element,
  element: Text | Element,
) {
  (relative as ParentNode).appendChild(element)
}

const someDiv = (typeof document === 'object' && document.createElement('div')) as HTMLDivElement // used for content cleaning

export function paintBeforeText(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any = blankHandler
) {
  someDiv.innerHTML = text
  const textElm = document.createTextNode(someDiv.innerHTML as string)
  paintBefore(relative, textElm)
  callback(textElm)
}

export function paintAppendText(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any
) {
  someDiv.innerHTML = text
  const textElm = document.createTextNode(someDiv.textContent as string)
  paintAppend(relative, textElm)
  callback(textElm)
}
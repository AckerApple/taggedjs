import { blankHandler } from "./dom/attachDomElements.function.js"

export type PaintCommand = [((...args: any[]) => unknown), any[]]

export let paintCommands: PaintCommand[] = []
export let paintContent: PaintCommand[] = []
export let setContent: [string, Text][] = []

export let paintAppends: PaintCommand[] = []

export let paintAfters: PaintCommand[] = [] // callbacks after all painted

export const painting = {
  locks: 0
}

export function paint() {
  if(painting.locks > 0) {
    return
  }

  for(const content of paintContent) {
    content[0](...content[1])
  }

  for(const [text, textNode] of setContent) {
    textNode.textContent = text
  }

  for(const content of paintAppends) {
    content[0](...content[1])
  }

  for (const content of paintCommands) {
    content[0](...content[1])
  }

  paintReset()

  for(const content of paintAfters) {
    content[0](...content[1])
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

function toPlainTextElm(text: string) {
  // swap &gt; for >
  someDiv.innerHTML = text // script tags should have already been sanitized before this step

  // delete <!-- -->
  return document.createTextNode(someDiv.innerHTML as string)
}

export function paintBeforeText(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any = blankHandler
) {
  const textElm = toPlainTextElm(text)
  paintBefore(relative, textElm)
  callback(textElm)
}

export function paintAppendText(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any
) {
  const textElm = toPlainTextElm(text)
  paintAppend(relative, textElm)
  callback(textElm)
}

/** Used when HTML content is safe and expected */
export function paintBeforeElementString(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any = blankHandler
) {
  someDiv.innerHTML = text
  const textElm = document.createTextNode(someDiv.textContent as string) // toPlainTextElm(text)
  paintBefore(relative, textElm)
  callback(textElm)
}

/** Used when HTML content is safe and expected */
export function paintAppendElementString(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any
) {
  someDiv.innerHTML = text
  const textElm = document.createTextNode(someDiv.textContent as string) // toPlainTextElm(text)
  paintAppend(relative, textElm)
  callback(textElm)
}

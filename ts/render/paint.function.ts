import { blankHandler } from "./dom/blankHandler.function.js"

/** A function expected to paint by commands such as a html painter that renders elements */
export type painter = (...args: any[]) => unknown

export type PaintCommand = [
  painter,
  /** arguments for the painter */
  any[],
]

/** Typically used for animations to run before clearing elements */
export function addPaintRemoveAwait(_promise: Promise<any>) {
  /*
  if(paintRemoveAwaits.length) {
    paintRemoveAwaits[paintRemoveAwaits.length - 1].paintRemoves.push( ...paintRemoves )
    paintRemoves = []
  }

  paintRemoveAwaits.push({promise, paintRemoves})
  paintRemoves = []
  */
}

// let paintRemoveAwaits: {promise: Promise<any>, paintRemoves: PaintCommand[]}[] = []
export let paintCommands: PaintCommand[] = []
// export let paintRemoves: PaintCommand[] = []
export const paintRemoves: PaintCommand[] = []
export let paintContent: PaintCommand[] = []

// TODO: This this is duplicate of paintCommands (however timing is currently and issue and cant be removed)
export let paintAppends: PaintCommand[] = []

export let paintAfters: PaintCommand[] = [] // callbacks after all painted

export const painting = {
  locks: 0,
  removeLocks: 0,
}

export function setContent(
  text: string,
  textNode: Text,
) {
  textNode.textContent = text
}

/** you must lock before calling this function */
export function paint(): any {
  if(painting.locks > 0) {
    // throw new Error('double paint')
    return
  }

  runCycles()
}

function runCycles() {
  ++painting.locks
  runPaintCycles()
  --painting.locks

  runAfterCycle()
}

/** Deletes happen last */
function runAfterCycle() {
  paintReset()

  const nowPaintAfters = paintAfters
  paintAfters = [] // prevent paintAfters calls from endless recursion

  for(const content of nowPaintAfters) {
    content[0](...content[1])
  }
}

function runPaintRemoves(): any {
  // element.parentNode.removeChild
  for (const content of paintRemoves) {
    content[0](...content[1])
  }
}

function runPaintCycles() {
  const removes = paintRemoves.length
  runPaintRemoves()
  
  // paintRemoves = []
  paintRemoves.splice(0, removes)

  // styles/attributes and textElement.textContent
  for(const content of paintContent) {
    content[0](...content[1])
  }

  // .appendChild
  for(const content of paintAppends) {
    content[0](...content[1])
  }

  // element.insertBefore
  for (const content of paintCommands) {
    content[0](...content[1])
  }
}

function paintReset() {
  paintCommands = []
  paintContent = []
  paintAppends = []
}

export function addPaintRemover(
  element: Text | Element,
  caller?: string,
) {
  paintRemoves.push([paintRemover, [element, caller]])
}

/** must be used with paintRemoves */
function paintRemover(
  element: Text | Element,
  _caller: string, // can be used for determining who is failing
) {
  const parentNode = element.parentNode as ParentNode
  if(!element) {
    console.debug('no element by', {
      _caller, element
    })
  }
  if(!parentNode) {
    console.debug('no parentNode by', {_caller, element})
  }

  parentNode.removeChild(element as Element)
}

/** insertBefore. For parent.appendChild() see paintAppend */
export function paintBefore(
  relative: Text | Element,
  element: Text | Element,
  _caller: string,
) {
  const parentNode = relative.parentNode as ParentNode
  parentNode.insertBefore(element, relative as Text)
}

/** parent.appendChild(). For insertBefore see paintBefore */
export function paintAppend(
  relative: Text | Element,
  element: Text | Element,
) {
  (relative as ParentNode).appendChild(element)
}

const contentCleaner = (typeof document === 'object' && document.createElement('div')) as HTMLDivElement // used for content cleaning

function toPlainTextElm(text: string) {
  // swap &gt; for >
  contentCleaner.innerHTML = text // script tags should have already been sanitized before this step

  // delete <!-- -->
  return document.createTextNode(contentCleaner.innerHTML as string)
}

export function paintBeforeText(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any = blankHandler,
  _caller: string,
) {
  const textElm = toPlainTextElm(text)

  paintBefore(relative, textElm, _caller)
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
  contentCleaner.innerHTML = text
  const textElm = document.createTextNode(contentCleaner.textContent as string) // toPlainTextElm(text)

  paintBefore(relative, textElm, 'paintBeforeElementString')
  callback(textElm)
}

/** Used when HTML content is safe and expected */
export function paintAppendElementString(
  relative: Text | Element,
  text: string,
  callback: (created: Text) => any
) {
  contentCleaner.innerHTML = text
  const textElm = document.createTextNode(contentCleaner.textContent as string) // toPlainTextElm(text)
  paintAppend(relative, textElm)
  callback(textElm)
}

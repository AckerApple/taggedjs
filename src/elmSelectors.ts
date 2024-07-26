
export function elmCount(selector: string) {
  return document.querySelectorAll(selector).length
}

export function query(
  query: string
): HTMLElement[] {
  return document.querySelectorAll(query) as any as HTMLElement[] // allow .style to just work
}

export function focus(
  q: string
) {
  return query(q).forEach(elm => (elm as HTMLElement).focus())
}

export function click(
  q: string
) {
  const items = [...query(q)]
  items.map(elm => (elm as HTMLElement).click())
}

export function keydownOn(input: Element, key: string) {
  const keyEvent = new KeyboardEvent('keydown', {
    key,
    bubbles: true, // Ensure the event bubbles
  })

  input.dispatchEvent(keyEvent)
}


export function keyupOn(input: Element, key?: string) {
  const keyEvent = new KeyboardEvent('keyup', {
    key,
    bubbles: true, // Ensure the event bubbles
  })
  
  input.dispatchEvent(keyEvent)
}

export function clickOne(
  q: string,
  index = 0,
) {
  const element = query(q)[index] as HTMLElement
  element.click()
}

export function html(
  q: string
) {
  let html = ''
  query(q).forEach(elm => html = html + elm.innerHTML)
  return html
}

export function byId(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement
}

export function htmlById(id: string): string {
  return (document.getElementById(id) as HTMLElement).innerHTML
}

export function lastById(id: string): Element {
  const elms = document.querySelectorAll('#' + id)
  return elms[elms.length - 1]
}

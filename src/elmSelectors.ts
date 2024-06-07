
export function elmCount(selector: string) {
  return document.querySelectorAll(selector).length
}

export function query(
  query: string
) {
  return document.querySelectorAll(query)
}

export function focus(
  q: string
) {
  return query(q).forEach(elm => (elm as HTMLElement).focus())
}

export function click(
  q: string
) {
  return query(q).forEach(elm => (elm as HTMLElement).click())
}

export function clickOne(
  q: string,
  index = 0,
) {
  const element = query(q)[index] as HTMLElement
  return element.click()
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

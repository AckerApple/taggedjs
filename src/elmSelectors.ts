
export function elmCount(selector: string) {
  return document.querySelectorAll(selector).length
}

export function queryOneInnerHTML(
  query: string,
  pos = 0
) {
  return document.querySelectorAll(query)[pos].innerHTML
}

export function click(
  query: string
) {
  return document.querySelectorAll(query).forEach(elm => (elm as HTMLElement).click())
}

export function html(
  query: string
) {
  let html = ''
  document.querySelectorAll(query).forEach(elm => html = html + elm.innerHTML)
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

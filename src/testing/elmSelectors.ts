
export function count(selector: string) {
  return document.querySelectorAll(selector).length
}

export const elmCount = count

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

/** document.querySelectorAll(...).forEach(i => i.click()) */
export function click(
  q: string
) {
  clickEach([...query(q)])
}

export function clickEach(items: HTMLElement[]) {
  items.forEach(elm => (elm as HTMLElement).click())
}

export function clickById(
  id: string
) {
  click('#' + id)
}

export function clickOne(
  q: string,
  index = 0,
) {
  const element = query(q)[index] as HTMLElement
  element.click()
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

/** dispatch the change event on an element */
export function changed(
  q: string
) {
  changeEach([...query(q)])
}

export function changeEach(items: HTMLElement[]) {
  items.forEach(changeElm)
}


export function changeOne(
  q: string,
  index = 0,
) {
  const target = query(q)[index] as HTMLElement
  changeElm(target)
}

export function changeElm(target: HTMLElement) {
  // ;(target as any).change({ target })
  target.dispatchEvent(new Event('change', { bubbles: true }))
}

export function html(
  q: string
) {
  let html = ''
  query(q).forEach(elm => html = html + elm.innerHTML)
  return html
}

export function textContent(
  q: string
) {
  let html = ''
  query(q).forEach(elm => html = html + elm.textContent)
  return html
}

export function byId(id: string): HTMLElement & { value: string | number } {
  return document.getElementById(id) as any
}

/** Returns empty string also when element not found */
export function htmlById(id: string): string {
  const element = document.getElementById(id)
  return element?.innerHTML || ''
}

export function lastById(id: string): Element {
  const elms = document.querySelectorAll('#' + id)
  return elms[elms.length - 1]
}

export function blur(
  q: string
) {
  return query(q).forEach(elm => triggerBlurElm((elm as HTMLElement)))
}

export function change(
  q: string
) {
  // return query(q).forEach(elm => triggerChangeElm((elm as HTMLElement)))
  return query(q).forEach(elm => changeElm(elm))
}

const blurEvent = new Event('focusout', {
  bubbles: true, // Blur events typically do not bubble, but this can be set to true if needed
  cancelable: false // Blur events are not cancelable
})


export function triggerBlurElm(elm: Element) {
  elm.dispatchEvent(blurEvent)
}

const changeEvent = new Event('change', {
  bubbles: true, // Blur events typically do not bubble, but this can be set to true if needed
  cancelable: false // Blur events are not cancelable
})

export function triggerChangeElm(elm: Element) {
  elm.dispatchEvent(changeEvent)
}
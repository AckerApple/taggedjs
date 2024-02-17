import { html, state, tag, Tag, TagComponent } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const innerHtmlTest = tag((
  children: Tag,
) => {
  let renderCount = state(0)(x => [renderCount, renderCount = x])
  let counter = state(0)(x => [counter, counter = x])

  return html`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>innerHTML test</legend>
      ${children}
      <button onclick=${() => ++counter}>increase  ${counter}</button>
      ${renderCountDiv(renderCount)}
    </fieldset>
  `
})

export const innerHtmlPropsTest = tag(function innerHtmlPropsTest(
  /** @type {number} */
  x,
  /** @type {Tag[]} */
  children
) {
  let renderCount = state(0)(x => [renderCount, renderCount = x])
  let counter = state(0)(x => [counter, counter = x])
  
  ++renderCount
  
  return html`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${x}</legend>
      ${children}
      <button onclick=${() => ++counter}>increase  ${counter}</button>
      ${renderCountDiv(renderCount)}
    </fieldset>
  `
})

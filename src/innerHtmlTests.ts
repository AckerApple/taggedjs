import { html, letState, tag, isSubjectInstance, isTagArray, Tag } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const innerHtmlTest = tag((
  _props: unknown,
  b:number,
  children: Tag,
) => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let counter = letState(0)(x => [counter, counter = x])

  ++renderCount

  return html`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div style="border:2px solid purple;">${children}</div>
      <div>isSubjectInstance:${isSubjectInstance(children)}</div>
      <div>isSubjectTagArray:${isTagArray(children)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${() => ++counter}>increase innerHtmlTest ${counter}</button>
      <span id="innerHtmlTest-counter-display">${counter}</span>
      ${renderCountDiv({renderCount, name: 'innerHtmlTest'})}
    </fieldset>
  `
})

export const innerHtmlPropsTest = tag((
  x: number, children: Tag,
) => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let counter = letState(0)(x => [counter, counter = x])
  
  ++renderCount
  
  return html`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${x}</legend>
      ${children}
      <button id="innerHtmlPropsTest-button" onclick=${() => ++counter}
      >increase innerHtmlPropsTest ${counter}</button>
      <span id="innerHtmlPropsTest-display">${counter}</span>
      ${/*renderCountDiv(renderCount)*/ false}
    </fieldset>
  `
})

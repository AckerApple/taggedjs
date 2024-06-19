import { html, tag, letState } from "taggedjs"

export const mirroring = tag(() => {
  const tag = tagCounter()

  return html`
    <fieldset>
      <legend>counter0</legend>
      ${tag}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${tag}
    </fieldset>
  `
})


const tagCounter = () => {
  let counter = letState(0)(x => [counter, counter = x])

  return html`
    counter:<span>🪞<span id="mirror-counter-display">${counter}</span></span>
    <button id="mirror-counter-button" onclick=${() => ++counter}>${counter}</button>
  `
}

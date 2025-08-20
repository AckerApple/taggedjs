import { tag, html, states } from "taggedjs"

export const basic = tag(() => {
  let counter = 0
  let renderCount = 0

  states(get =>
    [counter, renderCount] = get(counter, renderCount)
  )
  
  renderCount++

  return html`
    <div>
      <h2>Basic Component</h2>
      <p>Counter: ${counter}</p>
      <p>Render Count: ${renderCount}</p>
      <button onclick=${() => counter++}>Increment Counter</button>
    </div>
  `
})
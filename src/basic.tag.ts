import { div, tag, html, states, button, select, option, span } from "taggedjs"

export const basic = tag(() => {
  let counter = 0
  let renderCount = 0
  let showDiv = true

  states(get =>
    [counter, renderCount, showDiv] = get(counter, renderCount, showDiv)
  )
  
  renderCount++

  return html`
    <div>
      <h2>Basic Component</h2>
      <p>Counter: ${counter}</p>
      <p>Render Count: ${renderCount}</p>
      <button onclick=${() => counter++}>Increment Counter</button>
      <button onclick=${() => showDiv = !showDiv}>Toggle Div (${showDiv ? 'Hide' : 'Show'})</button>
    </div>
    ${showDiv && boltTag(counter)}
  `
})

const boltTag = tag((parentCounter: number) => {
  let clickCount = 0
  let color = 'red'

  boltTag.inputs(x => [parentCounter] = x)

  return div(
    () => `color: ${color}`,

    select({onChange: e => color = e.target.value},
      option({value:'red'}, 'red'),
      option({value:'green'}, 'green'),
    ),

    () => arrayBoltTest(parentCounter),

    span({style: _=> 'color:' + color}, 'hello my span world'),

    div({style: _=> 'color:' + color}, 'hello my div world'),

    button({onClick: () => ++clickCount}, 'click me'),

    div(_=> `click counts ${clickCount}`),
    div(_=> `parent counter: ${parentCounter}`),
    div(_=> `combined counters: ${clickCount + parentCounter}`),
  )
})

const arrayBoltTest = tag((parentCounter) => {
  arrayBoltTest.inputs(x => [parentCounter] = x)
  let innerCounter = 0
  return [
    div('hello array bolt 0'),
    div('hello array bolt 1'),
    div(`innerCounter: `, _=> innerCounter),
    div(() => `parent counter: ${parentCounter}`),
    button({onClick: () => ++innerCounter}, 'inner counter')
  ]
})
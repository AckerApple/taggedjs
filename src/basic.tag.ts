import { div, tag, button, select, option, span, h2, p } from "taggedjs"

export const basic = tag(() => {
  let counter = 0
  let renderCount = 0
  let showDiv = true

  renderCount++

  return div(
    h2('Basic Component'),
    
    p(_=> `Counter: ${counter}`),
    p(_=> `Render Count: ${renderCount}`),
    
    button({
      onClick: () => counter++
    }, 'Increment Counter'),

    button({
      onClick: () => showDiv = !showDiv
    }, _=> `Toggle Div (${showDiv ? 'Hide' : 'Show'})`),

    _=> showDiv && boltTag(counter),
  )
})

const boltTag = tag((parentCounter: number) => {
  let clickCount = 0
  let color = 'red'

  boltTag.updates(x => [parentCounter] = x)

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
  arrayBoltTest.updates(x => [parentCounter] = x)
  let innerCounter = 0
  return [
    div('hello array bolt 0'),
    div('hello array bolt 1'),
    div(`innerCounter: `, _=> innerCounter),
    div(() => `parent counter: ${parentCounter}`),
    button({onClick: () => ++innerCounter}, 'inner counter')
  ]
})
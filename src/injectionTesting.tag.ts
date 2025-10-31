import { tag, div, h2, h3, p, small, strong, br, input } from "taggedjs"
import { injectionWrap } from "./hostTests/injectionWrap.host.js"
import { injectionTarget } from "./hostTests/injectionTarget.host.js"

/** Acts as a parent to injectionTarget.host.ts */
export const injectionTag = tag(() => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => ({id}))
  const selectedTest = [] as {id: number}[]
  
  const wrapHost = injectionWrap(
    selectedTest,
    (newSelected) => {
      selectedTest.length = 0
      selectedTest.push( ...newSelected )
    }
  )

  ;(wrapHost as any).TEST = '👈👈👈👈'

  console.log('wrapHost', wrapHost)

  return div({style: "padding: 20px;"},
    h2('Injection Test'),
    'selected: ', _=> {
      return selectedTest.length
    },
    
    div({
      id: "injection-testing-wrap-host",
      attr: wrapHost,
      style: `
        border: 2px solid #666;
        gap:1em;
        background: #f0f0f0;
        padding: 20px;
        min-height: 300px;
        position: relative;
        user-select: none;
        display:flex;flex-wrap:wrap;
      `
      },
      _=> items.map((x, index) =>
        div({
          id: _=> `injection-test-item-${x.id}`,
          style: `
            display: inline-block;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          `,
          'style.background': _=> selectedTest.includes(x) ? '#4CAF50' : '#2196F3',
          'style.border': _=> selectedTest.includes(x) ? '3px solid #333' : '1px solid #999',
          attr: injectionTarget(x),
        },
          input({
            type: "checkbox",
            checked: _=> {
              const included = selectedTest.includes(x)
              return included
            }
          }),
          'Item ', x.id,
        )
      )
    ),

    div({
      style: `
        margin-top: 20px;
        padding: 10px;
        background: #333; color: white;
      `
    },
      h3('Selected Items:'),
      p(
        _=> selectedTest.length > 0
          ? selectedTest.map(x => x.id).join(', ')
          : 'No items selected. Click to select items.'
      )
    ),

    div({style: "margin-top: 10px; color: #666;"},
      small(
        strong('Instructions:'),
        br,
        '- Click to select/deselect items',
        br,
        '- Click on empty space to deselect all',
        br,
        '- Selected items will be highlighted in green'
      )
    )
  )
})
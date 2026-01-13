import { div, fieldset, h3, hr, input, legend, li, ol, option, select, tag } from "taggedjs"
import { subscribeAttributes } from "./subscribeAttributes.tag"

export const attributeDebug = tag(() => {
  let selected: string = 'a'
  let isOrange: boolean = true

  return div(
    input({
      id: "attr-input-abc",
      placeholder: "a b or c",
      onChange: (event: any) => selected = event.target.value
    }),

    select({
        onChange: e => selected = e.target.value,
        id: "select-sample-drop-down"
      },
      ['a','b','c'].map(item =>
        option({
          value: item,
          selected: () => item == selected
        }, item, ' - ', _=> item == selected ? 'true' : 'false')
      )
    ),

    select({
        onChange: e => selected = e.target.value,
        id: "select-sample-drop-down-clone"
      },
      ['a','b','c'].map(item =>
        option({
          value: item,
          selected: () => item == selected
        }, item, ' - ', item == selected ? 'true' : 'false')
      )
    ),
    
    hr,
    
    h3('Special Attributes'),

    div(
      input({
        type: "checkbox",
        id: "toggle-backgrounds",
        checked: ()=> isOrange && 'checked',
        onChange: (event: any) => isOrange = event.target.checked
      }),
      () => ` - toggle backgrounds:${isOrange ? 'true' : 'false'}`
    ),

    div({style:"display: flex;flex-wrap:wrap;gap:1em"},
      ol(
        li(
          div({
            id: "attr-style-strings",
            style: _=> ({
              backgroundColor: isOrange ? 'orange' : '',
              color: isOrange ? 'black': '',
            })
          }, "style.background-color=${'orange'}")
        ),

        li(
          div({
            id: "attr-class-booleans",
            class: () => ({
              'background-orange': isOrange ? true : false,
              'text-black': isOrange ? true : false,
            })
          }, () => `class.background-orange=${isOrange}`)
        ),

        li(
          div({
            id: "attr-inline-class",
            class: () => isOrange ? 'background-orange text-black' : ''
          }, "class=${'background-orange text-black'}")
        ),

        li(
          div({
            id: "attr-dynamic-inline-class",
            class: () => 'text-white' + (isOrange ? ' background-orange' : '')
          }, "class=${'background-orange'} but always white")
        ),
      )
    ),

    fieldset({style:"margin-top: 1em"},
      legend('style object attribute'),

      div({
        id: "style-object-test",
        style: _=> ({
          backgroundColor: isOrange ? 'orange' : 'lightgrey',
          padding: '10px',
          border: '2px solid black',
          borderRadius: isOrange ? '8px' : '4px',
          boxShadow: isOrange ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none'
        })
      }, 'Style object test'),

      div({
        id: "style-set-property-test",
        style: _=> ({
          'background-color': isOrange ? 'red' : 'blue',
          color: 'white',
          padding: '5px',
          'margin-top': '10px'
        })
      }, 'style property test')
    ),

    _=> subscribeAttributes(),
  )
})

import { states, html, tag, InputElementTargetEvent, Tag, div, select, option, h3, button, span } from "taggedjs"
import { renderCountDiv } from "./renderCount.component.js"
import { ElementVar } from "taggedjs/js/elements/designElement.function.js"

type SelectedTag = null | string | undefined

export const tagSwitchDebug = tag((_t='tagSwitchDebug') => {
  let selectedTag = null as SelectedTag
  let renderCount = 0
  
  function changeSelectedTag(event: InputElementTargetEvent) {
    selectedTag = event.target.value

    if(selectedTag === 'undefined') {
      selectedTag = undefined
    }

    if(selectedTag === 'null') {
      selectedTag = null
    }
  }

  ++renderCount

  return div(
    div({id:"selectTag-wrap"},
      'selectedTag: |',
      span({id:"selectTag-display"},
        () =>
          selectedTag === null && 'null' ||
          selectedTag === undefined && 'undefined' ||
          selectedTag === '' && 'empty-string' ||
          selectedTag
      ),
      '|'
    ),

    select({
      id: "tag-switch-dropdown",
      onChange: changeSelectedTag
    },
        option(),

        /* TODO: implement selected attribute */
        option({
          value: "",
          selected: () => typeof(selectedTag) === 'string' && !selectedTag.length ? {selected: true} : {}
        }, 'empty-string'),

        option({
          value: "undefined",
          selected: () => selectedTag === undefined ? {selected: true} : {}
        }, 'undefined'),

        option({
          value: "null",
          selected: () => selectedTag === null
        }, 'null'),

        option({
          value: "1",
          selected: () => selectedTag === '1'
        }, 'tag 1'),

        option({
          value: "2",
          selected: () => selectedTag === '2'
        }, 'tag 2'),

        option({
          value: "3",
          selected: () => selectedTag === '3'
        }, 'tag 3'),
      ),

      div({
        id: "switch-tests-wrap",
        style: "display:flex;flex-wrap:wrap;gap:1em;"
      },
          div({style:"border:1px solid blue;flex-grow:1"},
            h3('Test 1 - string | Tag'),
            div(() => {
              switch (selectedTag) {
                case null: return 'null, select tag below'
                case "": return div({id:"empty-string-1"})
                case '1': return tag1({title:'value switch'})
                case '2': return tag2({title:'value switch'})
                case '3': return tag3({title:'value switch'})
              }
              return 'select tag below'
            })
          ),

          div({style:"border:1px solid blue;flex-grow:1"},
            h3('Test 2 - Tag'),
            div(() => {
              switch (selectedTag) {
                case null:
                  return div({id:"select-tag-above"},
                    'null, select tag above'
                  )
                case "":
                  return div({id:"select-tag-above"},
                    'empty-string, select tag above'
                  )
                case '1': return tag1({title:'tag switch'})
                case '2': return tag2({title:'tag switch'})
                case '3': return tag3({title:'tag switch'})
              }

              return div({id:"select-tag-above"}, 'select tag above')
            }),
          ),

          div({style:"border:1px solid blue;flex-grow:1"},
            h3('Test 3 - ternary (only 1 or 3 shows)'),
            div(
              () => selectedTag === '3' ? tag3({title: 'ternary simple'}) : tag1({title: 'ternary simple'})
            )
          ),

          div({style:"border:1px solid blue;flex-grow:1"},
            h3('Test 3.2 - ternary via prop (only 1 or 3 shows)'),
            div(() => ternaryPropTest({selectedTag})),
          ),

          div({
            id: "arraySwitching-test-wrap",
            style: "border:1px solid red;flex-grow:1"
          },
            h3('Test 4 - arraySwitching'),
            div({id:"arraySwitching-wrap"},
              () => arraySwitching({selectedTag})
            )
          ),
        ),
      
      () => renderCountDiv({renderCount, name:'tagSwitchDebug'}),
  )
})

export const ternaryPropTest = tag((
  {selectedTag}: {selectedTag: string | undefined | null}
) => {
  ternaryPropTest.inputs(x =>[{selectedTag}] = x)

  return div({id:"ternaryPropTest-wrap"},
    () => `${selectedTag}:`, (context) => {
      const returnValue = selectedTag === '3' ? tag3({title: 'ternaryPropTest'}) : tag1({title: 'ternaryPropTest'})
      return returnValue
    }
  )
})

export const tag1 = tag(({title}: {title: string}) => {
  let counter = 0
  let renderCount = 0

  tag1.inputs(x => [{title}] = x)

  ++renderCount
  return div({
    id: "tag1",
    style: "border:1px solid orange;"
  },
      div({id:"tagSwitch-1-hello"},
        () => `Hello 1 ${title} World`
      ),

      button({onClick: () => ++counter},
        () => `increase ${counter}`
      ),

      () => renderCountDiv({renderCount, name:'tag1'})
    )
})

export const tag2 = tag(({title}: {title: string}) => {
  let counter = 0
  let renderCount = 0

  //tag2.inputs(x => [{title}] = x)

  ++renderCount
  //return 22

  return div({
    id: "tag2",
    style: "border:1px solid orange;"
  },
      div({id:"tagSwitch-2-hello"},
        () => `Hello 2 ${title} World`),

      button({
        onClick: () => ++counter
      }, ()=> `increase ${counter}`),

      () => renderCountDiv({renderCount, name:'tag1'}),
    )
})

export const tag3 = tag(({title}: {title: string}) => {
  let counter = 0
  let renderCount = 0

  tag3.inputs(x => [{title}] = x)

  ++renderCount
  return div({
    id: "tag3",
    style: "border:1px solid orange;"
  },
      div({id:"tagSwitch-3-hello"},
        () => `Hello 3 ${title} World`),

      button({
        onClick: () => ++counter
      }, () => `increase ${counter}`),

      () => renderCountDiv({renderCount, name:'tag1'}),
    )
})

export const arraySwitching = (
  {selectedTag}: {selectedTag: SelectedTag},
) => {  
  switch (selectedTag) {
    case undefined:
      return `its an undefined value`

    case null:
      return `its a null value`

    case '':
      // TODO: ??? should be empty string
      return `space` // tests how .previousSibling works

    case '1':
      return tag1({title: `tag ${selectedTag}`})

    case '2':
      return ['b','c'].map(x => 
        tag2({title: `array ${selectedTag} ${x}`}).key(x)
      )

    case '3':
      return ['d','e','f'].map(x => 
        tag3({title: `array ${selectedTag} ${x}`}).key(x)
      )
  }

  return `nothing to show for in arrays`
}

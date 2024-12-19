import { states, html, tag, InputElementTargetEvent, Tag } from "taggedjs"
import { renderCountDiv } from "./renderCount.component.js"

type SelectedTag = null | string | undefined

export const tagSwitchDebug = tag((_t='tagSwitchDebug') => {
  let selectedTag = null as SelectedTag
  let renderCount = 0
  states(get => [{renderCount, selectedTag}] = get({renderCount, selectedTag}))
  
  function changeSelectedTag(event: InputElementTargetEvent) {
    selectedTag = event.target.value

    if(selectedTag === 'undefined') {
      selectedTag = undefined
    }

    if(selectedTag === 'null') {
      selectedTag = null
    }
  }

  let tagOutput: string | Tag = 'select tag below'
  switch (selectedTag) {
    case null: tagOutput = 'null, select tag below'
      break;
    case "": tagOutput = html`<div id="empty-string-1"></div>`
      break;
    case '1': tagOutput = tag1({title:'value switch'})
      break;
    case '2': tagOutput = tag2({title:'value switch'})
      break;
    case '3': tagOutput = tag3({title:'value switch'})
      break;
  }

  let tagOutput2 = html`<div id="select-tag-above">select tag above</div>`
  switch (selectedTag) {
    case null: tagOutput2 = html`<div id="select-tag-above">null, select tag above</div>`
      break;
    case "": tagOutput2 = html`<div id="select-tag-above">empty-string, select tag above</div>`
      break;
    case '1': tagOutput2 = tag1({title:'tag switch'})
      break;
    case '2': tagOutput2 = tag2({title:'tag switch'})
      break;
    case '3': tagOutput2 = tag3({title:'tag switch'})
      break;
  }

  ++renderCount

  return html`
    <div id="selectTag-wrap">
      selectedTag: |${
        selectedTag === null && 'null' ||
        selectedTag === undefined && 'undefined' ||
        selectedTag === '' && 'empty-string' ||
        selectedTag
      }|
    </div>
    
    <select id="tag-switch-dropdown" onchange=${changeSelectedTag}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="" ${ typeof(selectedTag) === 'string' && !selectedTag.length ? {selected: true} : {} }>empty-string</option>
	    <option value="undefined" ${ selectedTag === undefined ? {selected: true} : {} }>undefined</option>
	    <option value="null" ${ selectedTag === null ? {selected: true} : {} }>null</option>
	    <option value="1" ${ selectedTag === '1' ? {selected: true} : {} }>tag 1</option>
	    <option value="2" ${ selectedTag === '2' ? {selected: true} : {} }>tag 2</option>
	    <option value="3" ${ selectedTag === '3' ? {selected: true} : {} }>tag 3</option>
    </select>

    <div id="switch-tests-wrap" style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 1 - string | Tag</h3>
        <div>${tagOutput}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 2 - Tag</h3>
        <div>${tagOutput2}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3 - ternary (only 1 or 3 shows)</h3>
        <div>${selectedTag === '3' ? tag3({title: 'ternary simple'}) : tag1({title: 'ternary simple'})}</div>
      </div>

      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${ternaryPropTest({selectedTag})}</div>
      </div>

      <div id="arraySwitching-test-wrap" style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div id="arraySwitching-wrap">${arraySwitching({selectedTag})}</div>
      </div>
    </div>
    ${renderCountDiv({renderCount, name:'tagSwitchDebug'})}
  `
})

export const ternaryPropTest = tag((
  {selectedTag}: {selectedTag: string | undefined | null}
) => {
  const outTag = selectedTag === '3' ? tag3({title: 'ternaryPropTest'}) : tag1({title: 'ternaryPropTest'})
  return html`
    <div id="ternaryPropTest-wrap">
      ${selectedTag}:${outTag}
    </div>
  `
})

export const tag1 = tag(({title}: {title: string}) => {
  let counter = 0
  let renderCount = 0
  states(get => [{counter, renderCount}] = get({counter, renderCount}))

  ++renderCount
  return html`
    <div id="tag1" style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${renderCountDiv({renderCount, name:'tag1'})}
    </div>
  `
})

export const tag2 = tag(({title}: {title: string}) => {
  let counter = 0
  let renderCount = 0
  states(get => [{counter, renderCount}] = get({counter, renderCount}))

  ++renderCount
  return html`
    <div id="tag2" style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${renderCountDiv({renderCount, name:'tag1'})}
    </div>
  `
})

export const tag3 = tag(({title}: {title: string}) => {
  let counter = 0
  let renderCount = 0
  states(get => [{counter, renderCount}] = get({counter, renderCount}))

  ++renderCount
  return html`
    <div  id="tag3" style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${renderCountDiv({renderCount, name:'tag1'})}
    </div>
  `
})

export const arraySwitching = tag((
  {selectedTag}: {selectedTag: SelectedTag},
  _ = 'arraySwitching'
) => {
  switch (selectedTag) {
    case undefined:
      return html`its an undefined value`

    case null:
      return html`its a null value`

    case '':
      // TODO: ??? should be empty string
      return html`space` // tests how .previousSibling works

    case '1':
      return html`${tag1({title: `tag ${selectedTag}`})}`

    case '2':
      return html`${['b','c'].map(x => html`${tag2({title: `array ${selectedTag} ${x}`})}`.key(x))}`

    case '3':
      return html`${['d','e','f'].map(x => html`${tag3({title: `array ${selectedTag} ${x}`})}`.key(x))}`
  }

  return html`nothing to show for in arrays`
})

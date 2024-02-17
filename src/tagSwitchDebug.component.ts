import { html, tag, state, InputElementTargetEvent, Tag } from "taggedjs"

export const tagSwitchDebug = tag(() => {
  let selectedTag = state(null as null | string)(x => [selectedTag, selectedTag = x])
  
  function changeSelectedTag(event: InputElementTargetEvent) {
    selectedTag = event.target.value
  }

  let tagOutput: string | Tag = 'select tag below'

  switch (selectedTag) {
    case '1': tagOutput = tag1()
    break;
    case '2': tagOutput = tag2()
    break;
    case '3': tagOutput = tag3()
    break;
  }

  let tagOutput2 = html`select tag above`
  switch (selectedTag) {
    case '1': tagOutput2 = tag1()
    break;
    case '2': tagOutput2 = tag2()
    break;
    case '3': tagOutput2 = tag3()
    break;
  }


  return html`
    selectedTag: ${selectedTag}
    
    <div>${tagOutput}</div>

    <select onchange=${changeSelectedTag}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="1" ${ selectedTag === '1' ? {selected: true} : {} }>tag 1</option>
	    <option value="2" ${ selectedTag === '2' ? {selected: true} : {} }>tag 2</option>
	    <option value="3" ${ selectedTag === '3' ? {selected: true} : {} }>tag 3</option>
    </select>

    <div>${tagOutput2}</div>
  `
})
export const tag1 = tag(() => html`Hello 1 World`)
export const tag2 = tag(() => html`Hello 2 World`)
export const tag3 = tag(() => html`Hello 3 World`)

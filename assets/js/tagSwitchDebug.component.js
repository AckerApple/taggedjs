import { html, tag, state } from "./taggedjs/index.js"

export const tagSwitchDebug = tag(() => {
  let selectedTag = state(null, x => [selectedTag, selectedTag = x])
  
  function changeSelectedTag(event) {
    selectedTag = event.target.value
  }

  let tagOutput = ''
  switch (selectedTag) {
    case '1': tagOutput = tag1()
    break;
    case '2': tagOutput = tag2()
    break;
    case '3': tagOutput = tag3()
    break;
    default:  tagOutput = ''
  }


  return html`
    selectedTag: ${selectedTag}
    
    <div>${tagOutput}</div>

    <select onchange=${changeSelectedTag}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="1">tag 1</option>
	    <option value="2">tag 2</option>
	    <option value="3">tag 3</option>
    </select>
  `
})
export const tag1 = tag(() => html`Hello 1 World`)
export const tag2 = tag(() => html`Hello 2 World`)
export const tag3 = tag(() => html`Hello 3 World`)

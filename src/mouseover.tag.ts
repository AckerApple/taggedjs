import {html, states, tag} from 'taggedjs'

export const mouseOverTag = tag(({
  label, memory,
}: {
  label: string
  memory:{
    counter: number
  }
}) => {
  let mouseOverEditShow = false
  let edit = false

  states(get => [{mouseOverEditShow,edit}] = get({mouseOverEditShow,edit}))

  return html`<!-- mouseOverTag -->
    <div style="background-color:purple;padding:.2em;flex:1"
      onmouseover=${() => mouseOverEditShow = true}
      onmouseout=${() => mouseOverEditShow = false}
    >
      mouseover - ${label}:${memory.counter}:${mouseOverEditShow || 'false'}
      <button onclick=${() => ++memory.counter}>++counter</button>
      <a style.visibility=${(edit || mouseOverEditShow) ? 'visible' : 'hidden'}
        onclick=${() => edit = !edit}
      >⚙️&nbsp;</a>
    </div>
  `
})

import {html, setLet, tag} from 'taggedjs'

export const mouseOverTag = tag(({
  label, memory,
}: {
  label: string
  memory:{
    counter: number
  }
}) => {
  let mouseOverEditShow = setLet(false)(x => [mouseOverEditShow, mouseOverEditShow = x])
  let edit = setLet(false)(x => [edit, edit = x])
  return html`
    <div style="background-color:purple;padding:.2em;"
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

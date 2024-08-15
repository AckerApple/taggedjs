import { html, letState, tag } from 'taggedjs';
export const mouseOverTag = tag(({ label, memory, }) => {
    let mouseOverEditShow = letState(false)(x => [mouseOverEditShow, mouseOverEditShow = x]);
    let edit = letState(false)(x => [edit, edit = x]);
    return html `<!-- mouseOverTag -->
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
  `;
});
//# sourceMappingURL=mouseover.tag.js.map
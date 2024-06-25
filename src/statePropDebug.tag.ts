import { Tag, html, letState, state, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export default (propCounter: number, child: Tag) => tag.state = (
  _ = state('statePropDebug.tag.ts'), // something to be seen in console
  edit = letState(false)(x => [edit, edit = x]),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  __ = ++renderCount
) => html`
  propCounter:${propCounter}
  <button type="button" onclick=${() => edit = !edit}>edit ${edit}</button>
  child: ${child}
  ${renderCountDiv({renderCount, name: 'statePropDebug-tag'})}
`

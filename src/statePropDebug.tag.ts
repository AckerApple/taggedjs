import { Tag, html, states, state, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export const statePropDebug = (propCounter: number, child: Tag) => tag.state = (
  _ = state('statePropDebug.tag.ts'), // something to be seen in console
  edit = false,
  renderCount = 0,
  ___ = states(get => [{edit, renderCount}] = get({edit, renderCount})),
  __ = ++renderCount,
) => html`
  propCounter:${propCounter}
  <button type="button" onclick=${() => edit = !edit}>edit ${edit}</button>
  child: ${child}
  ${renderCountDiv({renderCount, name: 'statePropDebug-tag'})}
`

export default statePropDebug
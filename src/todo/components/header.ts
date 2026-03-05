import { InputElementTargetEvent, tag, header, h1, input } from "taggedjs";
import { handleKey } from "./item.js";
import { Dispatch } from "../reducer.js";

export const Header = (dispatch: Dispatch) => {
  console.log('HEADER SHOULD ONLY RENDER ONCE')
  return header
    .class`header`
    .attr("data-testid",`header`)(
      h1('component todos'),
      input
        .autoFocus`true`
        .class`new-todo`
        .placeholder`What needs to be done?`
        .onKeyDown((e: InputElementTargetEvent) => {
          const enter = handleKey(e, title => dispatch.addItem(title))
          if(enter) {
            e.target.value = ""
          }
        })
      )
}
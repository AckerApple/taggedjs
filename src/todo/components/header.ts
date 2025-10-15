import { InputElementTargetEvent, tag, header, h1, input } from "taggedjs";
import { handleKey } from "./item.js";
import { Dispatch } from "../reducer.js";

export const Header = (dispatch: Dispatch) =>
header({class: "header", 'data-testid': "header"},
  h1('component todos'),
  input({
    autoFocus: true,
    class: "new-todo",
    placeholder: "What needs to be done?",
    onKeydown: (e: InputElementTargetEvent) => {
      const enter = handleKey(e, title => dispatch.addItem(title))
      if(enter) {
        e.target.value = ""
      }
    }
  })
)

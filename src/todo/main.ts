import { InputElementTargetEvent, div, main, input, label, ul } from "taggedjs"
import { Item } from "./components/item.js"
import { dispatch } from "./todos.app.js"

export const Main = (
  activeTodoCount: number,
  visibleTodos: any[]
) => {
  return main({class: "main"},
    div({class: "toggle-all-container"},
      input({
        id: "toggle-all",
        class: "toggle-all",
        type: "checkbox",
        checked: _=> activeTodoCount < 1 ? 1 : 0,
        onChange: (e: InputElementTargetEvent) => dispatch.toggleAll(e.target.checked)
      }),
      label({class: "toggle-all-label", for: "toggle-all"},
        'Toggle All Input'
      )
    ),
    
    ul({class: "todo-list show-priority"},
      // 👉 loop todos
      _=> visibleTodos.map((todo, index) => {
        return Item(todo, dispatch, index).key(todo.id)
      })
    )
  )
}
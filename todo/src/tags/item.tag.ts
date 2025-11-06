import { Dispatch, Todo } from '../reducer'
import { li, div, input, label, button, tag } from 'taggedjs'

// Performance boost to not render if props non-mutating props did not change
export const Item = tag((
  todo: Todo,
  dispatch: Dispatch,
  index: number,
) => {
  Item.updates(x => [todo,dispatch,index] = x)

  let editing = false
  return li({
      'class.completed': _=> todo.completed,
      'class.editing': _=> editing
    },
    _=> !editing ?
      div({class: "view"},
        input({
          class: "toggle",
          type: "checkbox",
          checked: _=> todo.completed,
          onChange: () => dispatch.toggleItem(todo, index)
        }),

        label({
          'data-testid': "todo-item-label",
          onDblClick: () => {
            editing = !editing
          }
        }, _=> todo.title),

        button({
          class: "destroy",
          onClick: () => dispatch.removeItemByIndex(index)
        })
      )
      :
      div({class: "input-container"},
        input({
          id: "edit-todo-input",
          type: "text",
          autoFocus: true,
          class: "edit",
          value: _=> todo.title,
          onBlur: () => editing = false,
          onKeyDown: e => handleKey(e, title => {
            handleUpdate(title, todo, index, dispatch)
            editing = false
          })
        }),
        label({class: "visually-hidden", htmlFor: "todo-input"},
          'Edit Todo Input'
        )
      )
  )
})

function handleUpdate(
  title: string,
  todo: Todo,
  index: number,
  dispatch: Dispatch,
) {
  if (title.length === 0) {
    dispatch.removeItem(todo.id)
    return
  }

  dispatch.updateToByIndex(todo, { title }, index)
}

export function handleKey(
  e: any,
  onValid: (title: string) => any,
) {
  if (e.key === "Enter") {
    const value = e.target.value.trim()
    onValid(value)
    return true
  }
};

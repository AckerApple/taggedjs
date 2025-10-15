import { Dispatch, Todo } from '../reducer.js'
import { tag, InputElementTargetEvent, li, div, input, label, button } from 'taggedjs'

export const Item = tag((
  todo: Todo,
  dispatch: Dispatch,
  index: number,
  onUpdated = (index: number) => index,
) => {
  Item.updates(x => {
    [todo, dispatch, index] = x
  })
  let editing = false
  return li(
    {
      class: _=> [
        todo.completed && 'completed',
        editing && 'editing'
      ].filter(Boolean).join(' ')
    },
    _=> !editing ? () =>
      div({class: "view"},
        _=> todo.completed && '✅',

        // toggle completed
        input({
          type: "button",
          onClick: (e: InputElementTargetEvent) => onUpdated(dispatch.toggleItem(todo, index)),
          value: "toggle"
        }),
      
        input({
          class: "toggle",
          type: "checkbox",
          checked: _=> todo.completed,
          onChange: () => onUpdated(dispatch.toggleItem(todo, index))
        }),
      
        label({
          'data-testid': "todo-item-label",
          onDoubleClick: () => editing = !editing
        }, _=> todo.title),

        button({
          class: "destroy",
          onClick: () => onUpdated(dispatch.removeItemByIndex(index))
        },'🗑️ destroy')
      )
    : () =>
      div({class: "input-container"},
        input({
          id: "edit-todo-input",
          type: "text",
          autofocus: true,
          class: "edit",
          value: todo.title,
          onBlur: () => editing = false,
          onKeydown: (e: InputElementTargetEvent) => handleKey(e, title => {
            handleUpdate(title, todo, index, dispatch)
            onUpdated(index)
            editing = false
          })
        }),
        label({
          class: "visually-hidden",
          for: "todo-input"
        }, 'Edit Todo Input')
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

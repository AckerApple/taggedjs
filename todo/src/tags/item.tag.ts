import { Dispatch, Todo } from '../reducer'
import { html, letState, tag } from "taggedjs"

// Performance boost to not render if props non-mutating props did not change
export const Item = tag.immutableProps((
  todo: Todo,
  dispatch: Dispatch,
  index: number,
) => (
  editing = letState(false)(x => [editing, editing = x]),
) => {
  return html`
    <li class.completed=${todo.completed} class.editing=${editing}>
      ${!editing ? html`
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange=${() => dispatch.toggleItem(todo, index)} />
          
          <label data-testid="todo-item-label" ondoubleclick=${() => editing = !editing}
          >${todo.title}</label>
          
          <button class="destroy" onclick=${() => dispatch.removeItemByIndex(index)}></button>
        </div>
      ` : html`
        <div class="input-container">
          <input id="edit-todo-input" type="text" autofocus class="edit"
            value=${todo.title}
            onblur=${() => editing = false}
            onKeyDown=${e => handleKey(e, title => {
              handleUpdate(title, todo, index, dispatch)
              editing = false
            })}
          />
          <label class="visually-hidden" htmlFor="todo-input">
            Edit Todo Input
          </label>
        </div>
      `}
    </li>
  `
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

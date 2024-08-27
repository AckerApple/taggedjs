import { Dispatch, Todo } from "../reducer.js";
import { html, tag } from "taggedjs";

export const Item = tag.immutableProps((
    todo: Todo,
    dispatch: Dispatch,
    index: number,
) => html`
    <li class.completed=${todo.completed} class.editing=${todo.editing}>
        ${!todo.editing ? html`
            <div class="view">
                <input type="button" onclick=${e => dispatch.toggleItem(todo, index)} value="toggle" />
                
                <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange=${e => dispatch.completeItem(todo, index)} />
                
                <label data-testid="todo-item-label" ondoubleclick=${() => dispatch.toggleEditItem(todo, index)}
                >${todo.title}</label>
                
                <button class="destroy" onclick=${() => dispatch.removeItemByIndex(index)}
                >destroy</button>
            </div>
        ` : html`
            <div class="input-container">
                <input id="edit-todo-input" type="text" autofocus class="edit"
                    value=${todo.title}
                    onblur=${() => dispatch.stopEditItem(todo, index)}
                    onKeyDown=${e => handleKey(e, title => handleUpdate(title, todo, index, dispatch))}
                />
                <label class="visually-hidden" htmlFor="todo-input">
                    Edit Todo Input
                </label>
            </div>
        `}
    </li>
`)

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

    dispatch.updateToByIndex(todo, {
        title,
        editing: false,
    }, index)
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

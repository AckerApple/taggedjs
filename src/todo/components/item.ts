import { Dispatch, Todo } from "../reducer.js";
import { states, html, tag } from "taggedjs";

export const Item = tag.immutableProps((
    todo: Todo,
    dispatch: Dispatch,
    index: number,
) => (
    editing = false,
    _ = states(get => [editing] = get(editing))
) => {
    return html`
        <li class.completed=${todo.completed} class.editing=${editing}>
            ${!editing ? html`
                <div class="view">
                    ${ todo.completed && '✅' }
                    <input type="button" onclick=${e => dispatch.toggleItem(todo, index)} value="toggle" />
                    
                    <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange=${() => dispatch.toggleItem(todo, index)} />
                    
                    <label data-testid="todo-item-label" ondoubleclick=${() => editing = !editing}
                    >${todo.title}</label>
                    
                    <button class="destroy" onclick=${() => dispatch.removeItemByIndex(index)}
                    >destroy</button>
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

import { html, letState, tag } from "taggedjs";
export const Item = (todo, dispatch, index) => tag.state = (editing = letState(false)(x => [editing, editing = x])) => html `
    <li class.completed=${todo.completed} class.editing=${todo.editing}>
        <div class="view">
            <input class="toggle" type="checkbox" checked=${todo.completed} onchange=${e => todo.completed = e.target.checked} />
            <label data-testid="todo-item-label" ondoubleclick=${() => editing = true}>${todo.title}</label>
            <button class="destroy" onclick=${() => dispatch.removeItemByIndex(index)}>destroy</button>
        </div>
        ${editing && html `            
            <div class="input-container">
                <input id="edit-todo-input" type="text" autofocus
                    value=${todo.title} onblur=${() => editing = false} onKeyDown=${e => handleKey(e, title => handleUpdate(title, todo, dispatch))}
                />
                <label class="visually-hidden" htmlFor="todo-input">
                    Edit Todo Input
                </label>
            </div>
        `}
    </li>
`;
function handleUpdate(title, todo, dispatch) {
    if (title.length === 0) {
        dispatch.removeItem(todo.id);
        return;
    }
    todo.title = title;
}
export function handleKey(e, onValid) {
    if (e.key === "Enter") {
        const value = e.target.value.trim();
        onValid(value);
        return true;
    }
}
;
//# sourceMappingURL=item.js.map
const classnames = (x: any) => ''

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";
import { html, letState, state, tag } from "taggedjs";

export const Item = tag((todo, dispatch, index) => {
    state('item') // helpful when debugging states
    let isWritable = letState(false)(x => [isWritable, isWritable = x]);
    let renderCount = letState(0)(x => [renderCount, renderCount = x]);
    const { title, completed, id } = todo;
    
    const toggleItem = () => dispatch({ type: TOGGLE_ITEM, payload: { id } });
    const removeItem = () => dispatch({ type: REMOVE_ITEM, payload: { id } });
    const updateItem = (id: string, title: string) => dispatch({ type: UPDATE_ITEM, payload: { id, title } });

    const handleDoubleClick = () => {
        isWritable = true
    };

    const handleBlur = () => isWritable = false;

    const handleUpdate = (title: string) => {
        if (title.length === 0)
            removeItem();
        else
            updateItem(id, title);

        isWritable = false

        return '44s'
    };

    ++renderCount

    return html`
        <li class=${classnames({ completed: todo.completed })} data-testid="todo-item">
            <div class="view">
                ${isWritable ?
                    html`${Input({onSubmit:handleUpdate, label:"Edit Todo Input", defaultValue:title, onBlur:handleBlur})} - ${title}` : html`
                    completed:${completed}
                    <input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=${completed} onChange=${toggleItem} />
                    <label data-testid="todo-item-label" onDblClick=${handleDoubleClick}>
                        ${title}
                    </label>
                    <button class="destroy" data-testid="todo-item-button" onClick=${removeItem}>delete</button>
                `}
            </div>
            item render count: ${renderCount}
        </li>
    `;
});

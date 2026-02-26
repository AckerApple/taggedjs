import { tag, li, div, input, label, button } from 'taggedjs';
export const Item = tag((todo, dispatch, index, onUpdated = (index) => index) => {
    Item.updates(x => {
        [todo, dispatch, index] = x;
    });
    let editing = false;
    return li.class(_ => [
        todo.completed && 'completed',
        editing && 'editing'
    ].filter(Boolean).join(' '))((_ => !editing ? div({ class: "view" }, _ => todo.completed && '✅', 
    // toggle completed
    input({
        type: "button",
        onClick: (e) => {
            return onUpdated(dispatch.toggleItem(todo, index));
        },
        value: "toggle"
    }), input({
        class: "toggle",
        type: "checkbox",
        checked: _ => todo.completed,
        onChange: () => onUpdated(dispatch.toggleItem(todo, index))
    }), label({
        'data-testid': "todo-item-label",
        onDoubleClick: () => editing = !editing
    }, _ => todo.title), button({
        class: "destroy",
        onClick: () => onUpdated(dispatch.removeItemByIndex(index))
    }, '🗑️ destroy'))
        : div({ class: "input-container" }, input({
            id: "edit-todo-input",
            type: "text",
            autofocus: true,
            class: "edit",
            value: todo.title,
            onBlur: () => editing = false,
            onKeydown: (e) => handleKey(e, title => {
                handleUpdate(title, todo, index, dispatch);
                editing = false;
                onUpdated(index);
            })
        }), label({
            class: "visually-hidden",
            for: "todo-input"
        }, 'Edit Todo Input'))));
});
//# sourceMappingURL=item.js.map
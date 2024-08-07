function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
export function todoReducer(todos) {
    function addItem(title) {
        todos.push({ id: uuid() /*nanoid()*/, title, completed: false });
        return todos;
    }
    function removeItem(id) {
        return todos.filter((t) => t.id !== id);
    }
    function removeItemByIndex(index) {
        todos.splice(index, 1);
        return todos;
    }
    function toggleItem(id) {
        const toggleIndex = todosIndexById(todos, id);
        if (toggleIndex >= -1) {
            todos[toggleIndex].completed = !todos[toggleIndex].completed;
        }
        return todos;
    }
    function removeAll() {
        todos = [];
        return todos;
    }
    function toggleAll(completed) {
        for (let index = todos.length - 1; index >= 0; --index) {
            todos[index].completed = completed; // !todos[index].completed
        }
        // update()
        return todos;
    }
    function removeCompleted() {
        for (let index = todos.length - 1; index >= 0; --index) {
            if (todos[index].completed) {
                todos.splice(index, 1);
            }
        }
        // update()
        return todos;
    }
    return {
        addItem,
        removeItem,
        toggleItem,
        removeAll,
        toggleAll,
        removeCompleted,
        removeItemByIndex,
    };
}
;
function todosIndexById(todos, id) {
    return todos.findIndex((todo) => todo.id === id);
}
//# sourceMappingURL=reducer.js.map
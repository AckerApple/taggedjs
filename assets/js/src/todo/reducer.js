function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
export function todoReducer(todos) {
    function addItem(title) {
        todos.push({ id: uuid(), title, completed: false });
        return todos;
    }
    function removeItem(id) {
        const index = todos.findIndex((t) => t.id !== id);
        return removeItemByIndex(index);
    }
    function removeItemByIndex(index) {
        todos.splice(index, 1);
        return index;
    }
    function toggleItem(todo, index) {
        return updateToByIndex(todo, { completed: !todo.completed }, index);
    }
    function removeAll() {
        // todos = []
        todos.length = 0;
        return todos;
    }
    function toggleAll(completed) {
        for (let index = todos.length - 1; index >= 0; --index) {
            todos[index] = {
                ...todos[index],
                completed,
            };
        }
        return todos;
    }
    function removeCompleted() {
        for (let index = todos.length - 1; index >= 0; --index) {
            if (todos[index].completed) {
                todos.splice(index, 1);
            }
        }
        return todos;
    }
    function updateToByIndex(todo, partial, index) {
        const newTodo = { ...todo, ...partial };
        todos[index] = newTodo;
        return index;
    }
    return {
        addItem,
        removeItem,
        toggleItem,
        removeAll,
        toggleAll,
        removeCompleted,
        removeItemByIndex,
        completeItem: function completeItem(todo, index) {
            return updateToByIndex(todo, { completed: true }, index);
        },
        updateItemByIndex: function updateItemByIndex(todo, index) {
            todos[index] = { ...todo };
            return todos;
        },
        updateToByIndex,
    };
}
;
//# sourceMappingURL=reducer.js.map
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export type Dispatch = ReturnType<typeof todoReducer>

export type Todo = {
    id: string
    title: string
    completed: boolean
}

export function todoReducer(todos: any) {
    function addItem(title: string) {
        todos.push({ id: uuid(), title, completed: false });
        return todos;
    }

    function removeItem(id: string) {
        return todos.filter((t: any) => t.id !== id);
    }

    function removeItemByIndex(index: number) {
        todos.splice(index, 1);
        return todos
    }

    function toggleItem(todo: Todo, index: number) {
        return updateToByIndex(todo, {completed: !todo.completed}, index)
    }

    function removeAll() {
        todos = []
        return todos;
    }

    function toggleAll(completed: boolean) {
        for (let index = todos.length - 1; index >= 0; --index) {
            todos[index] = {
                ...todos[index],
                completed,
            }
        }
        return todos;
    }

    function removeCompleted() {
        for (let index = todos.length - 1; index >= 0; --index) {
            if(todos[index].completed) {
                todos.splice(index,1)
            }
        }
        return todos;
    }
    
    function updateToByIndex(
        todo: Todo, partial: Partial<Todo>, index: number
    ) {
        todos[index] = { ...todo, ...partial }
        return todos
    }

    return {
        addItem,
        removeItem,
        toggleItem,
        removeAll,
        toggleAll,
        removeCompleted,
        removeItemByIndex,
        completeItem: function completeItem(todo: Todo, index: number) {
            return updateToByIndex(todo, {completed: true}, index)
        },
        updateItemByIndex: function updateItemByIndex(todo: Todo, index: number) {
            todos[index] = { ...todo }
            return todos
        },
        updateToByIndex,
    }
};

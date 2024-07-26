function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


export function todoReducer(todos: any) {
    function addItem(title: string) {
        todos.push({ id: uuid()/*nanoid()*/, title, completed: false });
        return todos;
    }

    function removeItem(id: string) {
        return todos.filter((t: any) => t.id !== id);
    }

    function removeItemByIndex(index: number) {
        todos.splice(index, 1);
        return todos
    }

    function toggleItem(id: string) {
        const toggleIndex = todosIndexById(todos, id)
        if(toggleIndex >= -1) {
            todos[toggleIndex].completed = !todos[toggleIndex].completed
        }
        return todos;
    }

    function removeAll() {
        todos = []
        return todos;
    }

    function toggleAll(completed: boolean) {
        for (let index = todos.length - 1; index >= 0; --index) {
            todos[index].completed = completed // !todos[index].completed
        }
        // update()
        return todos;
    }

    function removeCompleted() {
        for (let index = todos.length - 1; index >= 0; --index) {
            if(todos[index].completed) {
                todos.splice(index,1)
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
    }
};


function todosIndexById(todos: any[], id: string) {
    return todos.findIndex((todo: any) => todo.id === id);
}

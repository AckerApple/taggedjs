export type Dispatch = ReturnType<typeof todoReducer>;
export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};
export declare function todoReducer(todos: Todo[]): {
    addItem: (title: string) => Todo[];
    removeItem: (id: string) => Todo[];
    toggleItem: (todo: Todo, index: number) => Todo[];
    removeAll: () => Todo[];
    toggleAll: (completed: boolean) => Todo[];
    removeCompleted: () => Todo[];
    removeItemByIndex: (index: number) => Todo[];
    completeItem: (todo: Todo, index: number) => Todo[];
    updateItemByIndex: (todo: Todo, index: number) => Todo[];
    updateToByIndex: (todo: Todo, partial: Partial<Todo>, index: number) => Todo[];
};

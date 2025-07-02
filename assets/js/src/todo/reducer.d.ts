export type Dispatch = ReturnType<typeof todoReducer>;
export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};
export declare function todoReducer(todos: any): {
    addItem: (title: string) => any;
    removeItem: (id: string) => any;
    toggleItem: (todo: Todo, index: number) => any;
    removeAll: () => any;
    toggleAll: (completed: boolean) => any;
    removeCompleted: () => any;
    removeItemByIndex: (index: number) => any;
    completeItem: (todo: Todo, index: number) => any;
    updateItemByIndex: (todo: Todo, index: number) => any;
    updateToByIndex: (todo: Todo, partial: Partial<Todo>, index: number) => any;
};

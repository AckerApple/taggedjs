export type Dispatch = ReturnType<typeof todoReducer>;
export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};
export declare function todoReducer(todos: any[]): {
    addItem: (title: string) => any[];
    removeItem: (id: string) => number;
    toggleItem: (todo: Todo, index: number) => number;
    removeAll: () => any[];
    toggleAll: (completed: boolean) => any[];
    removeCompleted: () => any[];
    removeItemByIndex: (index: number) => number;
    completeItem: (todo: Todo, index: number) => number;
    updateItemByIndex: (todo: Todo, index: number) => any[];
    updateToByIndex: (todo: Todo, partial: Partial<Todo>, index: number) => number;
};

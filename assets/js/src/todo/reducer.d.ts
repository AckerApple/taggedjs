export declare function todoReducer(todos: any): {
    addItem: (title: string) => any;
    removeItem: (id: string) => any;
    toggleItem: (id: string) => any;
    removeAll: () => any;
    toggleAll: (completed: boolean) => any;
    removeCompleted: () => any;
    removeItemByIndex: (index: number) => any;
};

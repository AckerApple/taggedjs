import { Dispatch, Todo } from '../reducer.js';
export declare const Item: import("taggedjs").TaggedFunction<(todo: Todo, dispatch: Dispatch, index: number) => (editing?: boolean, _?: void) => import("taggedjs").Tag>;
export declare function handleKey(e: any, onValid: (title: string) => any): true | undefined;

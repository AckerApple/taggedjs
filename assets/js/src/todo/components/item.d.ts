import { Dispatch, Todo } from "../reducer.js";
export declare const Item: import("taggedjs").TaggedFunction<(todo: Todo, dispatch: Dispatch, index: number) => import("taggedjs").StringTag>;
export declare function handleKey(e: any, onValid: (title: string) => any): true | undefined;

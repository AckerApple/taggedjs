import { main } from "./funInProps.tag";
export declare const funInPropsChild: import("taggedjs").TaggedFunction<(arg0: {
    array: unknown[];
    addArrayItem: (x: any) => any;
    myFunction: () => any;
    deleteItem: (x: string) => any;
    child: {
        myChildFunction: () => any;
    };
}, mainProp: typeof main, myFunction3: () => any) => (other?: string, counter?: number, renderCount?: number, _?: number, { addArrayItem, myFunction, deleteItem, child, array }?: {
    array: unknown[];
    addArrayItem: (x: any) => any;
    myFunction: () => any;
    deleteItem: (x: string) => any;
    child: {
        myChildFunction: () => any;
    };
}) => import("taggedjs").StringTag>;

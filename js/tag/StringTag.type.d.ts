import { KeyFunction, Tag } from ".";
import { TagValues } from "./html";
export type StringTag = Tag & {
    children?: {
        strings: string[] | TemplateStringsArray;
        values: TagValues;
    };
    strings: string[];
    values: unknown[];
    key: KeyFunction;
    html: (strings: string[] | TemplateStringsArray, values: TagValues) => StringTag;
};

import { KeyFunction, TagJsComponent } from './index.js';
import { TagValues } from './html.js';
export type StringTag = TagJsComponent<any> & {
    children?: {
        strings: string[] | TemplateStringsArray;
        values: TagValues;
    };
    strings: string[];
    values: unknown[];
    key: KeyFunction;
    html: (strings: string[] | TemplateStringsArray, values: TagValues) => StringTag;
};

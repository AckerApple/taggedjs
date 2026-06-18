import { ValueSubject } from '../subject/index.js';
import { ReadOnlyVar } from '../TagJsTags/TagJsTag.type.js';
import { AnyTag } from './AnyTag.type.js';
import { ContextItem } from './ContextItem.type.js';
export declare class RouteQuery {
    get(_name: string): string | undefined;
}
export type RouteProps = {
    param: string;
    paramSubject: ValueSubject<string>;
    query: RouteQuery;
};
type BasicResponse = ReadOnlyVar | StateToTag | AnyTag | number | string | boolean | any[];
type TagResponse = BasicResponse | (() => BasicResponse);
export type SimpleToTag<T extends ((args: any) => any)> = ((...props: any[]) => ReturnType<T> | (TagResponse | ((_contextItem: ContextItem) => BasicResponse))[]);
export type Tag<T extends ((args: any) => any)> = SimpleToTag<T> | (() => SimpleToTag<T>);
export type ToTag<T extends ((args: any) => any)> = Tag<T>;
export type StateToTag = () => AnyTag;
export type RouteTag = (extraProps?: Record<string, any>) => AnyTag;
export {};

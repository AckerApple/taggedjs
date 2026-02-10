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
type BasicResponse = ReadOnlyVar | StateToTag | AnyTag | null | number | string | any[];
type TagResponse = BasicResponse | (() => BasicResponse);
export type SimpleToTag = ((...props: any[]) => TagResponse | (TagResponse | ((_contextItem: ContextItem) => any))[]);
export type ToTag = SimpleToTag | (() => SimpleToTag);
export type StateToTag = () => AnyTag | null;
export type RouteTag = (extraProps?: Record<string, any>) => AnyTag;
export {};

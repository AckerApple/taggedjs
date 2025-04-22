import { ValueSubject } from '../subject/index.js';
import { AnyTag } from './AnyTag.type.js';
export declare class RouteQuery {
    get(_name: string): string | undefined;
}
export type RouteProps = {
    param: string;
    paramSubject: ValueSubject<string>;
    query: RouteQuery;
};
export type ToTag = ((...props: any[]) => StateToTag | AnyTag | null) & {
    arrayValue?: unknown;
};
export type StateToTag = () => AnyTag | null;
export type RouteTag = (extraProps?: Record<string, any>) => AnyTag;

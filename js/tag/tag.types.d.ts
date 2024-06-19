import { ValueSubject } from '../subject/index.js';
import { Dom, Tag } from './Tag.class.js';
export declare class RouteQuery {
    get(name: string): string | undefined;
}
export type RouteProps = {
    param: string;
    paramSubject: ValueSubject<string>;
    query: RouteQuery;
};
export type ToTag = (...props: any[]) => StateToTag | Tag | Dom | null;
export type StateToTag = () => Tag | Dom | null;
export type RouteTag = (extraProps?: Record<string, any>) => Tag | Dom;

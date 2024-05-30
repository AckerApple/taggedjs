import { ValueSubject } from '../subject/index.js';
import { Tag } from './Tag.class.js';
export declare class RouteQuery {
    get(name: string): string | undefined;
}
export type RouteProps = {
    param: string;
    paramSubject: ValueSubject<string>;
    query: RouteQuery;
};
export type ToTag = (...props: any[]) => StateToTag | Tag;
export type StateToTag = () => Tag;
export type RouteTag = (extraProps?: Record<string, any>) => Tag;

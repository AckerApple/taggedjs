import { ValueSubject } from "../subject";
import { Tag } from "./Tag.class";
export declare class RouteQuery {
    get(name: string): string | undefined;
}
export type RouteProps = {
    param: string;
    paramSubject: ValueSubject<string>;
    query: RouteQuery;
};
export type ToTag = (...props: any[]) => StateToTag | Tag;
export type StateToTag = (...state: any[]) => Tag;
export type RouteTag = (extraProps?: Record<string, any>) => Tag;

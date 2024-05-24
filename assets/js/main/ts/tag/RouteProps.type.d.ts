declare class RouteQuery {
    get(name: string): string | undefined;
}
export type RouteProps = {
    param: string;
    query: RouteQuery;
};
export {};

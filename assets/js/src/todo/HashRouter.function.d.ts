import { ValueSubject } from "taggedjs";
/** Hook into browser window hash changes and cause state to render after change */
export declare const useHashRouter: () => {
    route: string;
    location: Location;
};
/** Hook into browser window hash changes and cause state to render after change */
export declare const hashRouterSubject: () => ValueSubject<{
    route: string;
    location: Location;
}>;

import { Tag } from './Tag.class';
import { RouteProps, RouteTag, StateToTag, ToTag } from './tag.types';
/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export declare function tag<T extends ToTag>(tagComponent: T): T & {
    original: Function;
};
export declare namespace tag {
    var oneRender: (...props: any[]) => Tag | StateToTag;
    var route: (routeProps: RouteProps) => StateToTag;
    var app: (routeTag: RouteTag) => StateToTag;
}

import { Tag } from './Tag.class';
import { RouteProps } from './RouteProps.type';
export type ToTag = (...props: any[]) => StateToTag | Tag;
export type ToStateToTag = (...props: any[]) => StateToTag;
export type StateToTag = (...state: any[]) => Tag;
/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export declare function tag<T extends ToTag>(tagComponent: T): T & {
    original: Function;
};
export declare namespace tag {
    var oneRender: (...props: any[]) => Tag | StateToTag;
    var route: (routeProps: RouteProps) => StateToTag;
}

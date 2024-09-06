import { DomTag, StringTag } from './Tag.class.js';
import { RouteProps, RouteTag, StateToTag, ToTag } from './tag.types.js';
export type TaggedFunction<T> = T & {
    original: Function;
};
export declare enum PropWatches {
    DEEP = "deep",
    SHALLOW = "shallow",
    NONE = "none",
    IMMUTABLE = "immutable"
}
/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export declare function tag<T extends ToTag>(tagComponent: T, propWatch?: PropWatches): TaggedFunction<T>;
export declare namespace tag {
    var renderOnce: () => ReturnTag;
    var state: () => ReturnTag;
    var route: (routeProps: RouteProps) => StateToTag;
    var key: typeof import("./key.js").key;
    var app: (routeTag: RouteTag) => StateToTag;
    var deepPropWatch: typeof tag;
    var immutableProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
    var watchProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
}
type ReturnTag = DomTag | StringTag | StateToTag | null | undefined;
export {};

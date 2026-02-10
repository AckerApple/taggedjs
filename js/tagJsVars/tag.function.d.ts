import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { RouteProps, RouteTag, StateToTag, ToTag } from '../tag/tag.types.js';
import { UnknownFunction } from '../tag/update/oneRenderToSupport.function.js';
import { AnyTag } from '../tag/AnyTag.type.js';
import { getElement as getTagElement } from '../tag/cycles/setContextInCycle.function.js';
import { tagInject } from './tagInject.function.js';
import { onInit as tagOnInit } from '../state/onInit.function.js';
import { onDestroy as tagOnDestroy } from '../state/onDestroy.function.js';
import { onRender as tagOnRender } from '../state/onRender.function.js';
import { getInnerHTML as tagGetInnerHTML, output as outputAlias, ProcessInit, AnySupport } from '../index.js';
import { ProcessDelete, TagJsTag, TagJsVar } from './tagJsVar.type.js';
declare const tagElement: {
    get: typeof getTagElement;
    onclick: <T extends (...args: any[]) => any>(toBeCalled: T) => T;
    click: <T extends (...args: any[]) => any>(toBeCalled: T) => T;
    onClick: <T extends (...args: any[]) => any>(toBeCalled: T) => T;
    mousedown: <T extends (...args: any[]) => any>(toBeCalled: T) => T;
    onmousedown: <T extends (...args: any[]) => any>(toBeCalled: T) => T;
    onMouseDown: <T extends (...args: any[]) => any>(toBeCalled: T) => T;
};
export type TagJsComponent<T extends ToTag> = TagJsTag & {
    tagJsType: 'component';
    values: unknown[];
    /** The true saved innerHTML variable */
    innerHTML?: any;
    _innerHTML?: TaggedFunction<any>;
    original: UnknownFunction;
    /** Process input/argument updates. Fires at start and on updates */
    inputs: (handler: (parameters: Parameters<T>) => any) => true;
    /** Process input/argument only on update cycles (not init) */
    updates: (handler: (parameters: Parameters<T>) => any) => true;
    /** Process input/argument updates */
    getInnerHTML: () => true;
    processInit: ProcessInit;
    destroy: ProcessDelete;
    templater?: TemplaterResult;
    ownerSupport?: AnySupport;
    debug?: boolean;
    /** used in array.map() */
    key: (arrayValue: unknown) => TagJsComponent<any>;
    arrayValue?: any;
    /** Used INSIDE a tag/function to signify that innerHTML is expected */
    acceptInnerHTML: (useTagVar: TagJsVar) => TagJsComponent<any>;
    /** Same as innerHTML = x */
    setHTML: (innerHTML: any) => TagJsComponent<any>;
};
export type TaggedFunction<T extends ToTag> = ((...x: Parameters<T>) => ReturnType<T>) & TagJsComponent<T>;
/** How to handle checking for prop changes aka argument changes */
export declare enum PropWatches {
    DEEP = "deep",
    /** checks all values up to 2 levels deep */
    SHALLOW = "shallow",
    NONE = "none",
    IMMUTABLE = "immutable"
}
/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export declare function tag<T extends ToTag>(tagComponent: T, propWatch?: PropWatches): TaggedFunction<T>;
export declare namespace tag {
    /** Used to declare a function has state in the form of a function, that when called, returns content for rendering
     * Example () => tag.use = (counter = 0)
     */
    let use: typeof tagUseFn;
    /** Used to create a tag component that renders once and has no addition rendering cycles */
    let renderOnce: typeof renderOnceFn;
    let route: typeof routeFn;
    let app: (_routeTag: RouteTag) => StateToTag;
    let deepPropWatch: typeof tag;
    /** monitors root and 1 level argument for exact changes */
    let immutableProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
    let watchProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
    let element: typeof tagElement;
    let inject: typeof tagInject;
    let output: typeof outputAlias;
    let onInit: typeof tagOnInit;
    let onDestroy: typeof tagOnDestroy;
    let onRender: typeof tagOnRender;
    let getInnerHTML: typeof tagGetInnerHTML;
    let promise: Promise<unknown>;
}
type ReturnTag = AnyTag | StateToTag | null | undefined;
/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
declare function routeFn(_routeProps: RouteProps): StateToTag;
declare function renderOnceFn(): ReturnTag;
/** Used to create variable scoping when calling a function that lives within a prop container function */
declare function tagUseFn(): ReturnTag;
export {};

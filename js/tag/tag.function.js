// taggedjs-no-compile
import { setUseMemory } from '../state/index.js';
import { getTemplaterResult } from './getTemplaterResult.function.js';
import { tags } from './tag.utils.js';
import { getTagWrap } from './getTagWrap.function.js';
import { ValueTypes } from './ValueTypes.enum.js';
let tagCount = 0;
export var PropWatches;
(function (PropWatches) {
    PropWatches["DEEP"] = "deep";
    PropWatches["SHALLOW"] = "shallow";
    PropWatches["NONE"] = "none";
    PropWatches["IMMUTABLE"] = "immutable";
})(PropWatches || (PropWatches = {}));
/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export function tag(tagComponent, propWatch = PropWatches.SHALLOW) {
    /** function developer triggers */
    const parentWrap = function tagWrapper(...props) {
        const templater = getTemplaterResult(propWatch, props);
        templater.tagJsType = ValueTypes.tagComponent;
        // attach memory back to original function that contains developer display logic
        const innerTagWrap = getTagWrap(templater, parentWrap);
        innerTagWrap.original = tagComponent;
        /*
            if(!innerTagWrap.parentWrap) {
              innerTagWrap.parentWrap = parentWrap as TagWrapper<unknown>
            }
        */
        templater.wrapper = innerTagWrap;
        return templater;
    }; // we override the function provided and pretend original is what's returned
    const tag = tagComponent;
    parentWrap.original = tagComponent;
    // group tags together and have hmr pickup
    tag.tags = tags;
    tag.setUse = setUseMemory;
    tag.ValueTypes = ValueTypes;
    tag.tagIndex = tagCount++; // needed for things like HMR
    tags.push(parentWrap);
    return parentWrap;
}
tag.renderOnce = renderOnceFn;
function renderOnceFn() {
    throw new Error('Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `');
}
/** Used to create variable scoping when calling a function that lives within a prop container function */
function tagUseFn() {
    throw new Error('Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `');
}
/** deprecated */
;
tag.state = tagUseFn;
tag.use = tagUseFn;
tag.route = routeFn;
function routeFn(_routeProps) {
    throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `');
}
/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
;
tag.app = function (_routeTag) {
    throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `');
};
tag.deepPropWatch = tag;
tag.immutableProps = function immutableProps(tagComponent) {
    return tag(tagComponent, PropWatches.IMMUTABLE);
};
tag.watchProps = function watchProps(tagComponent) {
    return tag(tagComponent, PropWatches.SHALLOW);
};
/* BELOW: Cast functions into setters with no getters */
Object.defineProperty(tag, 'renderOnce', {
    set(oneRenderFunction) {
        oneRenderFunction.tagJsType = ValueTypes.renderOnce;
    },
});
// TODO: deprecate this
Object.defineProperty(tag, 'state', {
    set(renderFunction) {
        ;
        renderFunction.original = {
            setUse: setUseMemory,
            tags,
        };
        renderFunction.tagJsType = ValueTypes.stateRender;
    },
});
Object.defineProperty(tag, 'use', {
    set(renderFunction) {
        ;
        renderFunction.original = {
            setUse: setUseMemory,
            tags,
        };
        renderFunction.tagJsType = ValueTypes.stateRender;
    },
});
//# sourceMappingURL=tag.function.js.map
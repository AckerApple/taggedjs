// taggedjs-no-compile
import { setUseMemory } from '../state/index.js';
import { getTemplaterResult } from '../tag/getTemplaterResult.function.js';
import { tags } from '../tag/tag.utils.js';
import { getTagWrap } from '../tag/getTagWrap.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { processRenderOnceInit } from '../render/update/processRenderOnceInit.function.js';
import { processTagComponentInit } from '../tag/update/processTagComponentInit.function.js';
import { checkTagValueChange, destroySupportByContextItem } from '../tag/checkTagValueChange.function.js';
let tagCount = 0;
/** How to handle checking for prop changes aka argument changes */
export var PropWatches;
(function (PropWatches) {
    PropWatches["DEEP"] = "deep";
    /** checks all values up to 2 levels deep */
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
        templater.processInit = processTagComponentInit;
        // attach memory back to original function that contains developer display logic
        const innerTagWrap = getTagWrap(templater, parentWrap);
        innerTagWrap.original = tagComponent;
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
/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
function routeFn(_routeProps) {
    throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `');
}
function renderOnceFn() {
    throw new Error('Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `');
}
/** Used to create variable scoping when calling a function that lives within a prop container function */
function tagUseFn() {
    throw new Error('Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `');
}
;
tag.renderOnce = renderOnceFn;
tag.use = tagUseFn;
tag.deepPropWatch = tag;
tag.route = routeFn;
tag.app = function (_routeTag) {
    throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `');
};
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
        oneRenderFunction.processInit = processRenderOnceInit;
        oneRenderFunction.delete = destroySupportByContextItem;
        oneRenderFunction.checkValueChange = function renderOnceNeverChanges() {
            return -1;
        };
    },
});
Object.defineProperty(tag, 'use', {
    set(renderFunction) {
        renderFunction.original = {
            setUse: setUseMemory,
            tags,
        };
        renderFunction.tagJsType = ValueTypes.stateRender;
        renderFunction.processInit = processTagComponentInit;
        renderFunction.checkValueChange = checkTagValueChange;
        renderFunction.delete = destroySupportByContextItem;
    },
});
//# sourceMappingURL=tag.function.js.map
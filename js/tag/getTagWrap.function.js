import { runTagCallback } from '../interpolations/bindSubjectCallback.function.js';
import { deepClone } from '../deepFunctions.js';
import { TagSupport } from './TagSupport.class.js';
import { alterProps } from '../alterProps.function.js';
/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export function getTagWrap(templater, result) {
    // this function gets called by taggedjs
    const wrapper = function (newTagSupport, subject) {
        const global = newTagSupport.global;
        ++global.renderCount;
        const childSubject = templater.children;
        const lastArray = global.oldest?.templater.children.lastArray;
        if (lastArray) {
            childSubject.lastArray = lastArray;
        }
        // result.original
        const originalFunction = result.original; // (innerTagWrap as any).original as unknown as TagComponent
        let props = templater.props;
        let castedProps = props.map(props => alterProps(props, newTagSupport.ownerTagSupport));
        const latestCloned = props.map(props => deepClone(props)); // castedProps
        // CALL ORIGINAL COMPONENT FUNCTION
        let tag = originalFunction(...castedProps);
        if (tag instanceof Function) {
            tag = tag();
        }
        tag.templater = templater;
        templater.tag = tag;
        const tagSupport = new TagSupport(templater, newTagSupport.ownerTagSupport, subject, global.renderCount);
        tagSupport.global = global;
        tagSupport.propsConfig = {
            latest: props,
            latestCloned,
            lastClonedKidValues: tagSupport.propsConfig.lastClonedKidValues,
        };
        tagSupport.memory = newTagSupport.memory; // state handover
        if (templater.madeChildIntoSubject) {
            const value = childSubject.value;
            for (let index = value.length - 1; index >= 0; --index) {
                const kid = value[index];
                const values = kid.values;
                for (let index = values.length - 1; index >= 0; --index) {
                    const value = values[index];
                    if (!(value instanceof Function)) {
                        continue;
                    }
                    const valuesValue = kid.values[index];
                    if (valuesValue.isChildOverride) {
                        continue; // already overwritten
                    }
                    // all functions need to report to me
                    kid.values[index] = function (...args) {
                        const ownerSupport = tagSupport.ownerTagSupport;
                        return runTagCallback(value, // callback
                        ownerSupport, this, // bindTo
                        args);
                    };
                    valuesValue.isChildOverride = true;
                }
            }
        }
        return tagSupport;
    };
    return wrapper;
}
//# sourceMappingURL=getTagWrap.function.js.map
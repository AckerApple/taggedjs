import { runTagCallback } from '../interpolations/bindSubjectCallback.function.js';
import { Support } from './Support.class.js';
import { castProps } from '../alterProp.function.js';
import { setUse } from '../state/setUse.function.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { html } from './html.js';
import { syncFunctionProps } from './update/updateExistingTagComponent.function.js';
/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export function getTagWrap(templater, result) {
    const stateArray = setUse.memory.stateConfig.array;
    // this function gets called by taggedjs
    const wrapper = (newSupport, subject, lastSupport) => executeWrap(stateArray, templater, result, newSupport, subject, lastSupport);
    return wrapper;
}
function executeWrap(stateArray, templater, result, newSupport, subject, lastSupport) {
    const global = newSupport.subject.global;
    ++global.renderCount;
    const childSubject = templater.children;
    const lastArray = global.oldest?.templater.children.lastArray;
    if (lastArray) {
        childSubject.lastArray = lastArray;
    }
    // result.original
    const originalFunction = result.original; // (innerTagWrap as any).original as unknown as TagComponent
    let props = templater.props;
    // When defined, this must be an update where my new props have already been made for me
    let preCastedProps = newSupport.propsConfig.castProps;
    const lastCastProps = lastSupport?.propsConfig.castProps;
    if (lastCastProps) {
        newSupport.propsConfig.castProps = lastCastProps;
        preCastedProps = syncFunctionProps(newSupport, lastSupport, lastSupport.ownerSupport, props);
    }
    const castedProps = preCastedProps || castProps(props, newSupport, stateArray, 0);
    // CALL ORIGINAL COMPONENT FUNCTION
    let tag = originalFunction(...castedProps);
    if (tag instanceof Function) {
        tag = tag();
    }
    const unknown = !tag || (tag.tagJsType && ![ValueTypes.tag, ValueTypes.dom].includes(tag.tagJsType));
    if (unknown) {
        tag = html `${tag}`; // component returned a non-component value
    }
    tag.templater = templater;
    templater.tag = tag;
    tag.arrayValue = templater.arrayValue; // tag component could have been used in array.map
    const support = new Support(templater, newSupport.ownerSupport, subject, castedProps, global.renderCount);
    support.subject.global = global;
    // ??? this should be set by outside?
    global.oldest = global.oldest || support;
    // ??? new - removed
    // global.newest = support
    const nowState = setUse.memory.stateConfig.array;
    support.state.push(...nowState);
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
                    return runTagCallback(value, // callback
                    support.ownerSupport, this, // bindTo
                    args, support.state);
                };
                valuesValue.isChildOverride = true;
            }
        }
    }
    return support;
}
//# sourceMappingURL=getTagWrap.function.js.map
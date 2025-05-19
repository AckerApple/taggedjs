import { isInlineHtml, renderInlineHtml } from '../../render/renderSupport.function.js';
import { renderExistingReadyTag } from '../../render/renderExistingTag.function.js';
import { getSupportInCycle } from '../getSupportInCycle.function.js';
import { deepCompareDepth } from '../hasSupportChanged.function.js';
import { isArray, isStaticTag } from '../../isInstance.js';
import { BasicTypes } from '../ValueTypes.enum.js';
import { setUseMemory } from '../../state/index.js';
export function castProps(props, newSupport, depth) {
    return props.map(function eachCastProp(prop) {
        return alterProp(prop, newSupport.ownerSupport, newSupport, depth);
    });
}
/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
function alterProp(prop, ownerSupport, newSupport, depth) {
    if (isStaticTag(prop) || !prop) {
        return prop;
    }
    if (!ownerSupport) {
        return prop; // no one above me
    }
    return checkProp(prop, ownerSupport, newSupport, depth);
}
export function checkProp(value, ownerSupport, newSupport, depth, owner, keyName) {
    if (!value) {
        return value;
    }
    if (value.tagJsType) {
        return value;
    }
    if (typeof (value) === BasicTypes.function) {
        if (depth <= 1) {
            // only wrap function at depth 0 and 1
            return getPropWrap(value, owner, ownerSupport, keyName);
        }
        return value;
    }
    if (depth === deepCompareDepth) {
        return value;
    }
    const skip = isSkipPropValue(value);
    if (skip) {
        return value; // no children to crawl through
    }
    if (isArray(value)) {
        return checkArrayProp(value, newSupport, ownerSupport, depth);
    }
    return checkObjectProp(value, newSupport, ownerSupport, depth);
}
function checkArrayProp(value, newSupport, ownerSupport, depth) {
    for (let index = value.length - 1; index >= 0; --index) {
        const subValue = value[index];
        value[index] = checkProp(subValue, ownerSupport, newSupport, depth + 1, value);
        if (typeof (subValue) === BasicTypes.function) {
            if (subValue.mem) {
                continue;
            }
            afterCheckProp(depth + 1, index, subValue, value, newSupport);
        }
    }
    return value;
}
function checkObjectProp(value, newSupport, ownerSupport, depth) {
    const keys = Object.keys(value);
    for (const name of keys) {
        const subValue = value[name];
        const result = checkProp(subValue, ownerSupport, newSupport, depth + 1, value, name);
        const newSubValue = value[name];
        if (newSubValue === result) {
            continue;
        }
        const getset = Object.getOwnPropertyDescriptor(value, name);
        const hasSetter = getset?.get || getset?.set;
        if (hasSetter) {
            continue;
        }
        value[name] = result;
        if (typeof (result) === BasicTypes.function) {
            if (subValue.mem) {
                continue;
            }
            afterCheckProp(depth + 1, name, subValue, value, newSupport);
        }
    }
    return value;
}
function afterCheckProp(depth, index, originalValue, newProp, newSupport) {
    // restore object to have original function on destroy
    if (depth > 0) {
        const global = newSupport.subject.global;
        newProp[index].subscription = global.destroy$.toCallback(function alterCheckProcessor() {
            newProp[index] = originalValue;
        });
    }
}
export function getPropWrap(value, owner, ownerSupport, keyName) {
    const already = value.mem;
    // already previously converted by a parent?
    if (already) {
        return value;
    }
    const wrap = function wrapRunner(...args) {
        return callbackPropOwner(wrap.mem, owner, args, ownerSupport, keyName);
    }; // what gets called can switch over parent state changes
    wrap.original = value;
    wrap.mem = value;
    // copy data properties that maybe on source function
    Object.assign(wrap, value);
    return wrap;
}
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export function callbackPropOwner(toCall, // original function
owner, callWith, ownerSupport, // <-- WHEN called from alterProp its owner OTHERWISE its previous
keyName) {
    const global = ownerSupport.subject.global;
    const newest = global?.newest || ownerSupport;
    const supportInCycle = getSupportInCycle();
    const noCycle = supportInCycle === undefined;
    // actual function call to original method
    const callbackResult = toCall.apply(owner, callWith);
    const run = function propCallbackProcessor() {
        const global = newest.subject.global;
        if (!global || global.locked === true) {
            return callbackResult; // currently in the middle of rendering
        }
        safeRenderSupport(newest, ownerSupport);
        return callbackResult;
    };
    if (noCycle) {
        return run();
    }
    setUseMemory.tagClosed$.toCallback(run);
    return callbackResult;
}
export function isSkipPropValue(value) {
    return typeof (value) !== BasicTypes.object || !value || value.tagJsType;
}
export function safeRenderSupport(newest, ownerSupport) {
    const subject = newest.subject;
    const isInline = isInlineHtml(newest.templater);
    if (isInline) {
        const result = renderInlineHtml(ownerSupport, newest);
        return result;
    }
    const global = subject.global;
    global.locked = true;
    renderExistingReadyTag(global.newest, newest, ownerSupport, subject);
    delete global.locked;
}
//# sourceMappingURL=alterProp.function.js.map
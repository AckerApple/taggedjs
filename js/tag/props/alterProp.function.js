import { getSupportInCycle } from '../cycles/getSupportInCycle.function.js';
import { deepCompareDepth } from '../hasSupportChanged.function.js';
import { isArray, isStaticTag } from '../../isInstance.js';
import { BasicTypes } from '../ValueTypes.enum.js';
import { setUseMemory } from '../../state/index.js';
import { safeRenderSupport } from './safeRenderSupport.function.js';
export function castProps(props, newSupport, currentDepth) {
    return props;
    return props.map(function eachCastProp(prop, pos) {
        return alterProp(prop, newSupport.ownerSupport, newSupport, currentDepth, pos);
    });
}
/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
function alterProp(prop, ownerSupport, newSupport, depth, pos // arguments position
) {
    if (isStaticTag(prop) || !prop) {
        return prop;
    }
    if (!ownerSupport) {
        return prop; // no one above me
    }
    return checkProp(prop, ownerSupport, newSupport, depth, pos);
}
export function checkProp(value, ownerSupport, newSupport, depth, pos, owner) {
    if (!value) {
        return value;
    }
    if (value.tagJsType) {
        return value;
    }
    if (typeof (value) === BasicTypes.function) {
        if (depth <= 1) {
            // only wrap function at depth 0 and 1
            return getPropWrap(value, owner, ownerSupport);
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
        return checkArrayProp(value, newSupport, ownerSupport, depth, pos);
    }
    return checkObjectProp(value, newSupport, ownerSupport, depth, pos);
}
function checkArrayProp(value, newSupport, ownerSupport, depth, pos) {
    for (let index = value.length - 1; index >= 0; --index) {
        const subValue = value[index];
        value[index] = checkProp(subValue, ownerSupport, newSupport, depth + 1, pos, value);
        if (typeof (subValue) === BasicTypes.function) {
            if (subValue.mem) {
                continue;
            }
            afterCheckProp(depth + 1, index, subValue, value, newSupport, pos);
        }
    }
    return value;
}
function checkObjectProp(value, newSupport, ownerSupport, depth, pos // argument position
) {
    const keys = Object.keys(value);
    for (const name of keys) {
        const subValue = value[name];
        const result = checkProp(subValue, ownerSupport, newSupport, depth + 1, pos, value);
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
            afterCheckProp(depth + 1, name, subValue, value, newSupport, pos);
        }
    }
    return value;
}
function afterCheckProp(depth, index, originalValue, newProp, newSupport, pos) {
    // restore object to have original function on destroy
    if (depth <= 0) {
        return;
    }
    const context = newSupport.context;
    const castedProps = context.value?.props;
    if (castedProps) {
        // check for old prop subscription
        const prop = castedProps[pos][index];
        if (prop?.subscription) {
            prop.subscription(); // unsubscribe to prevent this old argument/prop from being called on destroy
            prop.restore(); // put original value back
        }
    }
    const altPropRestore = () => {
        newProp[index] = originalValue;
    };
    newProp[index].subscription = newSupport.context.destroy$.toCallback(altPropRestore);
    newProp[index].restore = altPropRestore;
}
export function getPropWrap(value, owner, ownerSupport) {
    const already = value.mem;
    // already previously converted by a parent?
    if (already) {
        return value;
    }
    const wrap = function wrapRunner(...args) {
        return callbackPropOwner(wrap.mem, owner, args, ownerSupport);
    }; // what gets called can switch over parent state changes
    wrap.original = value;
    wrap.mem = value;
    // copy data properties that maybe on source function
    Object.assign(wrap, value);
    return wrap;
}
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export function callbackPropOwner(toCall, // original function
owner, callWith, ownerSupport) {
    const ownerContext = ownerSupport.context;
    const newest = ownerContext.state?.newest || ownerSupport;
    const supportInCycle = getSupportInCycle();
    const noCycle = supportInCycle === undefined;
    // actual function call to original method
    const callbackResult = toCall.apply(owner, callWith);
    const run = function propCallbackProcessor() {
        const context = newest.context;
        const global = context.global;
        if (context.locked) {
            return callbackResult; // currently in the middle of rendering
        }
        if (!global) {
            /*
            context.tagJsVar.processUpdate(
              context.value,
              context,
              ownerSupport,
              [],
            )
      */
            ownerContext.tagJsVar.processUpdate(ownerContext.value, ownerContext, ownerSupport, []);
            return callbackResult; // currently in the middle of rendering
        }
        safeRenderSupport(newest);
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
//# sourceMappingURL=alterProp.function.js.map
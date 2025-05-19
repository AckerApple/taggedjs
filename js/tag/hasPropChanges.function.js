import { deepEqual } from '../deepFunctions.js';
import { deepCompareDepth, immutablePropMatch, shallowPropMatch } from './hasSupportChanged.function.js';
import { hasPropLengthsChanged } from '../render/renderSupport.function.js';
import { PropWatches } from './tag.function.js';
import { BasicTypes } from './ValueTypes.enum.js';
/**
 *
 * @param props
 * @param pastCloneProps
 * @returns WHEN number then props have changed. WHEN false props have not changed
 */
export function hasPropChanges(props, // natural props
pastCloneProps, // previously cloned props
propWatch) {
    const hasLenChanged = hasPropLengthsChanged(props, pastCloneProps);
    if (hasLenChanged) {
        return 11;
    }
    switch (propWatch) {
        case PropWatches.NONE:
            return 1; // always render
        case PropWatches.SHALLOW: // determining equal is same as immutable, its the previous cloning step thats different
            return shallowPropMatch(props, pastCloneProps);
        case PropWatches.IMMUTABLE:
            return immutablePropMatch(props, pastCloneProps);
    }
    return deepPropChangeCompare(props, pastCloneProps);
}
function deepPropChangeCompare(props, pastCloneProps) {
    // DEEP watch
    let castedProps = props;
    let castedPastProps = pastCloneProps;
    castedProps = [...props];
    castedPastProps = [...(pastCloneProps || [])];
    const allFunctionsMatch = castedProps.every((value, index) => onePropCompare(value, index, castedProps, castedPastProps));
    if (!allFunctionsMatch) {
        return 7; // a change has been detected by function comparisons
    }
    return false;
}
function onePropCompare(value, index, castedProps, castedPastProps) {
    const compare = castedPastProps[index];
    if (typeof (value) === BasicTypes.object) {
        const subCastedProps = { ...value };
        const subCompareProps = { ...compare || {} };
        const matched = Object.entries(subCastedProps).every(([key, value]) => compareProps(value, subCompareProps[key], () => {
            delete subCastedProps[key]; // its a function and not needed to be compared
            delete subCompareProps[key]; // its a function and not needed to be compared
        }));
        return matched;
    }
    return compareProps(value, compare, function propComparer() {
        castedProps.splice(index, 1);
        castedPastProps.splice(index, 1);
    });
}
/** returning a number means true good comparison */
function compareProps(value, compare, onDelete) {
    if (!(typeof (value) === BasicTypes.function)) {
        return deepEqual(value, compare, deepCompareDepth) ? 4 : false;
    }
    const compareFn = compare;
    if (!(typeof (compareFn) === BasicTypes.function)) {
        return false; // its a function now but was not before
    }
    // ensure we are comparing apples to apples as function get wrapped
    const compareOriginal = compare?.original;
    if (compareOriginal) {
        compare = compareOriginal;
    }
    const original = value.original;
    if (original) {
        value = value.original;
    }
    const valueString = value.toString();
    const compareString = compare.toString();
    if (valueString === compareString) {
        onDelete();
        return 5; // both are function the same
    }
    onDelete();
    return 6;
}
//# sourceMappingURL=hasPropChanges.function.js.map
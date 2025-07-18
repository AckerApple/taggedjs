import { deepEqual } from '../deepFunctions.js'
import { Props } from '../Props.js'
import { deepCompareDepth, immutablePropMatch } from './hasSupportChanged.function.js'
import { shallowPropMatch } from './shallowPropMatch.function.js'
import { hasPropLengthsChanged } from '../render/renderSupport.function.js'
import { PropWatches } from '../tagJsVars/tag.function.js'
import { UnknownFunction } from './update/oneRenderToSupport.function.js'
import { BasicTypes } from './ValueTypes.enum.js'

/**
 * 
 * @param props 
 * @param pastCloneProps 
 * @returns WHEN number then props have changed. WHEN false props have not changed
 */
export function hasPropChanges(
  props: Props, // natural props
  pastCloneProps: Props, // previously cloned props
  propWatch: PropWatches,
): number | false {
  const hasLenChanged = hasPropLengthsChanged(props, pastCloneProps)

  if(hasLenChanged) {
    return 11
  }

  switch (propWatch) {
    case PropWatches.NONE:
      return 1 // always render

    case PropWatches.SHALLOW: // determining equal is same as immutable, its the previous cloning step thats different
      return shallowPropMatch(props, pastCloneProps)

    case PropWatches.IMMUTABLE:
      return immutablePropMatch(props, pastCloneProps)
  }

  return deepPropChangeCompare(props, pastCloneProps)
}

function deepPropChangeCompare(
  props: Props,
  pastCloneProps: Props,

) {
  // DEEP watch
  let castedProps: Props = props
  let castedPastProps: Props = pastCloneProps

  castedProps = [...props]
  castedPastProps = [...(pastCloneProps || [])]

  const allFunctionsMatch = castedProps.every((value, index) =>
    onePropCompare(value, index, castedProps, castedPastProps)
  )

  if(!allFunctionsMatch) {
    return 7 // a change has been detected by function comparisons
  }
  
  return false
}


function onePropCompare(
  value: any,
  index: number,
  castedProps: Props,
  castedPastProps: Props,
) {
  const compare = castedPastProps[index]

  if(typeof(value) === BasicTypes.object) {
    const subCastedProps = {...value}
    const subCompareProps = {...compare || {}} as any
    const matched = Object.entries(subCastedProps).every(([key, value]) =>
      compareProps(value, subCompareProps[key], () => {
        delete subCastedProps[key] // its a function and not needed to be compared
        delete subCompareProps[key] // its a function and not needed to be compared
      })
    )
    return matched
  }

  return compareProps(value, compare, function propComparer() {
    castedProps.splice(index, 1)
    castedPastProps.splice(index, 1)
  })
}

/** returning a number means true good comparison */
function compareProps(
  value: unknown,
  compare: unknown,
  onDelete: () => any,
) {
  if(!(typeof(value) === BasicTypes.function)) {
    return deepEqual(value, compare, deepCompareDepth) ? 4 : false
  }

  const compareFn = compare as UnknownFunction
  if(!(typeof(compareFn) === BasicTypes.function)) {
    return false // its a function now but was not before
  }

  // ensure we are comparing apples to apples as function get wrapped
  const compareOriginal = (compare as any)?.original
  if(compareOriginal) {
    compare = compareOriginal
  }

  const original = (value as any).original
  if(original) {
    value = (value as any).original
  }
  
  const valueString = (value as any).toString()
  const compareString = (compare as any).toString()
  if(valueString === compareString) {
    onDelete()
    return 5 // both are function the same
  }

  onDelete()

  return 6
}

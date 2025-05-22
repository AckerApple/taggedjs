// taggedjs-no-compile

import { KeyFunction } from '../tag/getDomTag.function.js'
import type { StringTag } from '../tag/StringTag.type.js'
import { setUseMemory } from '../state/index.js'
import { getTemplaterResult, TemplaterResult, Wrapper } from '../tag/getTemplaterResult.function.js'
import { Original, TagComponent, TagWrapper, tags } from '../tag/tag.utils.js'
import { getTagWrap } from '../tag/getTagWrap.function.js'
import { RouteProps, RouteTag, StateToTag, ToTag } from '../tag/tag.types.js'
import { UnknownFunction } from '../tag/update/oneRenderToSupport.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { AnyTag } from '../tag/AnyTag.type.js'
import { processRenderOnceInit } from '../render/update/processRenderOnceInit.function.js'
import { processTagComponentInit } from '../tag/update/processTagComponentInit.function.js'
import { checkTagValueChange, destroySupportByContextItem } from '../tag/checkTagValueChange.function.js'

let tagCount = 0

/** TODO: This might be a duplicate typing of Wrapper */
export type TaggedFunction<T extends ToTag> = ((...x:Parameters<T>) => ReturnType<T> & {
  key: KeyFunction
  original?: Original
  compareTo?: string
}) & { original: UnknownFunction }

/** How to handle checking for prop changes aka argument changes */
export enum PropWatches {
  DEEP = 'deep',
  
  /** checks all values up to 2 levels deep */
  SHALLOW = 'shallow',
  
  NONE = 'none',
  IMMUTABLE = 'immutable'
}

/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export function tag<T extends ToTag>(
  tagComponent: T,
  propWatch: PropWatches = PropWatches.SHALLOW, // PropWatches.DEEP,
): TaggedFunction<T> {
  /** function developer triggers */
  const parentWrap = function tagWrapper(
    ...props: (T | StringTag | StringTag[])[]
  ): TemplaterResult {
    const templater: TemplaterResult = getTemplaterResult(propWatch, props)
    
    templater.tagJsType = ValueTypes.tagComponent
    templater.processInit = processTagComponentInit
    
    // attach memory back to original function that contains developer display logic
    const innerTagWrap: Wrapper = getTagWrap(
      templater,
      parentWrap
    )

    innerTagWrap.original = tagComponent as any
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  } as TagWrapper<T>// we override the function provided and pretend original is what's returned
  
  const tag = tagComponent as unknown as TagComponent
  parentWrap.original = tagComponent as unknown as Original

  // group tags together and have hmr pickup
  tag.tags = tags
  tag.setUse = setUseMemory
  tag.ValueTypes = ValueTypes
  tag.tagIndex = tagCount++ // needed for things like HMR
  tags.push(parentWrap as TagWrapper<unknown>)

  return parentWrap as unknown as TaggedFunction<T>
}

// Used to declare all the variable attachments on the "tag" function
// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace tag {
  /** Used to declare a function has state in the form of a function, that when called, returns content for rendering
   * Example () => tag.use = (counter = 0)
   */
  let use: typeof tagUseFn

  /** Used to create a tag component that renders once and has no addition rendering cycles */
  let renderOnce: typeof renderOnceFn
  let route: typeof routeFn;
  let app: (_routeTag: RouteTag) => StateToTag;
  let deepPropWatch: typeof tag;
  let immutableProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
  let watchProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
}

type ReturnTag = AnyTag | StateToTag | null | undefined

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
function routeFn(_routeProps: RouteProps): StateToTag {
  throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

function renderOnceFn(): ReturnTag {
  throw new Error('Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `')
}

/** Used to create variable scoping when calling a function that lives within a prop container function */
function tagUseFn(): ReturnTag {
  throw new Error('Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `')
}

;(tag as any).renderOnce = renderOnceFn
;(tag as any).use = tagUseFn
;(tag as any).deepPropWatch = tag
;(tag as any).route = routeFn

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
;(tag as any).app = function(_routeTag: RouteTag): StateToTag {
  throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

;(tag as any).immutableProps = function immutableProps<T extends ToTag>(
  tagComponent: T,
): TaggedFunction<T> {
  return tag(tagComponent, PropWatches.IMMUTABLE)
}

;(tag as any).watchProps = function watchProps<T extends ToTag>(
  tagComponent: T,
): TaggedFunction<T> {
  return tag(tagComponent, PropWatches.SHALLOW)
}

/* BELOW: Cast functions into setters with no getters */

Object.defineProperty(tag, 'renderOnce', {
  set(oneRenderFunction: Wrapper) {
    oneRenderFunction.tagJsType = ValueTypes.renderOnce
    oneRenderFunction.processInit = processRenderOnceInit
    oneRenderFunction.delete = destroySupportByContextItem
    oneRenderFunction.checkValueChange = function renderOnceNeverChanges() {
      return -1
    }
  },
})

Object.defineProperty(tag, 'use', {
  set(renderFunction: Wrapper) {
    renderFunction.original = {
      setUse: setUseMemory,
      tags,
    } as unknown as Original
    renderFunction.tagJsType = ValueTypes.stateRender
    renderFunction.processInit = processTagComponentInit
    renderFunction.checkValueChange = checkTagValueChange
    renderFunction.delete = destroySupportByContextItem
  },
})

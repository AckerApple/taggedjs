// taggedjs-no-compile

import { DomTag, KeyFunction, StringTag } from './Tag.class.js'
import { setUseMemory } from '../state/index.js'
import { getTemplaterResult, TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { Original, TagComponent, TagWrapper, tags } from './tag.utils.js'
import { getTagWrap } from './getTagWrap.function.js'
import { RouteProps, RouteTag, StateToTag, ToTag } from './tag.types.js'
import { UnknownFunction } from './update/oneRenderToSupport.function.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { key } from './key.js'

let tagCount = 0

/** TODO: This might be a duplicate typing of Wrapper */
export type TaggedFunction<T extends ToTag> = ((...x:Parameters<T>) => ReturnType<T> & {
  key: KeyFunction
  original?: Original
  compareTo?: string
}) & { original: UnknownFunction }

export enum PropWatches {
  DEEP = 'deep',
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
    
    // attach memory back to original function that contains developer display logic
    const innerTagWrap: Wrapper = getTagWrap(
      templater,
      parentWrap
    )

    innerTagWrap.original = tagComponent as any
/*
    if(!innerTagWrap.parentWrap) {
      innerTagWrap.parentWrap = parentWrap as TagWrapper<unknown>
    }
*/
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

type ReturnTag = DomTag | StringTag | StateToTag | null | undefined

;(tag as any).renderOnce = renderOnceFn
function renderOnceFn(): ReturnTag {
  throw new Error('Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `')
}

/** Used to create variable scoping when calling a function that lives within a prop container function */
function tagUseFn(): ReturnTag {
  throw new Error('Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `')
}

/** deprecated */
;(tag as any).state = tagUseFn
;(tag as any).use = tagUseFn

// TODO???: Is tag.route and tag.app in use?

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
;(tag as any).route = routeFn
function routeFn(_routeProps: RouteProps): StateToTag {
  throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

;(tag as any).key = key

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
;(tag as any).app = function(_routeTag: RouteTag): StateToTag {
  throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

;(tag as any).deepPropWatch = tag

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
  set(oneRenderFunction: UnknownFunction) {
    (oneRenderFunction as Wrapper).tagJsType = ValueTypes.renderOnce
  },
})

// TODO: deprecate this
Object.defineProperty(tag, 'state', {
  set(renderFunction: UnknownFunction) {
    ;(renderFunction as Wrapper).original = {
      setUse: setUseMemory,
      tags,
    } as unknown as Original
    ;(renderFunction as Wrapper).tagJsType = ValueTypes.stateRender
  },
})

Object.defineProperty(tag, 'use', {
  set(renderFunction: UnknownFunction) {
    ;(renderFunction as Wrapper).original = {
      setUse: setUseMemory,
      tags,
    } as unknown as Original
    ;(renderFunction as Wrapper).tagJsType = ValueTypes.stateRender
  },
})

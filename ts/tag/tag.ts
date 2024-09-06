// taggedjs-no-compile

import { DomTag, StringTag } from './Tag.class.js'
import { setUseMemory } from '../state/index.js'
import { getTemplaterResult, TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { Original, TagComponent, TagWrapper, tags } from './tag.utils.js'
import { getTagWrap } from './getTagWrap.function.js'
import { RouteProps, RouteTag, StateToTag, ToTag } from './tag.types.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { key } from './key.js'

let tagCount = 0

export type TaggedFunction<T> = T & { original: Function }

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
  const parentWrap = (function tagWrapper(
    ...props: (T | StringTag | StringTag[])[]
  ): TemplaterResult {
    const templater: TemplaterResult = getTemplaterResult(propWatch, props)
    templater.tagJsType = ValueTypes.tagComponent
    
    // attach memory back to original function that contains developer display logic
    const innerTagWrap: Wrapper = getTagWrap(
      templater,
      parentWrap
    )

    if(!innerTagWrap.parentWrap) {
      innerTagWrap.parentWrap = parentWrap
    }
    
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  }) as TagWrapper<T>// we override the function provided and pretend original is what's returned
  
  ;(parentWrap as any).original = tagComponent
  // parentWrap.compareTo = (tagComponent as any).toString()

  const tag = tagComponent as unknown as TagComponent
  parentWrap.original = tag as any as Original

  // group tags together and have hmr pickup
  tag.tags = tags
  tag.setUse = setUseMemory
  tag.ValueTypes = ValueTypes
  tag.tagIndex = tagCount++ // needed for things like HMR
  tags.push(parentWrap)

  return parentWrap as TaggedFunction<any>
}

type ReturnTag = DomTag | StringTag | StateToTag | null | undefined

/** Used to create a tag component that renders once and has no addition rendering cycles */
tag.renderOnce = function(): ReturnTag {
  throw new Error('Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `')
}

/** Used to create variable scoping when calling a function that lives within a prop container function */
tag.state = function(): ReturnTag {
  throw new Error('Do not call tag.state as a function but instead set it as: `(props) => tag.state = (state) => html`` `')
}

// TODO???: Is tag.route and tag.app in use?

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
tag.route = function(routeProps: RouteProps): StateToTag {
  throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

tag.key = key

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
tag.app = function(routeTag: RouteTag): StateToTag {
  throw new Error('Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

tag.deepPropWatch = tag

tag.immutableProps = function immutableProps<T extends ToTag>(
  tagComponent: T,
): TaggedFunction<T> {
  return tag(tagComponent, PropWatches.IMMUTABLE)
}

tag.watchProps = function watchProps<T extends ToTag>(
  tagComponent: T,
): TaggedFunction<T> {
  return tag(tagComponent, PropWatches.SHALLOW)
}

Object.defineProperty(tag, 'renderOnce', {
  set(oneRenderFunction: Function) {
    (oneRenderFunction as Wrapper).tagJsType = ValueTypes.renderOnce
  },
})

Object.defineProperty(tag, 'state', {
  set(renderFunction: Function) {
    ;(renderFunction as Wrapper).parentWrap = {
      original: {
        setUse: setUseMemory,
        tags,
      } as any as Original
    } as TagWrapper<any>
    ;(renderFunction as Wrapper).tagJsType = ValueTypes.stateRender
  },
})

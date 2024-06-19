// taggedjs-no-compile

import { Dom, Tag } from './Tag.class.js'
import { setUse } from '../state/index.js'
import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { TagComponent, TagWrapper, tags } from './tag.utils.js'
import { getTagWrap } from './getTagWrap.function.js'
import { RouteProps, RouteTag, StateToTag, ToTag } from './tag.types.js'
import { ValueTypes } from './ValueTypes.enum.js'

let tagCount = 0

export type TaggedFunction<T> = T & {original: Function}

/** Wraps a function tag in a state manager and calls wrapped function on event cycles
 * For single rendering, no event cycles, use: tag.renderOnce = (props) => html``
 */
export function tag<T extends ToTag>(
  tagComponent: T
): TaggedFunction<T> {
  /** function developer triggers */
  const parentWrap = (function tagWrapper(
    ...props: (T | Tag | Tag[])[]
  ): TemplaterResult {
    const templater: TemplaterResult = new TemplaterResult(props)
    templater.tagJsType = ValueTypes.tagComponent
    
    // attach memory back to original function that contains developer display logic
    const innerTagWrap: Wrapper = getTagWrap(
      templater,
      parentWrap
    )

    if(!innerTagWrap.parentWrap) {
      innerTagWrap.parentWrap = parentWrap
    }
    
    templater.tagged = true
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  }) as TagWrapper<T>// we override the function provided and pretend original is what's returned
  
  ;(parentWrap as any).original = tagComponent
  parentWrap.compareTo = (tagComponent as any).toString()

  const tag = tagComponent as unknown as TagComponent
  parentWrap.isTag = true
  parentWrap.original = tag

  // group tags together and have hmr pickup
  tag.tags = tags
  tag.setUse = setUse
  tag.tagIndex = tagCount++ // needed for things like HMR
  tags.push(parentWrap)

  return parentWrap as unknown as (T & {original: Function})
}

/** Used to create a tag component that renders once and has no addition rendering cycles */
tag.oneRender = (...props: any[]): (Dom | Tag | StateToTag) => {
  throw new Error('Do not call function tag.oneRender but instead set it as: `(props) => tag.oneRender = (state) => html`` `')
}

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
tag.route = (routeProps: RouteProps): StateToTag => {
  throw new Error('Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

/** Use to structure and define a browser tag route handler
 * Example: export default tag.route = (routeProps: RouteProps) => (state) => html``
 */
tag.app = (routeTag: RouteTag): StateToTag => {
  throw new Error('Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `')
}

Object.defineProperty(tag, 'oneRender', {
  set(oneRenderFunction: Function) {
    (oneRenderFunction as any).oneRender = true
  },
})

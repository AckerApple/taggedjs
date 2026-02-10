// taggedjs-no-compile

import { KeyFunction } from '../tag/getDomTag.function.js'
import type { StringTag } from '../tag/StringTag.type.js'
import { callback, promise, setUseMemory, state } from '../state/index.js'
import { getTemplaterResult, TemplaterResult, Wrapper } from '../tag/getTemplaterResult.function.js'
import { Original, TagComponent, TagWrapper, tags } from '../tag/tag.utils.js'
import { getTagWrap } from '../tag/getTagWrap.function.js'
import { RouteProps, RouteTag, StateToTag, ToTag } from '../tag/tag.types.js'
import { UnknownFunction } from '../tag/update/oneRenderToSupport.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { AnyTag } from '../tag/AnyTag.type.js'
import { processRenderOnceInit } from '../render/update/processRenderOnceInit.function.js'
import { processTagComponentInit } from '../tag/update/processTagComponentInit.function.js'
import { checkTagValueChangeAndUpdate } from '../tag/checkTagValueChange.function.js'
import { destroySupportByContextItem } from '../tag/destroySupportByContextItem.function.js'
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js'
import { getContextInCycle, getElement as getTagElement } from '../tag/cycles/setContextInCycle.function.js'
import { tagInject } from './tagInject.function.js'
import { onInit as tagOnInit } from '../state/onInit.function.js'
import { onDestroy as tagOnDestroy } from '../state/onDestroy.function.js'
import { onRender as tagOnRender } from '../state/onRender.function.js'
import { getInnerHTML as tagGetInnerHTML, SupportContextItem, output as outputAlias, ProcessInit, AnySupport, HasValueChanged } from '../index.js'
import { ProcessDelete, TagJsTag, TagJsTagBasics } from './TagJsTag.type.js'
import { ProcessUpdate } from '../tag/ProcessUpdate.type.js'
import { ProcessAttribute } from '../tag/ProcessInit.type.js'

let tagCount = 0

const onClick = makeEventListener('click')
const onMouseDown = makeEventListener('mousedown')

function makeEventListener(type: string) {
  return function eventListener<T extends (...args: any[]) => any>(
    toBeCalled: T
  ): T {
    const wrapped = callback(toBeCalled) // should cause render to occur
  
    // run one time
    state(() => {
      const element = getTagElement()
      element.addEventListener(type, wrapped)
    })
  
    return wrapped // this is what you remove
  }
}

const tagElement = {
  get: getTagElement,

  onclick: onClick,
  click: onClick,
  onClick,

  mousedown: onMouseDown,
  onmousedown: onMouseDown,
  onMouseDown: onMouseDown,
}

defineGetSet('onclick', onClick)
defineGetSet('click', onClick)
defineGetSet('onMouseDown', onMouseDown)
defineGetSet('onmousedown', onMouseDown)
defineGetSet('mousedown', onMouseDown)

function defineGetSet(name: string, eventFn: any) {
  Object.defineProperty(tag, name, {
    get() {
      return eventFn
    },
    set(fn: any) {
      return eventFn(fn)
    },
  })
}

type ShortTag = {
  key: KeyFunction
  arrayValue?: any
  original?: Original
  compareTo?: string
}

export type TagJsComponent<T extends ToTag> = TagJsTagBasics & {
  component: true
  tagJsType: 'component'
  // templater?: TemplaterResult
  values: unknown[]
  
  value?: any

  
  /** The true saved innerHTML variable */
  innerHTML?: any // Tag
  _innerHTML?: TaggedFunction<any> // Tag // TaggedFunction<any>

  original: UnknownFunction
  /** Process input/argument updates. Fires at start and on updates */
  inputs: (handler: (parameters: Parameters<T>) => any) => true

  /** Process input/argument only on update cycles (not init) */
  updates: (handler: (parameters: Parameters<T>) => any) => true

  /** Process input/argument updates */
  getInnerHTML: () => true

  


  processInitAttribute: ProcessAttribute
  processUpdate: ProcessUpdate
  hasValueChanged: HasValueChanged
  processInit: ProcessInit
  destroy: ProcessDelete
  templater?: TemplaterResult
  ownerSupport?: AnySupport
  debug?: boolean // Attach as () => {const h=html``;h.debug=true;return true}

  /** used in array.map() */
  key: (arrayValue: unknown) => TagJsComponent<any>
  arrayValue?: any
  
  /** Used INSIDE a tag/function to signify that innerHTML is expected */
  acceptInnerHTML: (useTagVar: TagJsTag) => TagJsComponent<any>
  
  /** Same as innerHTML = x */
  setHTML: (innerHTML: any) => TagJsComponent<any>
}

// export type TaggedFunction<T extends ToTag> = ((...x: Parameters<T>) => ReturnType<T> & ShortTag) & TagJsComponent<T>
// export type TaggedFunction<T extends ToTag> = ((...x: Parameters<T>) => ReturnType<T>) & TagJsComponent<T>
export type TaggedFunction<T extends ToTag> = ((...x: Parameters<T>) => TagJsComponent<T>) & TagJsComponent<T>

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
// ): TagJsComponent<any> {
  /** function developer triggers */
  const parentWrap = function tagWrapper(
    ...props: (T | StringTag | StringTag[])[]
  ): TemplaterResult {
    const templater: TemplaterResult = getTemplaterResult(propWatch, props)
    
    templater.tagJsType = ValueTypes.tagComponent
    templater.processInit = processTagComponentInit
    templater.hasValueChanged = checkTagValueChangeAndUpdate
    
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

  const returnWrap = parentWrap as unknown as TaggedFunction<T>

  /* Used for setting arguments as inputs and outputs. Runs every init and update of tag */
  returnWrap.inputs = (handler: (parameters: Parameters<T>) => any) => {
    const context = getContextInCycle() as SupportContextItem
    context.inputsHandler = handler
    return true
  }

  // used for argument updates
  returnWrap.updates = (handler: (parameters: Parameters<T>) => any) => {
    const context = getContextInCycle() as SupportContextItem
    context.updatesHandler = handler
    return true
  }

  returnWrap.getInnerHTML = tagGetInnerHTML as any
  // returnWrap.tagJsType = 'component'

  return returnWrap
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

  /** monitors root and 1 level argument for exact changes */
  let immutableProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
  let watchProps: <T extends ToTag>(tagComponent: T) => TaggedFunction<T>;
  
  let element: typeof tagElement;
  let inject: typeof tagInject;
  let output: typeof outputAlias;
  let onInit: typeof tagOnInit;
  let onDestroy: typeof tagOnDestroy;
  let onRender: typeof tagOnRender;
  let getInnerHTML: typeof tagGetInnerHTML;
  let promise: Promise<unknown>;
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

// actually placing of items into tag memory
;(tag as any).element = tagElement
;(tag as any).renderOnce = renderOnceFn
;(tag as any).use = tagUseFn
;(tag as any).deepPropWatch = tag
;(tag as any).route = routeFn
;(tag as any).inject = tagInject
;(tag as any).output = outputAlias
;(tag as any).onInit = tagOnInit
;(tag as any).onDestroy = tagOnDestroy
;(tag as any).onRender = tagOnRender
;(tag as any).getInnerHTML = tagGetInnerHTML

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
    oneRenderFunction.processUpdate = tagValueUpdateHandler
    oneRenderFunction.destroy = destroySupportByContextItem
    oneRenderFunction.hasValueChanged = function renderOnceNeverChanges() {
      return 0
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
    renderFunction.processUpdate = tagValueUpdateHandler
    renderFunction.hasValueChanged = checkTagValueChangeAndUpdate
    renderFunction.destroy = destroySupportByContextItem
  },
})

Object.defineProperty(tag, 'promise', {
  set(target: Promise<unknown>) {
    promise(target)
  },
})

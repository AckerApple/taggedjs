import { Props } from '../Props.js'
import { Context, StringTag, DomTag, ContextItem, Tag } from './Tag.class.js'
import { empty, ValueTypes } from './ValueTypes.enum.js'
import { isTagComponent } from '../isInstance.js'
import { State } from '../state/index.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { cloneTagJsValue } from './cloneValueArray.function.js'
import { runBeforeDestroy } from './tagRunner.js'
import { DestroyOptions, getChildTagsToDestroy } from './destroy.support.js'
import { elementDestroyCheck } from './elementDestroyCheck.function.js'
import { updateContextItem, updateOneContextValue } from './update/updateContextItem.function.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { attachDomElement } from '../interpolations/optimizers/metaAttachDomElements.function.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { getDomMeta } from './domMetaCollector.js'
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js'
import { DomMetaMap } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { Subscription } from '../subject/subject.utils.js'
import { paint, painting, paintRemoves } from './paint.function.js'
import { getValueType } from './getValueType.function.js'
import { processAttributeEmit, processNameOnlyAttrValue } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { ParsedHtml } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'

export type AnySupport = (BaseSupport & {
  appSupport: BaseSupport
  ownerSupport?: AnySupport
}) | Support

export type PropsConfig = {
  latest: Props // new props NOT cloned props
  latestCloned: Props
  castProps?: Props // props that had functions wrapped
}

/** used only for apps, otherwise use Support */
// TODO: We need to split Support and simple tag support apart
export class BaseSupport {
  appElement?: Element // only seen on this.getAppSupport().appElement
  appSupport: BaseSupport = this
  propsConfig?: PropsConfig

  // stays with current render
  state: State = []

  constructor(
    public templater: TemplaterResult,
    public subject: ContextItem,
    castedProps?: Props
  ) {
    const props = templater.props  // natural props

    if(!props) {
      return
    }

    this.propsConfig = this.clonePropsBy(props, castedProps)
  }
/*
  addEventListener(
    eventName: string,
    element: Element,
    callback: EventCallback,
) {
    const elm = this.appElement as Element
    const newEventName = eventName.slice(2, eventName.length)

    const global = this.subject.global
    const events = global.events = global.events || {}
    
    if(!events[newEventName]) {
      const eventArray = events[newEventName] = [] as EventMem[]
      elm.addEventListener(newEventName, event => this.findListenerFor(event, eventArray, element, elm))
    }

    const eventArray = events[newEventName]

    const found = eventArray.find(x => x.elm === element)

    if(found) {
      found.callback = callback
      return
    }

    eventArray.push({elm: element, callback})
  }

  findListenerFor(
    event: Event,
    eventArray: EventMem[],
    element: Element,
    appElm: Element,
  ) {
    eventArray.find(x => {
      if(x.elm === event.target) {
        x.callback(event)
        return true
      }
    })

    const parentNode = element.parentNode
    if(parentNode && parentNode !== appElm) {
      this.findListenerFor(event, eventArray, parentNode as Element, appElm)
    }
  }
*/
  clonePropsBy(
    props: Props,
    castedProps?: Props,
  ) {
    if(this.templater.tagJsType === ValueTypes.stateRender) {
      return this.propsConfig = {
        latest: [],
        latestCloned: [],
      }
    }

    const latestCloned = props.map(props =>
      cloneTagJsValue(props)
    )
    return this.propsConfig = {
      latest: props,
      latestCloned, // assume its HTML children and then detect
      castProps: castedProps,
    }
  }

  getHtmlDomMeta(
    options: ElementBuildOptions = {
      counts: {added:0, removed: 0},
    },
    appendTo?: Element,
  ) {
    const domMeta = this.loadDomMeta()
    const context = this.buildContext()
    const result = attachDomElement(
      domMeta,
      context,
      this,
      options.counts,
      appendTo,
    )

    processContext(this, context)
        
    return result
  }

  loadDomMeta(): ParsedHtml {
    const templater = this.templater
    const thisTag = (templater.tag as StringTag | DomTag) // || templater

    if(thisTag.tagJsType === ValueTypes.dom) {
      return (thisTag as DomTag).dom as DomMetaMap
    }

    return getDomMeta((thisTag as StringTag).strings, thisTag.values)
  }

  /** Function that kicks off actually putting tags down as HTML elements */
  buildBeforeElement(
    element?: Element,
    options?: ElementBuildOptions,
  ) {
    const global = this.subject.global

    global.oldest = this as any as Support
    global.newest = this as any as Support

    ++painting.locks
    const result = this.getHtmlDomMeta(options, element)
    global.htmlDomMeta = result.dom
    --painting.locks

    // return fragment
    return result
  }

  updateBy(support: BaseSupport | Support) {
    const context = this.subject.global.context
    const tempTag = (support.templater.tag || support.templater) as DomTag | StringTag
    const values = (support.templater as any as Tag).values || tempTag.values
    const tag = this.templater.tag as any
    tag.values = values
    
    ++painting.locks    
    processUpdateContext(this, context)
    --painting.locks

    paint()
  }
  
  buildContext() {
    const context = this.subject.global.context
    const thisTag = this.templater.tag as StringTag | DomTag
    const values = thisTag.values // this.values || thisTag.values

    let index = 0
    const len = values.length
    while (index < len) {
      buildContext(
        values,
        index,
        context,
      )

      ++index
    }

    return context
  }

  destroy(
    options: DestroyOptions = {
      stagger: 0,
    }
  ): number | Promise<number> {
    const global = this.subject.global
    const {tags, subs} = options.byParent ? {subs:[], tags:[]} : getChildTagsToDestroy(global.childTags) // .toReversed()

    if(!options.byParent) {
      const ownerSupport = (this as unknown as Support).ownerSupport
      if(ownerSupport) {
        ownerSupport.subject.global.childTags = ownerSupport.subject.global.childTags.filter(
          child => child.subject.global !== this.subject.global
        )
      }
    }

    if(isTagComponent(this.templater)) {
      global.destroy$.next()
      runBeforeDestroy(this, this)
    }

    const mySubs = this.subject.global.subscriptions
    if(mySubs) {
      subs.push(...mySubs)
    }
    destroySubs(subs)

    // signify immediately child has been deleted (looked for during event processing)
    let index = tags.length
    while (index--) {
      const child = tags[index]
      if(isTagComponent(child.templater)) {
        runBeforeDestroy(child, child)
      }
    }
    
    resetSupport(
      this,
      global.context.length, // don't clear context just yet for smart remove kids uses context
    )

    // first paint
    const {stagger, promises} = this.smartRemoveKids(options)
    options.stagger = stagger
    global.context.length = 0
    
    if(promises.length) {
      return Promise.all(promises).then(() => options.stagger)
    }
    return options.stagger
  }

  smartRemoveKids(
    options: DestroyOptions = {
      stagger: 0,
    }
  ) {
    const startStagger = options.stagger
    const promises: Promise<any>[] = []
    const thisGlobal = this.subject.global
    const htmlDomMeta = thisGlobal.htmlDomMeta as DomObjectChildren
        
    thisGlobal.context.forEach(subject => {
      const global = subject.global
      const oldest = global.oldest
      
      if(oldest) {
        const clones = global.htmlDomMeta as DomObjectChildren
        const cloneOne = clones[0]  
        
        // check and see if child content lives within content of mine
        let count = 0
        if(cloneOne) {
          let domOne = cloneOne.domElement
          while(domOne && domOne.parentNode && count < 5) {
            if(htmlDomMeta.find(x => x.domElement === domOne.parentNode)) {
              return // no need to delete, they live within me
            }
    
            domOne = domOne.parentNode as HTMLElement | Text
            ++count
          }
        }

        // recurse
        const {stagger, promises: newPromises} = oldest.smartRemoveKids(options)
        options.stagger = options.stagger + stagger
        promises.push(...newPromises)
      }

      // regular values, no placeholders
      const elm = global.simpleValueElm
      if(elm) {
        delete global.simpleValueElm
        paintRemoves.push(elm)
        return
      }
    })
    
    const promise = this.destroyClones(htmlDomMeta, {stagger: startStagger}).promise
    
    htmlDomMeta.length = 0 // clear array    
    thisGlobal.childTags.length = 0
    
    if(promise) {
      promises.unshift(promise)
    }
    
    return {promises, stagger: options.stagger}
  }

  destroyClones(
    oldClones: DomObjectChildren,
    options: DestroyOptions = {
      stagger: 0,
    }
  ) {
    // check subjects that may have clones attached to them
    const promises = oldClones.map(clone => {
      const marker = clone.marker
      if(marker) {
        paintRemoves.push(marker)
      }

      if(!clone.domElement) {
        return
      }

      return this.checkCloneRemoval(clone.domElement, options.stagger)
    }).filter(x => x) // only return promises

    if(promises.length) {
      return {promise: Promise.all(promises), stagger:options.stagger}
    }

    return {stagger: options.stagger}
  }

  /** Reviews elements for the presences of ondestroy */
  checkCloneRemoval(
    clone: Element | Text | ChildNode,
    stagger: number,
  ) {
    const customElm = clone as any
    if( customElm.ondestroy ) {
      const promise = elementDestroyCheck(customElm, stagger)

      if(promise instanceof Promise) {
        return promise.then(() => {
          paintRemoves.push(clone)
          paint()
        })
      }
    }

    paintRemoves.push(clone)
  }
}

export class Support extends BaseSupport {
  constructor(
    public templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
    public ownerSupport: AnySupport,
    public appSupport: BaseSupport,
    public subject: ContextItem,
    castedProps?: Props,
    public version: number = 0
  ) {
    super(templater, subject, castedProps)
  }

  getAppSupport() {
    let tag = this
    while(tag.ownerSupport) {
      tag = tag.ownerSupport as any
    }

    return tag
  }
}

export function resetSupport(
  support: BaseSupport | Support,
  newContextLength: number // 0
) {
  const subject = support.subject
  const global = subject.global  
  global.context.length = newContextLength
  delete global.newest
}

/** returns boolean of did render */
function processOneContext(
  values: unknown[],
  index: number,
  context: Context,
  ownerSupport: BaseSupport | Support,
): boolean {
  const value = values[index] as any

  // is something already there?
  const contextItem = context[index]
  const global = context[index].global

  if(global.isAttr) {
    global.newest = ownerSupport
    if(global.isNameOnly) {
      processNameOnlyAttrValue(
        value,
        contextItem.global.lastValue,
        global.element as Element,
        ownerSupport,
        global.howToSet as HowToSet,
      )

      return false
    }

    const element = contextItem.global.element as Element
    processAttributeEmit(
      contextItem.global.isSpecial as boolean,
      value,
      contextItem.global.attrName as string,
      contextItem,
      element,
      ownerSupport,
      contextItem.global.howToSet as HowToSet,
    )

    return false
  }

  return false
}

/** returns boolean of did render */
export function processUpdateOneContext(
  values: unknown[],
  index: number,
  context: Context,
  ownerSupport: BaseSupport | Support,
): boolean {
  const value = values[index] as any

  const valueType = getValueType(value)
  if(valueType === ValueTypes.subject) {
    return false // emits on its own
  }

  // is something already there?
  const contextItem = context[index]
  const global = context[index].global

  if(value === contextItem.value) {
    return false
  }

  global.nowValueType = valueType

  if(global.isAttr) {
    contextItem.global.newest = ownerSupport
    if(global.isNameOnly) {
      processNameOnlyAttrValue(
        value,
        contextItem.global.lastValue,
        global.element as Element,
        ownerSupport,
        global.howToSet as HowToSet,
      )

      updateOneContextValue(false, value, contextItem)

      return false
    }

    const element = contextItem.global.element as Element
    processAttributeEmit(
      contextItem.global.isSpecial as boolean,
      value,
      contextItem.global.attrName as string,
      contextItem,
      element,
      ownerSupport,
      contextItem.global.howToSet as HowToSet,
    )

    updateOneContextValue(false, value, contextItem)

    return false
  }

  if(global.deleted) {
    const valueSupport = (value && value.support) as Support
    if(valueSupport) {
      valueSupport.destroy()
      context // item was deleted, no need to emit
      return false
    }
  }
  
  return updateContextItem(contextItem, value, ownerSupport, valueType)
}

export function destroySubs(
  subs: Subscription<any>[],
  // mySubs: Subscription<any>[],
) {
  if(!subs.length) {
    return
  }

  const cloneSubs = [...subs]
  subs.length = 0

  setTimeout(() => {
    for (const sub of cloneSubs) {
      sub.unsubscribe()
    }
  },0)
}

function buildContext(
  values: unknown[],
  index: number,
  context: Context,
) {
  const value = values[index] as any

  // 🆕 First time values below
  context[index] = {
    value,
    global: getNewGlobal(),
  }
}

function processContext(
  support: AnySupport,
  context: Context,
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values

  let index = 0
  const len = values.length
  while (index < len) {
    const contextItem = context[index]
    const value = values[index] as any

    processOneContext(
      values,
      index,
      context,
      support,
    )

    contextItem.value = value
    contextItem.global.lastValue = value
    if(!contextItem.global.locked) {
      ++contextItem.global.renderCount
    }
    
    ++index
  }

  return context
}

function processUpdateContext(
  support: AnySupport,
  context: Context,
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values

  let index = 0
  const len = values.length
  while (index < len) {
    processUpdateOneContext(
      values,
      index,
      context,
      support,
    )
    
    ++index
  }

  return context
}

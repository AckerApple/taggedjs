import { Props } from '../Props.js'
import { Context, StringTag, DomTag, ContextItem } from './Tag.class.js'
import { empty, ValueTypes } from './ValueTypes.enum.js'
import { deepClone } from '../deepFunctions.js'
import { isTagComponent } from '../isInstance.js'
import { State } from '../state/index.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { cloneTagJsValue } from './cloneValueArray.function.js'
import { runBeforeDestroy } from './tagRunner.js'
import { DestroyOptions, getChildTagsToDestroy } from './destroy.support.js'
import { elementDestroyCheck } from './elementDestroyCheck.function.js'
import { updateContextItem } from './update/updateContextItem.function.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { attachDomElement } from '../interpolations/optimizers/metaAttachDomElements.function.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { getDomMeta } from './domMetaCollector.js'
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js'
import { DomMetaMap, LikeObjectChildren } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { subscribeToTemplate } from '../interpolations/subscribeToTemplate.function.js'
import { Subscription } from '../subject/subject.utils.js'
import { paint, paintAppends, painting } from './paint.function.js'
import { getValueType } from './getValueType.function.js'
import { processAttributeEmit, processNameOnlyEmit } from '../interpolations/attributes/processAttribute.function.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'
import { ParsedHtml } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'

export type AnySupport = (BaseSupport & {
  ownerSupport?: AnySupport
}) | Support

/** used only for apps, otherwise use Support */
// TODO: We need to split Support and simple tag support apart
export class BaseSupport {
  isApp = true
  appElement?: Element // only seen on this.getAppSupport().appElement

  strings?: string[]
  dom?: LikeObjectChildren // ??? is this in use?
  values?: unknown[]

  propsConfig: {
    latest: Props // new props NOT cloned props
    latestCloned: Props
    castProps?: Props // props that had functions wrapped
  }

  // stays with current render
  state: State = []
  hasLiveElements = false

  constructor(
    public templater: TemplaterResult,
    public subject: ContextItem,
    castedProps?: Props
  ) {
    const props = templater.props  // natural props
    this.propsConfig = this.clonePropsBy(props, castedProps)
  }

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
    fragment: DocumentFragment,
    options: ElementBuildOptions = {
      counts: {added:0, removed: 0},
    }
  ): DomObjectChildren {
    const domMeta = this.loadDomMeta()
    const context = this.buildContext()
    
    const {subs} = attachDomElement(
      domMeta,
      context,
      this,
      options.counts,
      fragment as any as Element,
    )

    processContext(this, context, fragment)

    // append all at once
    subs.forEach(sub => subscribeToTemplate(sub))
        
    return domMeta as DomObjectChildren
  }

  loadDomMeta(): ParsedHtml {
    const templater = this.templater
    const thisTag = (templater.tag as StringTag | DomTag) // || templater

    if(thisTag.tagJsType === ValueTypes.dom) {
      const domMeta: DomMetaMap = (thisTag as DomTag).dom as DomMetaMap
      return domMeta()
    }

    const domMeta = getDomMeta((thisTag as StringTag).strings, thisTag.values)
    return domMeta
  }

  /** Function that kicks off actually putting tags down as HTML elements */
  buildBeforeElement(
    fragment = document.createDocumentFragment(),
    options?: ElementBuildOptions,
  ) {
    const subject = this.subject
    const global = this.subject.global

    global.oldest = this as any as Support
    global.newest = this as any as Support

    subject.support = this as any as Support
    this.hasLiveElements = true

    ++painting.locks
    global.htmlDomMeta = this.getHtmlDomMeta(fragment, options)
    --painting.locks

    return fragment
  }

  updateBy(support: BaseSupport | Support) {
    const context = this.subject.global.context
    const tempTag = support.templater.tag as StringTag | DomTag
    ++painting.locks
    this.updateConfig(tempTag, tempTag.values)

    processContextUpdate(this, context)
    --painting.locks
    paint()
  }
  
  /** triggers values to render */
  updateConfig(tag: DomTag | StringTag, values: any[]) {
    if(tag.tagJsType === ValueTypes.dom) {
      this.dom = (tag as DomTag).dom
    } else {
      this.strings = (tag as StringTag).strings
    }
    this.values = values
  }

  buildContext() {
    const context = this.subject.global.context
    const thisTag = this.templater.tag as StringTag | DomTag
    const values = this.values || thisTag.values

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
        ownerSupport.subject.global.childTags = ownerSupport.subject.global.childTags.filter(child => child.subject.global !== this.subject.global)
      }
    }


    if(isTagComponent(this.templater)) {
      global.destroy$.next()
      runBeforeDestroy(this, this)
    }

    const mySubs = this.subject.global.subscriptions
    subs.push(...mySubs)
    mySubs.length = 0
    destroySubs(subs)
    midDestroyChildTags(tags)
    
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

      // regular values, no placeholders
      const elm = global.simpleValueElm
      if(elm) {
        delete global.simpleValueElm
        paintAppends.push(() => {
          const parentNode = elm.parentNode as ParentNode
          parentNode.removeChild(elm)
          // parentNode.removeChild(global.placeholder as Text)
        })
        return
      }

      /*
      const placeholder = global.placeholder
      if(placeholder) {
        const parentNode = placeholder.parentNode
        if(parentNode) {
          parentNode.removeChild(placeholder)
        }
        delete global.placeholder
      }
      */

      const oldest = global.oldest
      if(oldest) {
        const clones = global.htmlDomMeta as DomObjectChildren
        const cloneOne = clones[0]  
        
        let count = 0
        // TODO: ??? maybe not needed?
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
        paintAppends.push(() => {
          const parentNode = marker.parentNode as ParentNode
          parentNode.removeChild(marker)
        })
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
          const parentNode = clone.parentNode as ParentNode
          parentNode.removeChild(clone)
        })
      }
    }

    paintAppends.push(() => {
      const parentNode = clone.parentNode as ParentNode
      parentNode.removeChild(clone)
    })
  }

  destroySubscriptions() {
    destroySubs(this.subject.global.subscriptions)
  }
}

export class Support extends BaseSupport {
  isApp = false
  
  constructor(
    public templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
    public ownerSupport: AnySupport,
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
  delete (global as any).oldest // may not be needed
  delete global.newest
  delete (subject as any).support
}

function processOneContext(
  values: unknown[],
  index: number,
  context: Context,
  support: BaseSupport | Support,
  isUpdate: boolean,
  fragment?: DocumentFragment,
) {
  const value = values[index] as any

  // is something already there?
  const contextItem = context[index]
  const global = context[index].global
  const renderCount = contextItem.global.renderCount

  if(global.isAttr) {
    contextItem.support = support
    if(global.isNameOnly) {
      processNameOnlyEmit(
        value,
        support,
        contextItem,
        global.element as Element,
        global.howToSet as HowToSet,
      )

      return
    }

    const element = contextItem.global.element as Element
    processAttributeEmit(
      contextItem.global.isSpecial as boolean,
      value,
      contextItem.global.attrName as string,
      contextItem,
      element,
      support,
      contextItem.global.howToSet as HowToSet,
    )

    return
  }

  if(renderCount > 0) {
    if(global.deleted) {
      const valueSupport = (value && value.support) as Support
      if(valueSupport) {
        valueSupport.destroy()
        return context // item was deleted, no need to emit
      }
    }

    updateContextItem(context, index, value, support, isUpdate)
  }
}

export function midDestroyChildTags(
  childTags: Support[]
) {
    // signify immediately child has been deleted (looked for during event processing)
    let index = childTags.length
    while (index--) {
      const child = childTags[index]
      const subGlobal = child.subject.global
      delete subGlobal.newest
      subGlobal.deleted = true

      if(isTagComponent(child.templater)) {
        runBeforeDestroy(child, child)
      }

      checkDestroySimpleValueTag(child)
    }
}

function checkDestroySimpleValueTag(
  child: AnySupport
) {
  const subGlobal = child.subject.global
  const simpleElm = subGlobal.simpleValueElm
  if(simpleElm) {
    const parentNode = simpleElm.parentNode as ParentNode
    parentNode.removeChild(simpleElm)
    delete subGlobal.simpleValueElm
  }
}

export function destroySubs(subs: Subscription<any>[]) {
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
  const contextItem = context[index] = {
    value,
    global: getNewGlobal(),
    tagJsType: getValueType(value),
  }

  contextItem.global.lastValue = value
}

function processContext(
  support: AnySupport,
  context: Context,
  fragment?: DocumentFragment,
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = support.values || thisTag.values

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
      false,
      fragment,
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

function processContextUpdate(
  support: AnySupport,
  context: Context,
  fragment?: DocumentFragment,
) {
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = support.values || thisTag.values

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
      true,
      fragment,
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
import { Props } from '../Props.js'
import { Context, StringTag, DomTag } from './Tag.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { deepClone } from '../deepFunctions.js'
import { isTagComponent } from '../isInstance.js'
import { State } from '../state/index.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { TagSubject } from '../subject.types.js'
import { cloneTagJsValue, cloneValueArray } from './cloneValueArray.function.js'
import { runBeforeDestroy } from './tagRunner.js'
import { DestroyOptions, getChildTagsToDestroy } from './destroy.support.js'
import { elementDestroyCheck } from './elementDestroyCheck.function.js'
import { updateContextItem } from './update/updateContextItem.function.js'
import { processNewValue } from './update/processNewValue.function.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'
import { attachDomElement } from '../interpolations/optimizers/metaAttachDomElements.function.js'
import { DomObjectChildren, ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { getDomMeta } from './domMetaCollector.js'
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js'
import { exchangeParsedForValues } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { ValueSubject } from '../subject/ValueSubject.js'

export type AnySupport = (BaseSupport & {
  ownerSupport?: AnySupport
}) | Support

/** used only for apps, otherwise use Support */
// TODO: We need to split Support and simple tag support apart
export class BaseSupport {
  isApp = true
  appElement?: Element // only seen on this.getAppSupport().appElement

  strings?: string[]
  dom?: ObjectChildren
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
    public subject: TagSubject,
    castedProps?: Props
  ) {
    const props = templater.props  // natural props
    this.propsConfig = this.clonePropsBy(props, castedProps)
  }

  clonePropsBy(
    props: Props,
    castedProps?: Props,
  ) {
    if(this.templater.tagJsType === ValueTypes.tag) {
      throw new Error('regular tag up in here')
    }
    if(this.templater.tagJsType === ValueTypes.stateRender) {
      return this.propsConfig = {
        latest: [],
        latestCloned: [],
      }
    }

    const latestCloned = props.map(props =>
      cloneTagJsValue(props)
      // deepClone(props)
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

    const global = this.subject.global
    let context = global.context
    context = this.update()
    
    exchangeParsedForValues(domMeta, context)
    attachDomElement(
      domMeta,
      context,
      this,
      fragment,
      options.counts,
      fragment as any as Element,
    )
    return domMeta as DomObjectChildren

  }

  loadDomMeta() {
    const templater = this.templater
    const thisTag = (templater.tag as StringTag | DomTag) // || templater
    let orgDomMeta: ObjectChildren | undefined;

    if(thisTag.tagJsType === ValueTypes.dom) {
      orgDomMeta = (thisTag as DomTag).dom
    } else {
      orgDomMeta = getDomMeta((thisTag as StringTag).strings, thisTag.values)
    }

    const domMeta = deepClone( orgDomMeta )
    return domMeta
  }

  /** Function that kicks off actually putting tags down as HTML elements */
  buildBeforeElement(
    fragment = document.createDocumentFragment(),
    options?: ElementBuildOptions,
  ) {
    const subject = this.subject
    const global = this.subject.global

    if(global.deleted) {
      throw new Error('building on deleted foundation')
    }
    
    global.oldest = this as any as Support
    global.newest = this as any as Support

    subject.support = this as any as Support
    this.hasLiveElements = true

    global.htmlDomMeta = this.getHtmlDomMeta(fragment, options)

    return fragment
  }

  updateBy(support: BaseSupport | Support) {
    /* ???
    const templater = support.templater
    const tempTag = templater.tag as StringTag | DomTag
    const values = tempTag?.values || (templater as any).values
    this.updateConfig(tempTag, values)
    */
    const tempTag = support.templater.tag as StringTag | DomTag
    this.updateConfig(tempTag, tempTag.values)
  }
  
  /** triggers values to render */
  updateConfig(tag: DomTag | StringTag, values: any[]) {
    if(tag.tagJsType === ValueTypes.dom) {
      this.dom = (tag as DomTag).dom
    } else {
      this.strings = (tag as StringTag).strings
    }
    this.updateValues(values)
  }
  
  updateValues(values: any[]) {
    this.values = values
    return this.updateContext( this.subject.global.context )
  }

  update() {
    return this.updateContext( this.subject.global.context )
  }

  updateContext(context: Context) {
    const thisTag = this.templater.tag as StringTag | DomTag
    const values = this.values || thisTag.values

    // TODO: loop specific number of times instead of building an array
    const array = 'x,'.repeat( values.length ).split(',')  // strings
    array.forEach((_string, index) => updateOneContext(
      values,
      index,
      context,
      this,
    ))

    return context
  }

  destroy(
    options: DestroyOptions = {
      stagger: 0,
    }
  ): number | Promise<number> {
    const global = this.subject.global
    if(global.deleted) {
      throw new Error('double destroy')
    }

    const childTags = options.byParent ? [] : getChildTagsToDestroy(global.childTags) // .toReversed()

    if(isTagComponent(this.templater)) {
      global.destroy$.next()
      runBeforeDestroy(this, this)
    }

    this.destroySubscriptions()
    midDestroyChildTags(childTags)
    // checkDestroySimpleValueTag(this)
    
    // const oldest = global.oldest
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
    const myClones = [...thisGlobal.htmlDomMeta]
    thisGlobal.htmlDomMeta.length = 0
    
    thisGlobal.context.forEach(subject => {
      const global = subject.global
      const oldest = global.oldest

      const elm = global.simpleValueElm
      if(elm) {
        const parentNode = elm.parentNode as ParentNode
        parentNode.removeChild(elm)
        delete global.simpleValueElm

        parentNode.removeChild(global.placeholder as Text)
        return
      }

      if(!oldest) {
        const placeholder = global.placeholder
        if(placeholder) {
          const parentNode = placeholder.parentNode
          if(parentNode) {
            parentNode.removeChild(placeholder)
          }
          delete global.placeholder
        }
        return // subject._value === false
      }

      const clones = global.htmlDomMeta

      let cloneOne = clones[0]
      if(cloneOne === undefined) {
        const {stagger, promises: newPromises} = oldest.smartRemoveKids(options)
        options.stagger = options.stagger + stagger
        promises.push(...newPromises)
        return {promise: Promise.all(promises), stagger:options.stagger}
      }

      let count = 0
      let domOne = cloneOne.domElement
      while(domOne && domOne.parentNode && count < 5) {
        if(myClones.find(x => x.domElement === domOne.parentNode)) {
          return // no need to delete, they live within me
        }

        domOne = domOne.parentNode as HTMLElement | Text
        ++count
      }
      
      // recurse
      const {stagger, promises: newPromises} = oldest.smartRemoveKids(options)
      options.stagger = options.stagger + stagger
      promises.push(...newPromises)
    })
    
    const promise = this.destroyClones(myClones, {stagger: startStagger}).promise
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
      if(clone.marker) {
        const parentNode = clone.marker.parentNode as ParentNode
        parentNode.removeChild( clone.marker )
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

    const parentNode = clone.parentNode as ParentNode
    parentNode.removeChild(clone)
  }

  destroySubscriptions() {
    const subs = this.subject.global.subscriptions
    for (let index = subs.length - 1; index >= 0; --index) {
      subs[index].unsubscribe()
    }
    subs.length = 0
  }
}

export class Support extends BaseSupport {
  isApp = false
  
  constructor(
    public templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
    public ownerSupport: AnySupport,
    public subject: TagSubject,
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

function updateOneContext(
  values: unknown[],
  index: number,
  context: Context,
  support: BaseSupport | Support
) {
  const hasValue = values.length > index
  if(!hasValue) {
    return
  }

  const value = values[index] as any

  // is something already there?
  const exists = context.length > index
  if(exists) {
    if(support.subject.global.deleted) {
      const valueSupport = (value && value.support) as Support
      if(valueSupport) {
        valueSupport.destroy()
        return context // item was deleted, no need to emit
      }
    }

    return updateContextItem(context, index, value)
  }

  // 🆕 First time values below
  context[index] = processNewValue(
    value,
    support as Support,
  ) as TagJsSubject<any>
}

export function midDestroyChildTags(
  childTags: Support[]
) {
    // signify immediately child has been deleted (looked for during event processing)
    for (let index = childTags.length - 1; index >= 0; --index) {
      const child = childTags[index]
      const subGlobal = child.subject.global
      delete subGlobal.newest
      subGlobal.deleted = true

      if(isTagComponent(child.templater)) {
        runBeforeDestroy(child, child)
      }

      child.destroySubscriptions()
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

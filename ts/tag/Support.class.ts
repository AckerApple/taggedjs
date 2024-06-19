import { Props } from '../Props.js'
import { Context, Tag, Dom } from './Tag.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { deepClone } from '../deepFunctions.js'
import { isTagComponent } from '../isInstance.js'
import { State } from '../state/index.js'
import { Clone, TemplaterResult } from './TemplaterResult.class.js'
import { TagSubject } from '../subject.types.js'
import { cloneTagJsValue, cloneValueArray } from './cloneValueArray.function.js'
import { runBeforeDestroy } from './tagRunner.js'
import { DestroyOptions, getChildTagsToDestroy } from './destroy.support.js'
import { elementDestroyCheck } from './elementDestroyCheck.function.js'
import { updateContextItem } from './update/updateContextItem.function.js'
import { processNewValue } from './update/processNewValue.function.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'
import { exchangeParsedForValues } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js'
import { attachDomElement } from '../interpolations/optimizers/metaAttachDomElements.function.js'
import { DomObjectChildren, ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { getDomMeta } from './domMetaCollector.js'
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js'

export type AnySupport = BaseSupport | Support

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
    lastClonedKidValues: unknown[][]
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

  clonePropsBy(props: Props, castedProps?: Props) {
    const children = this.templater.children // children tags passed in as arguments
    const kidValue = children.value

    const latestCloned = props.map(props =>
      cloneTagJsValue(props)
      // deepClone(props)
    )
    return this.propsConfig = {
      latest: props,
      latestCloned, // assume its HTML children and then detect
      castProps: castedProps,
      lastClonedKidValues: kidValue.map(kid => {
        const cloneValues = cloneValueArray(kid.values)
        return cloneValues
      })
    }
  }

  getHtmlDomMeta(
    fragment: DocumentFragment,
    options: ElementBuildOptions = {
      counts: {added:0, removed: 0},
    }
  ): DomObjectChildren {
    const thisTag = this.templater.tag as Tag | Dom


    const context = this.update()
    let orgDomMeta: ObjectChildren | undefined;

    if(thisTag.tagJsType === ValueTypes.dom) {
      orgDomMeta = (thisTag as Dom).dom
    } else {
      orgDomMeta = getDomMeta((thisTag as Tag).strings, thisTag.values)
    }

    const domMeta = deepClone( orgDomMeta )
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

    const htmlDomMeta = this.getHtmlDomMeta(fragment, options)
    attachClonesToSupport(htmlDomMeta, this.subject.global.clones)

    return fragment
  }

  updateBy(support: BaseSupport | Support) {  
    const tempTag = support.templater.tag as Tag | Dom
    this.updateConfig(tempTag, tempTag.values)
  }
  
  /** triggers values to render */
  updateConfig(tag: Dom | Tag, values: any[]) {
    if(tag.tagJsType === ValueTypes.dom) {
      this.dom = (tag as Dom).dom
    } else {
      this.strings = (tag as Tag).strings
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
    const thisTag = this.templater.tag as Tag | Dom
    // const strings = this.strings || thisTag.strings
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
    const childTags = options.byParent ? [] : getChildTagsToDestroy(this.subject.global.childTags) // .toReversed()

    if(isTagComponent(this.templater)) {
      global.destroy$.next()
      runBeforeDestroy(this, this)
    }

    this.destroySubscriptions()
    
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
      // resetSupport(this)
    }

    resetSupport(this)

    // let mainPromise: Promise<number | (number | void | undefined)[]> | undefined    

    // first paint
    const {stagger, promises} = this.smartRemoveKids(options)
    options.stagger = stagger
    
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
    const myClones = this.subject.global.clones
    this.subject.global.childTags.forEach(childTag => {
      const clones = childTag.subject.global.clones
      let cloneOne = clones[0]
      
      if(cloneOne === undefined) {
        const {stagger, promises: newPromises} = childTag.smartRemoveKids(options)
        options.stagger = options.stagger + stagger
        promises.push(...newPromises)
        return {promise: Promise.all(promises), stagger:options.stagger}
      }

      let count = 0
      // let deleted = false
      while(cloneOne.parentNode && count < 5) {
        if(myClones.includes(cloneOne)) {
          return // no need to delete, they live within me
        }

        cloneOne = cloneOne.parentNode as Element
        ++count
      }
      
      // recurse
      const {stagger, promises: newPromises} = childTag.smartRemoveKids(options)
      options.stagger = options.stagger + stagger
      promises.push(...newPromises)
    })
    
    const promise = this.destroyClones({stagger: startStagger}).promise
    this.subject.global.clones.length = 0
    this.subject.global.childTags.length = 0
    if(promise) {
      promises.unshift(promise)
    }
    
    return {promises, stagger: options.stagger}
  }

  destroyClones(
    options: DestroyOptions = {
      stagger: 0,
    }
  ) {
    const oldClones = this.subject.global.clones // .toReversed()

    // check subjects that may have clones attached to them
    const promises = oldClones.map(
      clone => this.checkCloneRemoval(clone, options.stagger)
    ).filter(x => x) // only return promises

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
    let promise: Promise<unknown> | undefined
    
    const customElm = clone as any
    if( customElm.ondestroy ) {
      promise = elementDestroyCheck(customElm, stagger)
    }

    if(promise instanceof Promise) {
      return promise.then(() => {
        const parentNode = clone.parentNode as ParentNode
        // TODO: we need to remove this IF
        if(parentNode) {
          parentNode.removeChild(clone)
        }
      })
    }

    const parentNode = clone.parentNode as ParentNode
    if(parentNode) {
      parentNode.removeChild(clone)
    }

    const ownerSupport = (this as any as Support).ownerSupport as Support
    if(ownerSupport) {
      const clones = ownerSupport.subject.global.clones
      const index = clones.indexOf(clone)
      if(index >= 0) {
        clones.splice(index, 1)
      }
    }

    return promise
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
    public ownerSupport: BaseSupport | Support,
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

export function resetSupport(support: BaseSupport | Support) {
  const global = support.subject.global
  
  // TODO: We maybe able to replace with: global.context.length = 0
  global.context = []

  delete (global as any).oldest // may not be needed
  delete global.newest
  const subject = support.subject
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

function attachClonesToSupport(
  htmlDomMeta: DomObjectChildren,
  clones: Clone[],
) {
  htmlDomMeta.forEach(meta => {
    if(meta.domElement) {
      clones.push(meta.domElement)
    }
    
    clones.push(meta.marker)

    if('children' in meta) {
      const children = meta.children as DomObjectChildren
      attachClonesToSupport(children, clones)
    }
  })
}

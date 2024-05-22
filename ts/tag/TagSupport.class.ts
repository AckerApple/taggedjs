import { Props } from '../Props'
import { Context, ElementBuildOptions, Tag, TagMemory, TagTemplate, escapeVariable, variablePrefix } from './Tag.class'
import { deepClone } from '../deepFunctions'
import { isTagComponent } from '../isInstance'
import { State } from '../state'
import { TagGlobal, TemplaterResult } from '../TemplaterResult.class'
import { TagSubject, WasTagSubject } from '../subject.types'
import { cloneValueArray } from './cloneValueArray.function'
import { restoreTagMarker } from './checkDestroyPrevious.function'
import { runBeforeDestroy } from './tagRunner'
import { DestroyOptions, getChildTagsToDestroy } from './destroy.support'
import { elementDestroyCheck } from './elementDestroyCheck.function'
import { updateContextItem } from './update/updateContextItem.function'
import { processNewValue } from './update/processNewValue.function'
import { InsertBefore } from '../interpolations/Clones.type'
import { setTagPlaceholder } from './setTagPlaceholder.function'
import { interpolateElement, interpolateString } from '../interpolations/interpolateElement'
import { subscribeToTemplate } from '../interpolations/interpolateTemplate'
import { afterInterpolateElement } from '../interpolations/afterInterpolateElement.function'
import { TagArraySubject } from './update/processTagArray'
import { renderSubjectComponent } from './render/renderSubjectComponent.function'

const prefixSearch = new RegExp(variablePrefix, 'g')

/** used only for apps, otherwise use TagSupport */
export class BaseTagSupport {
  isApp = true
  appElement?: Element // only seen on this.getAppTagSupport().appElement

  strings?: string[]
  values?: any[]
  lastTemplateString: string | undefined = undefined // used to compare templates for updates

  propsConfig: {
    latest: Props // new props NOT cloned props
    latestCloned: Props
    lastClonedKidValues: unknown[][]
  }

  // stays with current render
  memory: TagMemory = {
    state: [] as State,
  }

  clones: (Element | Text | ChildNode)[] = [] // elements on document. Needed at destroy process to know what to destroy

  // travels with all rerenderings
  global: TagGlobal = {
    context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
    deleted: false,
    subscriptions: [],
  }

  hasLiveElements = false

  constructor(
    public templater: TemplaterResult,
    public subject: TagSubject,
  ) {
    const children = templater.children // children tags passed in as arguments
    const kidValue = children.value
    const props = templater.props  // natural props

    const latestCloned = props.map(props => deepClone(props))
    this.propsConfig = {
      latest: props,
      latestCloned, // assume its HTML children and then detect
      lastClonedKidValues: kidValue.map(kid => {
        const cloneValues = cloneValueArray(kid.values)
        return cloneValues
      })
    }
  }

  /** Function that kicks off actually putting tags down as HTML elements */
  buildBeforeElement(
    insertBefore: InsertBefore,
    options: ElementBuildOptions = {
      forceElement: false,
      counts: {added:0, removed: 0},
    },
  ) {
    const subject = this.subject
    const global = this.global
    global.insertBefore = insertBefore

    if(!global.placeholder) {
      setTagPlaceholder(global)
    }

    const placeholderElm = global.placeholder as Text
    
    global.oldest = this as any as TagSupport
    global.newest = this as any as TagSupport

    subject.tagSupport = this as any as TagSupport
    this.hasLiveElements = true
    
    const context = this.update()
    const template = this.getTemplate()
    
    const isForceElement = options.forceElement
    const elementContainer = document.createElement('div')
    elementContainer.id = 'tag-temp-holder'
    // render content with a first child that we can know is our first element
    elementContainer.innerHTML = `<template id="temp-template-tag-wrap">${template.string}</template>`

    // Search/replace innerHTML variables but don't interpolate tag components just yet
    const {tagComponents} = interpolateElement(
      elementContainer,
      context,
      template,
      this as any as TagSupport, // ownerSupport,
      {
        forceElement: options.forceElement,
        counts: options.counts
      },
    )

    afterInterpolateElement(
      elementContainer,
      placeholderElm,
      this as any as TagSupport, // ownerSupport
      context,
      options,
    )

    // Any tag components that were found should be processed AFTER the owner processes its elements. Avoid double processing of elements attributes like (oninit)=${}
    tagComponents.forEach(tagComponent => {
      subscribeToTemplate(
        tagComponent.insertBefore,
        tagComponent.subject as TagSubject | TagArraySubject,
        tagComponent.ownerSupport,
        options.counts,
        {isForceElement},
      )

      afterInterpolateElement(
        elementContainer,
        tagComponent.insertBefore,
        tagComponent.ownerSupport,
        context,
        options,
      )
    })
  }

  getTemplate(): TagTemplate {
    const thisTag = this.templater.tag as Tag
    const strings = this.strings || thisTag.strings
    const values = this.values || thisTag.values
    
    const string = strings.map((string, index) => {
      const safeString = string.replace(prefixSearch, escapeVariable)
      const endString = safeString + (values.length > index ? `{${variablePrefix}${index}}` : '')
      const trimString = endString.replace(/>\s*/g,'>').replace(/\s*</g,'<')
      return trimString
    }).join('')

    const interpolation = interpolateString(string)
    this.lastTemplateString = interpolation.string
    return {
      interpolation,
      string: interpolation.string,
      strings,
      values,
      context: this.global.context || {},
    }
  }

  update() {
    return this.updateContext( this.global.context )
  }

  updateContext(context: Context) {
    const thisTag = this.templater.tag as Tag
    const strings = this.strings || thisTag.strings
    const values = this.values || thisTag.values

    strings.map((_string, index) => {
      const variableName = variablePrefix + index
      const hasValue = values.length > index
      const value = values[index]

      // is something already there?
      const exists = variableName in context

      if(exists) {
        return updateContextItem(context, variableName, value)
      }

      if(!hasValue) {
        return
      }

      // 🆕 First time values below
      context[variableName] = processNewValue(
        hasValue,
        value,
        this as any as TagSupport,
      )
    })

    return context
  }
}

export class TagSupport extends BaseTagSupport {
  isApp = false
  childTags: TagSupport[] = [] // tags on me
  
  constructor(
    public templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new TagSupport()
    public ownerTagSupport: TagSupport,
    public subject: TagSubject,
    public version: number = 0
  ) {
    super(templater, subject)
  }

  destroy(
    options: DestroyOptions = {
      stagger: 0,
      byParent: false, // Only destroy clones of direct children
    }
  ): Promise<number> {
    const firstDestroy = !options.byParent
    const global = this.global
    const subject = this.subject
    const childTags = options.byParent ? [] : getChildTagsToDestroy(this.childTags)

    if(firstDestroy && isTagComponent(this.templater)) {
      runBeforeDestroy(this, this)
    }
    
    // signify immediately child has been deleted (looked for during event processing)
    childTags.forEach(child => {
      const subGlobal = child.global
      delete subGlobal.newest
      subGlobal.deleted = true

      if(isTagComponent(child.templater)) {
        runBeforeDestroy(child, child)
      }
    })

    // HTML DOM manipulation. Put back down the template tag
    const insertBefore = global.insertBefore as Element

    if(insertBefore.nodeName === 'TEMPLATE') {
      const placeholder = global.placeholder as Text
      if(placeholder && !('arrayValue' in this.memory)) {
        if(!options.byParent) {
          restoreTagMarker(this)
        }
      }
    }
    
    this.destroySubscriptions()
    
    let mainPromise: Promise<number | (number | void | undefined)[]> | undefined

    if(this.ownerTagSupport) {
      this.ownerTagSupport.childTags = this.ownerTagSupport.childTags.filter(child => child !== this)
    }

    if( firstDestroy ) {
      const {stagger, promise} = this.destroyClones(options)
      options.stagger = stagger
      
      if(promise) {
        mainPromise = promise
      }
    } else {
      this.destroyClones()
    }

    // data reset
    delete global.placeholder
    global.context = {}
    delete global.oldest
    delete global.newest
    global.deleted = true
    this.childTags.length = 0
    this.hasLiveElements = false
    delete (subject as WasTagSubject).tagSupport

    if(mainPromise) {
      mainPromise = mainPromise.then(async () => {
        const promises = childTags.map(kid => kid.destroy({stagger:0, byParent: true}))
        return Promise.all(promises)
      })
    } else {
      mainPromise = Promise.all(childTags.map(kid => kid.destroy({stagger:0, byParent: true})))
    }

    return mainPromise.then(() => options.stagger)
  }

  destroySubscriptions() {
    const global = this.global
    global.subscriptions.forEach(cloneSub => cloneSub.unsubscribe())
    global.subscriptions.length = 0
  }

  destroyClones(
    {stagger}: DestroyOptions = {
      stagger: 0,
    }
  ) {
    const oldClones = [...this.clones]
    this.clones.length = 0 // tag maybe used for something else

    const promises = oldClones.map(
      clone => this.checkCloneRemoval(clone, stagger)
    ).filter(x => x) // only return promises


    const oldContext = this.global.context
    Object.values(oldContext).forEach(value => {
      const clone = (value as any).clone
      if(clone && clone.parentNode) {
        clone.parentNode.removeChild(clone)
      }
    })
    
    if(promises.length) {
      return {promise: Promise.all(promises), stagger}
    }

    return {stagger}
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

    const next = () => {
      const parentNode = clone.parentNode as ParentNode
      if(parentNode) {
        parentNode.removeChild(clone)
      }

      const ownerSupport = this.ownerTagSupport
      if(ownerSupport) {
        // Sometimes my clones were first registered to my owner, remove them from owner
        ownerSupport.clones = ownerSupport.clones.filter(compareClone => compareClone !== clone)
      }
    }

    if(promise instanceof Promise) {
      return promise.then(next)
    } else {
      next()
    }

    return promise
  }

  updateBy(tagSupport: TagSupport) {  
    const tempTag = tagSupport.templater.tag as Tag
    this.updateConfig(tempTag.strings, tempTag.values)
  }
  
  updateConfig(strings: string[], values: any[]) {
    this.strings = strings
    this.updateValues(values)
  }
  
  updateValues(values: any[]) {
    this.values = values
    return this.updateContext( this.global.context )
  }

  /** Used during HMR only where static content itself could have been edited */
  async rebuild() {
    delete this.strings // seek the templater strings instead now
    delete this.values // seek the templater strings instead now

    restoreTagMarkers(this)

    const newSupport = renderSubjectComponent(this.subject, this, this.ownerTagSupport)
    await this.destroy()
    newSupport.buildBeforeElement(this.global.insertBefore as Element,{
      forceElement: true,
      counts: {added:0, removed: 0},
    })
    return newSupport
  }

  getAppTagSupport() {
    let tag: TagSupport = this
    
    while(tag.ownerTagSupport) {
      tag = tag.ownerTagSupport
    }

    return tag
  }
}

function restoreTagMarkers(support: TagSupport) {
  restoreTagMarker(support)
  support.childTags.forEach(childTag => restoreTagMarkers(childTag.global.oldest as TagSupport))
}

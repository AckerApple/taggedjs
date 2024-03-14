import { TagSupport } from './TagSupport.class'
import { Provider } from './providers'
import { Subscription } from './Subject'
import { runBeforeDestroy } from './tagRunner'
import { buildClones } from './render'
import { interpolateElement, interpolateString } from './interpolateElement'
import { Counts, Template, afterElmBuild, subscribeToTemplate } from './interpolateTemplate'
import { State } from './set.function'
import { elementDestroyCheck } from './elementDestroyCheck.function'
import { updateExistingValue } from './updateExistingValue.function'
import { InterpolatedTemplates } from './interpolations'
import { processNewValue } from './processNewValue.function'
import { InterpolateSubject } from './processSubjectValue.function'
import { Clones } from './Clones.type'
import { checkDestroyPrevious } from './checkDestroyPrevious.function'
import { TagSubject } from './Tag.utils'
import { TagArraySubject } from './processTagArray'

export const variablePrefix = '__tagvar'
export const escapeVariable = '--' + variablePrefix + '--'

const prefixSearch = new RegExp(variablePrefix, 'g')
export const escapeSearch = new RegExp(escapeVariable, 'g')

export type Context = {
  [index: string]: InterpolateSubject // ValueSubject<unknown>
}
export type TagMemory = Record<string, any> & {
  context: Context
  state: State
  providers: Provider[]
}

export interface TagTemplate {
  interpolation: InterpolatedTemplates,
  string: string,
  strings: string[],
  values: unknown[],
  context: Context,
}

export class ArrayValueNeverSet {
  isArrayValueNeverSet = true
}

export class Tag {
  isTag = true

  clones: (Element | Text | ChildNode)[] = [] // elements on document. Needed at destroy process to know what to destroy
  cloneSubs: Subscription[] = [] // subscriptions created by clones
  children: Tag[] = [] // tags on me

  tagSupport!: TagSupport
  
  // only present when a child of a tag
  ownerTag?: Tag
  // insertBefore?: Element
  appElement?: Element // only seen on this.getAppElement().appElement
  
  // present only when an array. Populated by this.key()
  arrayValue: unknown | ArrayValueNeverSet = new ArrayValueNeverSet()

  constructor(
    public strings: string[],
    public values: any[],
  ) {}

  /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
  key(arrayValue: unknown) {
    this.arrayValue = arrayValue
    return this
  }

  async destroy(
    options: DestroyOptions = {
      stagger: 0,
      byParent: false, // Only destroy clones of direct children
    }
  ) {
    // the isComponent check maybe able to be removed
    const isComponent = this.tagSupport ? true : false    
    if(isComponent) {
      runBeforeDestroy(this.tagSupport, this)    
    }

    this.destroySubscriptions()

    if(this.ownerTag) {
      this.ownerTag.children = this.ownerTag.children.filter(child => child !== this)
    }

    if( !options.byParent ) {
      const {stagger, promise} = this.destroyClones(options)
      options.stagger = stagger
      
      if(promise) {
        await promise
      }
    } else {
      this.destroyClones()
    }

    const promises = this.children.map(kid => kid.destroy({stagger:0, byParent: true}))
    this.children.length = 0
    await Promise.all(promises)

    return options.stagger
  }

  destroySubscriptions() {
    this.cloneSubs.forEach(cloneSub => cloneSub.unsubscribe())
    this.cloneSubs.length = 0
  }

  destroyClones(
    {stagger}: DestroyOptions = {
      stagger: 0,
    }
  ) {
    //const promises = this.clones.reverse().map(
    const promises = this.clones.map(
      clone => this.checkCloneRemoval(clone, stagger)
    ).filter(x => x) // only return promises

    this.clones.length = 0 // tag maybe used for something else
    
    if(promises.length) {
      return {promise: Promise.all(promises), stagger}
    }

    return {stagger}
  }

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
      clone.parentNode?.removeChild(clone)

      const ownerTag = this.ownerTag
      if(ownerTag) {
        // Sometimes my clones were first registered to my owner, remove them from owner
        ownerTag.clones = ownerTag.clones.filter(compareClone => compareClone !== clone)
      }
    }

    if(promise instanceof Promise) {
      return promise.then(next)
    } else {
      next()
    }


    return promise
  }

  updateByTag(tag: Tag) {
    this.updateConfig(tag.strings, tag.values)
    this.tagSupport.templater = tag.tagSupport.templater
    this.tagSupport.propsConfig = {...tag.tagSupport.propsConfig}
    this.tagSupport.newest = tag
    this.tagSupport.templater.newest = tag
  }

  lastTemplateString: string | undefined = undefined // used to compare templates for updates
  
  updateConfig(strings: string[], values: any[]) {
    this.strings = strings
    this.updateValues(values)
  }

  getTemplate(): TagTemplate {
    const string = this.strings.map((string, index) => {
      const safeString = string.replace(prefixSearch, escapeVariable)
      const endString = safeString + (this.values.length > index ? `{${variablePrefix}${index}}` : '')
      // const trimString = index === 0 || index === this.strings.length-1 ? endString.trim() : endString
      const trimString = endString.replace(/>\s*/g,'>').replace(/\s*</g,'<')
      return trimString
    }).join('')

    const interpolation = interpolateString(string)
    this.lastTemplateString = interpolation.string
    return {
      interpolation,
      // string,
      string: interpolation.string,
      strings: this.strings,
      values: this.values,
      context: this.tagSupport?.memory.context || {},
    }
  }

  isLikeTag(tag: Tag) {
    const {string} = tag.getTemplate()

    // TODO: most likely remove?
    if(!this.lastTemplateString) {
      throw new Error('no template here')
    }

    const stringMatched = string === this.lastTemplateString
    if(!stringMatched || tag.values.length !== this.values.length) {
      return false
    }

    const allVarsMatch = tag.values.every((value, index)=> {
      const compareTo = this.values[index]
      const isFunctions = value instanceof Function && compareTo instanceof Function
      
      if(isFunctions) {
        const stringMatch = value.toString() === compareTo.toString()
        if(stringMatch) {
          return true
        }

        return false
      }

      return true
    })

    if(allVarsMatch) {
      return true
    }

    return false
  }

  update() {
    return this.updateContext( this.tagSupport.memory.context )
  }

  updateValues(values: any[]) {
    this.values = values
    return this.updateContext( this.tagSupport.memory.context )
  }

  updateContext(context: Context) {
    const seenContext: string[] = []

    this.strings.map((_string, index) => {
      const variableName = variablePrefix + index
      const hasValue = this.values.length > index
      const value = this.values[index]

      // is something already there?
      const existing = variableName in context
      seenContext.push(variableName)

      if(existing) {
        const existing = context[variableName]
        return updateExistingValue(existing, value, this)
      }

      // 🆕 First time values below
      processNewValue(
        hasValue,
        value,
        context,
        variableName,
        this,
      )      
    })

    // Support reduction in context
    Object.entries(context).forEach(([key, subject]) => {
      if(seenContext.includes(key)) {
        return
      }

      throw new Error('we here')
      const destroyed = checkDestroyPrevious(subject, undefined as any)
    })

    return context
  }

  getAppElement() {
    let tag: Tag = this
    
    while(tag.ownerTag) {
      tag = tag.ownerTag
    }

    return tag
  }

  /** Used during HMR only where static content itself could have been edited */
  rebuild() {
    // const insertBefore = this.insertBefore
    const insertBefore = this.tagSupport.templater.insertBefore

    if(!insertBefore) {
      const err = new Error('Cannot rebuild. Previous insertBefore element is not defined on tag')
      ;(err as any).tag = this
      throw err
    }

    this.buildBeforeElement(insertBefore, {
      forceElement: true,
      counts: {added: 0, removed: 0},
    })
  }

  buildBeforeElement(
    insertBefore: Element | Text,
    options: ElementBuildOptions = {
      forceElement: false,
      counts: {added:0, removed: 0},
    },
  ) {
    // this.insertBefore = insertBefore
    this.tagSupport.templater.insertBefore = insertBefore
    
    const context = this.update()
    const template = this.getTemplate()
    
    const elementContainer = document.createElement('div')
    elementContainer.id = 'tag-temp-holder'
    // render content with a first child that we can know is our first element
    elementContainer.innerHTML = `<template id="temp-template-tag-wrap">${template.string}</template>`

    // Search/replace innerHTML variables but don't interpolate tag components just yet
    const {clones, tagComponents} = interpolateElement(
      elementContainer,
      context,
      template,
      this, // ownerTag,
      {
        forceElement: options.forceElement,
        counts: options.counts
      }
    )

    // remove old clones
    if(this.clones.length) {
      this.clones.forEach(clone => this.checkCloneRemoval(clone, 0))
    }
   
    afterInterpolateElement(
      elementContainer,
      insertBefore,
      this, // ownerTag
      [],
      context,
      options,
    )

    // this.clones.push(...clones)

    // Any tag components that were found should be processed AFTER the owner processes its elements. Avoid double processing of elements attributes like (oninit)=${}
    let isForceElement = options.forceElement
    tagComponents.forEach(tagComponent => {
      const preClones = this.clones.map(clone => clone)

      subscribeToTemplate(
        tagComponent.insertBefore, // temporary,
        tagComponent.subject as TagSubject | TagArraySubject,
        tagComponent.ownerTag,
        options.counts,
        {isForceElement}
      )

      afterInterpolateElement(
        elementContainer,
        insertBefore,
        this,
        preClones,
        context,
        options,
      )

        // remove component clones from ownerTag as they will belong to the components they live on
        /*
        if( preClones.length ) {
          this.clones = this.clones.filter(cloneFilter => !preClones.find(clone => clone === cloneFilter))
        }
        */
    })
  }
}

function afterInterpolateElement(
  container: Element,
  insertBefore: Element | Text | Template,
  ownerTag: Tag,
  preClones: Clones,
  context: Context,
  options: ElementBuildOptions,
) {
  const clones = buildClones(container, insertBefore)

  ownerTag.clones.push( ...clones )
  clones.forEach(clone => afterElmBuild(clone, options, context, ownerTag))

  return clones
}

type DestroyOptions = {
  stagger: number
  byParent?: boolean // who's destroying me? if byParent, ignore possible animations
}

export type ElementBuildOptions = {
  counts: Counts
  forceElement?: boolean
}

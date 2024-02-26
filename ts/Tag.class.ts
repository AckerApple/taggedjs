import { TagSubject } from "./Tag.utils.js"
import { TagSupport } from "./TagSupport.class.js"
import { Provider } from "./providers.js"
import { Subscription } from "./Subject.js"
import { runBeforeDestroy } from "./tagRunner.js"
import { buildClones } from "./render.js"
import { interpolateElement, interpolateString } from "./interpolateElement.js"
import { Counts, afterElmBuild } from "./interpolateTemplate.js"
import { State } from "./set.function.js"
import { elementDestroyCheck } from "./elementDestroyCheck.function.js"
import { updateExistingValue } from "./updateExistingValue.function.js"
import { InterpolatedTemplates } from "./interpolations.js"
import { processNewValue } from "./processNewValue.function.js"

export const variablePrefix = '__tagvar'
export const escapeVariable = '--' + variablePrefix + '--'

const prefixSearch = new RegExp(variablePrefix, 'g')
export const escapeSearch = new RegExp(escapeVariable, 'g')

export type Context = {[index: string]: any}
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

  clones: (Element | Text | ChildNode)[] = [] // elements on document
  cloneSubs: Subscription[] = [] // subscriptions created by clones
  children: Tag[] = [] // tags on me

  tagSupport!: TagSupport
  
  // only present when a child of a tag
  ownerTag?: Tag
  insertBefore?: Element
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
    const promises = this.children.map((kid) => kid.destroy({...options, byParent: true}))

    if(this.ownerTag) {
      this.ownerTag.children = this.ownerTag.children.filter(child => child !== this)
    }

    if( !options.byParent ) {
      options.stagger = await this.destroyClones(options)
    }

    await Promise.all(promises)

    return options.stagger
  }

  destroySubscriptions() {
    this.cloneSubs.forEach(cloneSub => cloneSub.unsubscribe())
    this.cloneSubs.length = 0
  }

  async destroyClones(
    {stagger}: DestroyOptions = {
      stagger: 0,
    }
  ) {
    let hasPromise = false
    const promises = this.clones.reverse().map((clone: any, index: number) => {
      let promise: Promise<unknown> | undefined
      
      if( clone.ondestroy ) {
        promise = elementDestroyCheck(clone, stagger)
      }

      const next = () => {
        clone.parentNode?.removeChild(clone)

        const ownerTag = this.ownerTag
        if(ownerTag) {
          // Sometimes my clones were first registered to my owner, remove them
          ownerTag.clones = ownerTag.clones.filter(compareClone => compareClone !== clone)
        }
      }

      if(promise instanceof Promise) {
        hasPromise = true
        promise.then(next)
      } else {
        next()
      }


      return promise
    })
    
    if(hasPromise) {
      await Promise.all(promises)
    }

    return stagger
  }

  updateByTag(tag: Tag) {
    this.updateConfig(tag.strings, tag.values)
    this.tagSupport.templater = tag.tagSupport.templater
    /*
    this.tagSupport.props = tag.tagSupport.props
    this.tagSupport.latestClonedProps = tag.tagSupport.latestClonedProps
    // TODO: below most likely can be deleted
    this.tagSupport.clonedProps = tag.tagSupport.clonedProps
    */
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
    return this.updateContext(this.tagSupport.memory.context)
  }

  updateContext(context: Context) {
    this.strings.map((_string, index) => {
      const variableName = variablePrefix + index
      const hasValue = this.values.length > index
      const value = this.values[index]

      // is something already there?
      const existing = context[variableName] as TagSubject

      if(existing) {
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
    const insertBefore = this.insertBefore
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
    insertBefore: Element,
    options: ElementBuildOptions = {
      forceElement: false,
      counts: {added:0, removed: 0},
    },
  ): (ChildNode | Element)[] {
    this.insertBefore = insertBefore
    
    const context = this.update()
    const template = this.getTemplate()
    
    const temporary = document.createElement('div')
    temporary.id = 'tag-temp-holder'
    // render content with a first child that we can know is our first element
    temporary.innerHTML = `<template tag-wrap="22">${template.string}</template>`

    // const clonesBefore = this.clones.map(clone => clone)
    const intClones = interpolateElement(
      temporary,
      context,
      template,
      this, // this.ownerTag || this,
      {
        forceElement: options.forceElement,
        counts: options.counts
      }
    )

    this.clones.length = 0
    const clones = buildClones(temporary, insertBefore)
    this.clones.push( ...clones )

    if(intClones.length) {
     this.clones = this.clones.filter(cloneFilter => !intClones.find(clone => clone === cloneFilter))
    }

    this.clones.forEach(clone => afterElmBuild(clone, options))
  
    return this.clones
  }
}

type DestroyOptions = {
  stagger: number
  byParent?: boolean // who's destroying me? if byParent, ignore possible animations
}

export type ElementBuildOptions = {
  counts: Counts
  forceElement?: boolean
}

import { TagSupport, renderTagSupport } from './TagSupport.class'
import { Subscription } from './Subject'
import { runBeforeDestroy } from './tagRunner'
import { buildClones } from './render'
import { interpolateElement, interpolateString } from './interpolateElement'
import { Counts, Template, afterElmBuild, subscribeToTemplate } from './interpolateTemplate'
import { State } from './set.function'
import { elementDestroyCheck } from './elementDestroyCheck.function'
import { InterpolatedTemplates } from './interpolations'
import { processNewValue } from './processNewValue.function'
import { InterpolateSubject } from './processSubjectValue.function'
import { Clones } from './Clones.type'
import { TagSubject } from './Tag.utils'
import { TagArraySubject } from './processTagArray'
import { isSubjectInstance, isTagComponent } from './isInstance'
import { isLikeTags } from './isLikeTags.function'
import { TemplaterResult } from './TemplaterResult.class'
import { destroyTagMemory } from './destroyTag.function'

export const variablePrefix = '__tagvar'
export const escapeVariable = '--' + variablePrefix + '--'

const prefixSearch = new RegExp(variablePrefix, 'g')
export const escapeSearch = new RegExp(escapeVariable, 'g')

export type Context = {
  [index: string]: InterpolateSubject // ValueSubject<unknown>
}
export type TagMemory = {
  // context: Context
  state: State
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
  hasLiveElements = false

  clones: (Element | Text | ChildNode)[] = [] // elements on document. Needed at destroy process to know what to destroy
  cloneSubs: Subscription[] = [] // subscriptions created by clones
  childTags: Tag[] = [] // tags on me

  tagSupport!: TagSupport
  lastTemplateString: string | undefined = undefined // used to compare templates for updates
  
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

  destroy(
    options: DestroyOptions = {
      stagger: 0,
      byParent: false, // Only destroy clones of direct children
    }
  ): Promise<number> {
    if(!this.hasLiveElements) {
      throw new Error('destroying wrong tag')
    }

    // the isComponent check maybe able to be removed
    const isComponent = this.tagSupport ? true : false    
    if(isComponent) {
      runBeforeDestroy(this.tagSupport, this)    
    }

    const childTags = options.byParent ? [] : getChildTagsToDestroy(this.childTags)

    delete this.tagSupport.templater.global.oldest
    delete this.tagSupport.templater.global.newest
    this.hasLiveElements = false
    delete (this.tagSupport.subject as any).tag
    this.destroySubscriptions()
    
    let mainPromise = Promise.resolve() as Promise<unknown> as Promise<(void | undefined)[]>

    if(this.ownerTag) {
      this.ownerTag.childTags = this.ownerTag.childTags.filter(child => child !== this)
    }

    if( !options.byParent ) {
      const {stagger, promise} = this.destroyClones(options)
      options.stagger = stagger
      
      if(promise) {
        mainPromise = promise
      }
    } else {
      this.destroyClones()
    }

    return mainPromise.then(async () => {
      const promises = childTags.map(kid => kid.destroy({stagger:0, byParent: true}))
      await Promise.all(promises)
    }).then(() => options.stagger)
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
      context: this.tagSupport.templater.global.context || {},
    }
  }

  isLikeTag(tag: Tag) {
    return isLikeTags(this, tag)
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

  updateByTag(tag: Tag) {
    if(!this.tagSupport.templater.global.oldest) {
      throw new Error('no oldest here')
    }

    if(!this.hasLiveElements) {
      throw new Error('trying to update a tag with no elements on stage')
    }

    // ???
    // this.tagSupport.propsConfig = {...tag.tagSupport.propsConfig}
    this.tagSupport.templater.global.newest = tag

    if(!this.tagSupport.templater.global.context) {
      throw new Error('issue back here')
    }

    this.updateConfig(tag.strings, tag.values)
  }
  
  updateConfig(strings: string[], values: any[]) {
    this.strings = strings
    this.updateValues(values)
  }

  update() {
    return this.updateContext( this.tagSupport.templater.global.context )
  }

  updateValues(values: any[]) {
    this.values = values
    return this.updateContext( this.tagSupport.templater.global.context )
  }

  updateContext(context: Context) {
    this.strings.map((_string, index) => {
      const variableName = variablePrefix + index
      const hasValue = this.values.length > index
      const value = this.values[index]

      // is something already there?
      const exists = variableName in context

      if(exists) {
        const subject = context[variableName]
        const tag = (subject as any).tag as Tag

        if(tag) {
          const oldWrap = tag.tagSupport.templater.wrapper // tag versus component
          if(oldWrap && isTagComponent(value)) {
            const oldValueFn = oldWrap.original
            const newValueFn = value.wrapper?.original
            const fnMatched = oldValueFn === newValueFn
            if(fnMatched) {
              const newTemp = value as TemplaterResult
              newTemp.global = tag.tagSupport.templater.global
              /*
              const tagSubject = subject as TagSubject
              if(!newTemp.tagSupport) {
                const ownerTagSupport = tag.ownerTag?.tagSupport as TagSupport
                newTemp.tagSupport = new TagSupport(ownerTagSupport, newTemp, tagSubject)
              }

              const redraw = renderTagSupport(newTemp.tagSupport, false)

              if(!isLikeTags(tag, redraw)) {
                destroyTagMemory(tag, subject as TagSubject)
                newTemp.global = {...tag.tagSupport.templater.global}
                newTemp.global.context = {}
                const insertBefore = tag.tagSupport.templater.global.insertBefore as Element
                redraw.buildBeforeElement(insertBefore)
                throw new Error('clone time')
              } else {
                newTemp.global = tag.tagSupport.templater.global
              }
              */
            }
          }
        }

        // return updateExistingValue(subject, value, this)
        if(isSubjectInstance(value)) {
          // value.set(value.value)
          return
        }

        /*
        const subTag = (subject as any).tag
        if(subTag && !subTag.hasLiveElements) {
          return
        }
        */

        subject.set(value)
        return
      }

      if(!hasValue) {
        return
      }

      // 🆕 First time values below
      context[variableName] = processNewValue(
        hasValue,
        value,
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
    // const insertBefore = this.insertBefore
    const insertBefore = this.tagSupport.templater.global.insertBefore

    if(!insertBefore) {
      const err = new Error('Cannot rebuild. Previous insertBefore element is not defined on tag')
      ;(err as any).tag = this
      throw err
    }

    this.buildBeforeElement(insertBefore, {
      forceElement: true,
      counts: {added: 0, removed: 0}, test: false,
    })
  }

  buildBeforeElement(
    insertBefore: Element | Text,
    options: ElementBuildOptions & {test:boolean} = {
      forceElement: false,
      counts: {added:0, removed: 0},
      test: false
    },
  ) {
    if(!insertBefore.parentNode) {
      throw new Error('no parent before removing clones')
    }

    // remove old clones
    if(this.clones.length) {
      this.clones.forEach(clone => this.checkCloneRemoval(clone, 0))
    }

    // this.insertBefore = insertBefore
    this.tagSupport.templater.global.insertBefore = insertBefore
    
    // const context = this.tagSupport.memory.context // this.update()
    const context = this.update()
    const template = this.getTemplate()


    if(!insertBefore.parentNode) {
      throw new Error('no parent before building tag')
    }

    const elementContainer = document.createElement('div')
    elementContainer.id = 'tag-temp-holder'
    // render content with a first child that we can know is our first element
    elementContainer.innerHTML = `<template id="temp-template-tag-wrap">${template.string}</template>`

    // Search/replace innerHTML variables but don't interpolate tag components just yet
    const {tagComponents} = interpolateElement(
      elementContainer,
      context,
      template,
      this, // ownerTag,
      {
        forceElement: options.forceElement,
        counts: options.counts
      },
      options.test,
    )

    if(!insertBefore.parentNode) {
      throw new Error('no parent building tag')
    }

    afterInterpolateElement(
      elementContainer,
      insertBefore,
      this, // ownerTag
      context,
      options,
    )

    // this.clones.push(...clones)

    // Any tag components that were found should be processed AFTER the owner processes its elements. Avoid double processing of elements attributes like (oninit)=${}
    let isForceElement = options.forceElement
    tagComponents.forEach(tagComponent => {
      // const preClones = this.clones.map(clone => clone)

      subscribeToTemplate(
        tagComponent.insertBefore, // temporary,
        tagComponent.subject as TagSubject | TagArraySubject,
        tagComponent.ownerTag,
        options.counts,
        {isForceElement},
        context,
        tagComponent.variableName,
        options.test
      )

      if(!insertBefore.parentNode) {
        throw new Error('no parent building tag components')
      }

      afterInterpolateElement(
        elementContainer,
        insertBefore,
        this,
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

    this.tagSupport.templater.global.oldest = this
    this.tagSupport.templater.global.newest = this
    this.tagSupport.subject.tag = this
    this.hasLiveElements = true
  }
}

function afterInterpolateElement(
  container: Element,
  insertBefore: Element | Text | Template,
  ownerTag: Tag,
  // preClones: Clones,
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

function getChildTagsToDestroy(
  childTags: Tag[],
  allTags: Tag[] = [],
): Tag[] {
  for (let index = childTags.length - 1; index >= 0; --index) {
    const cTag = childTags[index]

    // cTag.destroySubscriptions()

    allTags.push(cTag)

    childTags.splice(index, 1)

    getChildTagsToDestroy(cTag.childTags, allTags)
    /*
    for (let iIndex = this.childTags.length - 1; iIndex >= 0; --iIndex) {
      const iTag = this.childTags[iIndex]
      if(cTag === iTag) {
        this.childTags.splice(iIndex, 1)
      }
    }
    */
  }

  return allTags
}
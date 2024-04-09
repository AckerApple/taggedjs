import { TagSupport } from './TagSupport.class'
import { runBeforeDestroy } from './tagRunner'
import { buildClones } from './render'
import { interpolateElement, interpolateString } from './interpolateElement'
import { Counts, Template, afterElmBuild, subscribeToTemplate } from './interpolateTemplate'
import { State } from './set.function'
import { elementDestroyCheck } from './elementDestroyCheck.function'
import { InterpolatedTemplates } from './interpolations'
import { processNewValue } from './processNewValue.function'
import { InterpolateSubject } from './processSubjectValue.function'
import { TagSubject } from './Tag.utils'
import { TagArraySubject } from './processTagArray'
import { isSubjectInstance, isTagComponent } from './isInstance'
import { isLikeTags } from './isLikeTags.function'
import { InsertBefore, isRemoveTemplates } from './Clones.type'

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
  version = 0
  isTag = true
  hasLiveElements = false

  clones: (Element | Text | ChildNode)[] = [] // elements on document. Needed at destroy process to know what to destroy
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

    const tagSupport = this.tagSupport
    const global = tagSupport.templater.global
    // removing is considered rendering. Prevents after event processing of this tag even tho possibly deleted
    // ++this.tagSupport.templater.global.renderCount

    const subject = tagSupport.subject
    
    // put back down the template tag
    const templateTag = global.insertBefore as Element
    
    if(isRemoveTemplates) {
      const placeholder = global.placeholderElm as Element
      console.log('destroy swap', {
        templateTag,
        placeholder,
        tempParent: templateTag.parentNode,
        placeParent: placeholder?.parentNode,
      })

      if(placeholder) {
        const parentNode = placeholder.parentNode as ParentNode
        parentNode.insertBefore(templateTag, placeholder)
        this.clones.push(placeholder) // setup to be deleted below
      }
    }
    delete global.placeholderElm

    // the isComponent check maybe able to be removed
    const isComponent = tagSupport ? true : false    
    if(isComponent) {
      runBeforeDestroy(tagSupport, this)    
    }

    const childTags = options.byParent ? [] : getChildTagsToDestroy(this.childTags)

    // signify that no further event rendering should take place by making logic think a render occurred during event
    // childTags.forEach(child => ++child.tagSupport.templater.global.renderCount)
    // signify immediately child has been deleted (looked for during event processing)
    childTags.forEach(child => {
      const subGlobal = child.tagSupport.templater.global
      delete subGlobal.newest
      subGlobal.deleted = true
    })

    delete global.oldest
    delete global.newest
    global.deleted = true
    this.hasLiveElements = false
    delete subject.tag
    this.destroySubscriptions()
    
    let mainPromise: Promise<number | (number | void | undefined)[]> | undefined

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
    const global = this.tagSupport.templater.global
    global.subscriptions.forEach(cloneSub => cloneSub.unsubscribe())
    global.subscriptions.length = 0
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
        return updateContextItem(context, variableName, value)
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
      counts: {added: 0, removed: 0},
    })
  }

  buildBeforeElement(
    insertBefore: Element | Text | ChildNode,
    options: ElementBuildOptions = {
      forceElement: false,
      counts: {added:0, removed: 0},
    },
  ) {
    if(!insertBefore.parentNode) {
      console.log('!!!', {
        insertBefore,
        myPlaceholderElm: this.tagSupport.templater.global.placeholderElm,
        myInsertBefore: this.tagSupport.templater.global.insertBefore,
      })
      throw new Error('no parent before removing clones')
    }

    const subject = this.tagSupport.subject
    
    if(isRemoveTemplates) {
      const global = this.tagSupport.templater.global
      const placeholderElm = global.placeholderElm
      console.log('buildBeforeElement', {
        insertBefore,
        placeholderElm,
        equal: insertBefore === placeholderElm
      })

      if(placeholderElm) {
        const parentNode = placeholderElm.parentNode as ParentNode
        
        parentNode.insertBefore(
          insertBefore,
          placeholderElm,
        )

        this.clones.push( placeholderElm ) // put back on chopping block
        delete global.placeholderElm

        console.log('build put template back down', {
          equal: insertBefore === placeholderElm,
          insertBefore,
          placeholderElm,
          iParent: insertBefore.parentNode,
          placeParent: placeholderElm.parentNode,
        })
      }
    }
    
    const trueInsertBefore = insertBefore
    const thisTemplater = this.tagSupport.templater
    thisTemplater.global.oldest = this
    thisTemplater.global.newest = this
    subject.tag = this
    this.hasLiveElements = true

    // remove old clones
    if(this.clones.length) {
      this.clones.forEach(clone => this.checkCloneRemoval(clone, 0))
    }

    thisTemplater.global.insertBefore = insertBefore
    
    // const context = this.tagSupport.memory.context // this.update()
    const context = this.update()
    const template = this.getTemplate()

    if(!trueInsertBefore.parentNode) {
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
    )

    if(!trueInsertBefore.parentNode) {
      throw new Error('no parent building tag')
    }

    afterInterpolateElement(
      elementContainer,
      trueInsertBefore, // insertBefore,
      this, // ownerTag
      context,
      options,
    )

    // Any tag components that were found should be processed AFTER the owner processes its elements. Avoid double processing of elements attributes like (oninit)=${}
    let isForceElement = options.forceElement
    tagComponents.forEach(tagComponent => {
      subscribeToTemplate(
        tagComponent.insertBefore,
        tagComponent.subject as TagSubject | TagArraySubject,
        tagComponent.ownerTag,
        options.counts,
        {isForceElement},
      )

      const placeholderElm = this.tagSupport.templater.global.placeholderElm
      if(placeholderElm) {
        if(!placeholderElm.parentNode) {
          throw new Error('no subject parent building tag components')
        }
      } else if(!insertBefore.parentNode) {
        console.log('no parent', {
          insertBefore,
          subject,
        })
        throw new Error('no parent building tag components')
      }

      afterInterpolateElement(
        elementContainer,
        insertBefore, // tagComponent.insertBefore, // insertBefore,
        tagComponent.ownerTag, // this, // ownerTag
        context,
        options,
      )
    })
  }
}

function afterInterpolateElement(
  container: Element,
  insertBefore: InsertBefore,
  ownerTag: Tag,
  // preClones: Clones,
  context: Context,
  options: ElementBuildOptions,
) {
  const ownerSupport = ownerTag.tagSupport
  const ownerGlobal = ownerSupport.templater.global
  const clones = buildClones(container, insertBefore)
  const hadBefore = isRemoveTemplates && ownerGlobal.placeholderElm
  const parentNode = hadBefore ? ownerGlobal.placeholderElm?.parentNode as ParentNode : insertBefore.parentNode as ParentNode

  if(hadBefore) {
    // put the template back down
    insertAfter(insertBefore, hadBefore)
    delete ownerGlobal.placeholderElm
    // throw new Error('maybe issue here?')
  }

  if(!clones.length) {
    return clones
  }
  
  clones.forEach(clone => afterElmBuild(clone, options, context, ownerTag))

  let hasPopClone = false
  if(isRemoveTemplates) {
    const clone = clones.pop()

    if(clone) {
      hasPopClone = true
      ownerGlobal.placeholderElm = clone // insertBefore
      console.log('clone', {clone, length: clones.length})
    }
  }

  ownerTag.clones.push( ...clones )
  
  if(isRemoveTemplates && hasPopClone) {
    console.log('remove child - insertBefore', {
      insertBefore,
      // clone
    })
    parentNode.removeChild(insertBefore)
  }

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

    if(allTags.find(x => x === cTag)) {
      // TODO: Lets find why a child tag is attached twice to owner
      throw new Error('child tag registered twice for delete')
    }

    allTags.push(cTag)

    childTags.splice(index, 1)

    getChildTagsToDestroy(cTag.childTags, allTags)
  }

  return allTags
}

function updateContextItem(
  context: Context,
  variableName: string,
  value: any
) {
  const subject = context[variableName]
  const tag = (subject as any).tag as Tag

  if(tag) {
    const oldTemp = tag.tagSupport.templater
    const oldWrap = oldTemp.wrapper // tag versus component
    if(value.global !== oldTemp.global) {
      if(oldWrap && isTagComponent(value)) {
        const oldValueFn = oldWrap.original
        const newValueFn = value.wrapper?.original
        const fnMatched = oldValueFn === newValueFn
  
        if(fnMatched) {
          value.global = oldTemp.global
        }
      }
    }
  }

  // return updateExistingValue(subject, value, this)
  if(isSubjectInstance(value)) {
    return
  }

  subject.set(value) // listeners will evaluate updated values to possibly update display(s)
  
  return
}

// Function to insert element after reference element
export function insertAfter(
  newNode: InsertBefore,
  referenceNode: InsertBefore
) {
  const parentNode = referenceNode.parentNode as ParentNode
  parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

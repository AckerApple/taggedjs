import { ValueSubject } from "./ValueSubject.js"
import { deepEqual } from "./deepFunctions.js"
import { isTagComponent } from "./interpolateTemplate.js"
import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { config as states } from "./state.js"
import { config as providers } from "./providers.js"

export const variablePrefix = '__tagVar'
export const escapeVariable = '--' + variablePrefix + '--'

const prefixSearch = new RegExp(variablePrefix, 'g')
export const escapeSearch = new RegExp(escapeVariable, 'g')

export class Provider {
  instance = Object
  clone = Object
  constructorMethod = Object
}

const tagUse = [{
  beforeRedraw: tag => {
    states.currentTag = tag
    if(tag.states.length) {
      states.rearray.push(...tag.states)
    }
  },
  afterRender: tag => {
    if(states.rearray.length) {
      if(states.rearray.length !== states.array.length) {
        throw new Error(`States lengths mismatched ${states.rearray.length} !== ${states.array.length}`)
      }
    }

    states.rearray.length = 0 // clean up any previous runs

    tag.states = [...states.array]
    states.array.length = 0
  }
},{ // providers
  beforeRedraw: tag => {
    providers.currentTag = tag
    providers.ownerTag = tag.ownerTag
    if(tag.providers.length) {
      providers.rearray.push(...tag.providers)
    }
  },
  afterRender: tag => {
    if(providers.rearray.length) {
      if(providers.rearray.length !== providers.array.length) {
        throw new Error(`Providers lengths mismatched ${providers.rearray.length} !== ${providers.array.length}`)
      }
    }

    providers.rearray.length = 0 // clean up any previous runs

    tag.providers = [...providers.array]
    providers.array.length = 0
  }
}]

export class Tag {
  context = {} // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  clones = [] // elements on document
  cloneSubs = [] // subscriptions created by clones
  children = [] // tags on me

  /** @type {TagSupport} */
  tagSupport
  
  // only present when a child of a tag
  // ownerTag: Tag
  
  // present only when an array. Populated by this.key()
  // arrayValue: any[]

  constructor(strings, values) {
    this.strings = strings
    this.values = values
  }

  /**
   * @template T
   * @type {((x: T) => [T, T])[]} */
  states = []

  /**
   * @template T
   * @type {(Provider)[]} */
  providers = []

  beforeRedraw() {
    tagUse.forEach(tagUse => tagUse.beforeRedraw(this))
  }

  afterRender() {
    tagUse.forEach(tagUse => tagUse.afterRender(this))
  }

  /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
  key(arrayValue) {
    this.arrayValue = arrayValue
    return this
  }

  destroy(
    stagger = 0,
    byParent, // who's destroying me? if byParent, ignore possible animations
  ) {
    this.children.forEach((kid, index) => kid.destroy(0, true))
    this.destroySubscriptions()

    if(!byParent) {
      const result = this.destroyClones(stagger)
      stagger = result.stagger
    }

    return stagger
  }

  destroySubscriptions() {
    this.cloneSubs.forEach(cloneSub => cloneSub.unsubscribe())
    this.cloneSubs.length = 0
  }

  destroyClones(
    stagger = 0,
  ) {
    this.clones.reverse().forEach((clone, index) => {
      let promise = Promise.resolve()
      if(clone.ondestroy) {
        promise = elementDestroyCheck(clone, stagger)
      }

      promise.then(() =>
        clone.parentNode.removeChild(clone)
      )
    })
    this.clones.length = 0
    
    return stagger
  }

  updateByTag(tag) {
    this.updateConfig(tag.strings, tag.values)
    this.tagSupport.templater = tag.tagSupport.templater
  }

  lastTemplateString = undefined // used to compare templates for updates

  /** A method of passing down the same render method */
  setSupport(tagSupport) {
    this.tagSupport = this.tagSupport || tagSupport
    this.tagSupport.mutatingRender = this.tagSupport.mutatingRender || tagSupport.mutatingRender
    this.children.forEach(kid => kid.setSupport(tagSupport))
  }
  
  updateConfig(strings, values) {
    this.strings = strings
    this.updateValues(values)
  }

  getTemplate() {
    // TODO: treat interpolation hack here
    const string = this.lastTemplateString = this.strings.map((string, index) => {
      const safeString = string.replace(prefixSearch, escapeVariable)
      const endString = safeString + (this.values.length > index ? `{${variablePrefix}${index}}` : '')
      return endString
    }).join('')

    return { string, strings: this.strings, values: this.values, context:this.context }
  }

  isLikeTag(tag) {
    if(tag.lastTemplateString !== this.lastTemplateString) {
      return false
    }

    if(tag.values.length !== this.values.length) {
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

      if(value instanceof Tag && compareTo instanceof Tag) {        
        value.ownerTag = this // let children know I own them
        this.children.push(value) // record children I created        
        value.lastTemplateString || value.getTemplate().string // ensure last template string is generated

        if(value.isLikeTag(compareTo)) {
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
    return this.updateContext( this.context )
  }

  updateValues(values, topDown) {
    this.values = values
    return this.updateContext(this.context, topDown)
  }

  updateContext(context) {
    this.strings.map((_string, index) => {
      const variableName = variablePrefix + index
      const hasValue = this.values.length > index
      const value = this.values[index]

      // is something already there?
      const existing = context[variableName]

      if(existing) {
        /** @type {Tag | undefined} */
        const ogTag = existing.value?.tag

        // handle already seen tag components
        if(isTagComponent(value)) {
          const latestProps = value.cloneProps
          const existingTag = existing.tag

          // previously was something else, now a tag component
          if(!existing.tag) {
            setValueRedraw(value, existing, this)
            value.redraw(latestProps)
            return
          }

          const oldTagSetup = existingTag.tagSupport
          const tagSupport = value.tagSupport || oldTagSetup || getTagSupport(value)
          const oldCloneProps = tagSupport.templater?.cloneProps
          const oldProps = tagSupport.templater?.props

          if(existingTag) {
            const isCommonEqual = oldProps === undefined && oldProps === latestProps
            const equal = isCommonEqual || deepEqual(oldCloneProps, latestProps)  
            if(equal) {
              return
            }
          }
          
          setValueRedraw(value, existing, this)
          oldTagSetup.templater = value
          existing.value.tag = oldTagSetup.newest = value.redraw(latestProps)
          return
        }

        // handle already seen tags
        if(ogTag) {
          const tagSupport = ogTag.tagSupport
          const templater = value
          
          tagSupport.oldest.beforeRedraw()

          const retag = templater(tagSupport)
          
          templater.newest = retag
          tagSupport.oldest.afterRender()          
          ogTag.updateByTag(retag)
          existing.set(value)
          
          return
        }
        
        // now its a function
        if(value instanceof Function) {
          existing.set(bindSubjectFunction(value, this))
          return
        }

        existing.set(value) // let ValueSubject now of newest value
        
        return
      }

      // First time values below

      if(isTagComponent(value)) {
        const existing = context[variableName] = new ValueSubject(value)
        setValueRedraw(value, existing, this)
        return
      }

      if(value instanceof Function) {
        context[variableName] = getSubjectFunction(value, this)
        return
      }

      if(!hasValue) {
        return // more strings than values, stop here
      }

      if(value instanceof Tag) {
        value.ownerTag = this
        this.children.push(value)
      }

      context[variableName] = new ValueSubject(value)
    })

    return context
  }

  getAppElement() {
    let tag = this
    
    while(tag.ownerTag) {
      tag = tag.ownerTag
    }

    return tag
  }
}

function getSubjectFunction(value, tag) {
  return new ValueSubject(bindSubjectFunction(value, tag))
}

/**
 * @param {*} value 
 * @param {Tag} tag 
 * @returns 
 */
function bindSubjectFunction(value, tag) {
  function subjectFunction(element, args) {
    const renderCount = tag.tagSupport.renderCount

    const callbackResult = value.bind(element)(...args)

    if(renderCount !== tag.tagSupport.renderCount) {
      return // already rendered
    }

    tag.tagSupport.render()
    
    if(callbackResult instanceof Promise) {
      callbackResult.then(() => {
        tag.tagSupport.render()
      })
    }

    return callbackResult
  }

  subjectFunction.tagFunction = value

  return subjectFunction
}

const ExistingValue = {
  tagSupport: TagSupport,
  tag: new Tag,
}

/**
 * 
 * @param {*} templater 
 * @param {ExistingValue} existing 
 * @param {Tag} ownerTag 
 */
function setValueRedraw(
  templater, // latest tag function to call for rendering
  existing,
  ownerTag,
) {
  // redraw does not communicate to parent
  templater.redraw = () => {
    // Find previous variables
    const existingTag = existing.tag
    const tagSupport = existingTag?.tagSupport || getTagSupport(templater) // this.tagSupport

    // signify to other operations that a rendering has occurred so they do not need to render again
    ++tagSupport.renderCount

    existing.tagSupport = tagSupport
    tagSupport.mutatingRender = tagSupport.mutatingRender || existing.tagSupport?.mutatingRender || this.tagSupport.mutatingRender
    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

    if(tagSupport.oldest) {
      tagSupport.oldest.beforeRedraw()
    } else {
      providers.ownerTag = runtimeOwnerTag
    }

    const retag = templater(tagSupport)

    if(tagSupport.oldest) {
      tagSupport.oldest.afterRender()
    } else {
      retag.afterRender()
    }
    
    templater.newest = retag
    retag.ownerTag = runtimeOwnerTag

    tagSupport.oldest = tagSupport.oldest || retag
    tagSupport.newest = retag

    const oldestTagSupport = tagSupport.oldest.tagSupport
    tagSupport.oldest.tagSupport = oldestTagSupport || tagSupport
    tagSupport.oldest.tagSupport.templater = templater

    // retag.getTemplate() // cause lastTemplateString to render
    retag.setSupport(tagSupport)
    const isSameTag = existingTag && existingTag.isLikeTag(retag)

    // If previously was a tag and seems to be same tag, then just update current tag with new values
    if(isSameTag) {
      tagSupport.oldest.updateByTag(retag)
      return
    }

    existing.set(templater)

    return retag
  }
}

function elementDestroyCheck(
  nextSibling,
  stagger,
) {
  const onDestroyDoubleWrap = nextSibling.ondestroy // nextSibling.getAttribute('onDestroy')
  if(!onDestroyDoubleWrap) {
    return
  }

  const onDestroyWrap = onDestroyDoubleWrap.tagFunction
  if(!onDestroyWrap) {
    return
  }

  const onDestroy = onDestroyWrap.tagFunction
  if(!onDestroy) {
    return
  }

  const event = {target: nextSibling, stagger}
  return onDestroy(event)
}

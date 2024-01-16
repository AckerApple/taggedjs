import { Context, ElementBuildOptions, Tag, variablePrefix } from "./Tag.class.js"
import { isSubjectInstance, isTagComponent, isTagInstance } from "./isInstance.js"
import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { config as providers } from "./providers.js"
import { InterpolateOptions } from "./interpolateElement.js"
import { elementInitCheck } from "./elementInitCheck.js"
import { processTagArray } from "./processTagArray.js"
import { runBeforeRender } from "./tagRunner.js"
import { TemplaterResult } from "./tag.js"

export function interpolateTemplate(
  template: Template, // <template end interpolate /> (will be removed)
  context: Context, // variable scope of {`__tagVar${index}`:'x'}
  ownerTag: Tag, // Tag class
  counts: Counts, // {added:0, removed:0}
  {forceElement}: InterpolateOptions,
) {
  if ( !template.hasAttribute('end') ) {
    return // only care about starts
  }

  const variableName = template.getAttribute('id')
  if(variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
    return // ignore, not a tagVar
  }

  const result = context[variableName]
  const isSubject = isSubjectInstance(result)
    
  /*if(forceElement && isSubject) {
    result = result.value
    isSubject = false
  }*/

  // TODO: Need to just check if it can be subscribed to
  if( isSubject ) {
    const callback = (templateNewValue: any) => {
      processSubjectValue(
        templateNewValue,
        result,
        template,
        ownerTag,
        {counts, forceElement}
      )

      setTimeout(() => {
        counts.added = 0 // reset
        counts.removed = 0 // reset
      }, 0)
    }

    const sub = result.subscribe(callback as any)
    ownerTag.cloneSubs.push(sub)

    /*if(forceElement) {
      callback(result.value)
    }*/

    return
  }

  const before = template.clone || template

  const clone = updateBetweenTemplates(
    result,
    before, // The element set here will be removed from document
  )
  
  ownerTag.clones.push(clone)
  template.clone = clone
  
  return
}

export type Template = Element & {clone: any}

function processSubjectValue(
  value: any,
  result: any, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag,
  options: {counts: Counts, forceElement?: boolean}, // {added:0, removed:0}
) {
  if (isTagInstance(value)) {
    // first time seeing this tag?
    if(!value.tagSupport) {
      value.tagSupport = getTagSupport( ownerTag.tagSupport.depth + 1 )
      value.tagSupport.mutatingRender = ownerTag.tagSupport.mutatingRender
      value.tagSupport.oldest = value.tagSupport.oldest || value
      
      ownerTag.children.push(value as Tag)
      value.ownerTag = ownerTag
    }

    processTagResult(
      value,
      result, // Function will attach result.tag
      template,
      options,
    )

    return
  }

  // *for map
  const isArray = value instanceof Array && value.every(x => isTagInstance(x))
  if(isArray) {
    return processTagArray(result, value, template, ownerTag, options)
  }

  if(isTagComponent(value)) {
    return processSubjectComponent(value, result, template, ownerTag, options)
  }

  // *if processing WAS a tag BUT NOW its some other non-tag value
  if (result.tag) {
    // put the template back
    const lastFirstChild = template.clone || template// result.tag.clones[0] // template.lastFirstChild
    lastFirstChild.parentNode.insertBefore(template, lastFirstChild)

    const stagger = options.counts.removed
    const tag: Tag = result.tag
    const animated = tag.destroy({stagger})
    options.counts.removed = stagger + animated
    delete result.tag
  
    const clone = updateBetweenTemplates(
      value,
      lastFirstChild // ✅ this will be removed
    ) // the template will be remove in here

    template.clone = clone

    return
  }

  const before = template.clone || template // Either the template is on the doc OR its the first element we last put on doc

  // Processing of regular values
  const clone = updateBetweenTemplates(
    value,
    before, // this will be removed
  )

  template.clone = clone

  const oldPos = ownerTag.clones.indexOf(before)
  if(oldPos>=0 && !ownerTag.clones.includes(clone) && !before.parentNode) {
    ownerTag.clones.splice(oldPos, 1)
    ownerTag.clones.push(clone)    
  }
}

// Function to update the value of x
export function updateBetweenTemplates(
  value: any,
  lastFirstChild: Element,
) {
  const parent = lastFirstChild.parentNode as ParentNode
  
  // mimic React skipping to display EXCEPT for true does display on page
  if(value === undefined || value === false || value === null) { // || value === true
    value = ''
  }

  // Insert the new value (never use innerHTML here)
  const textNode = document.createTextNode(value) // never innerHTML
  parent.insertBefore(textNode, lastFirstChild)

  /* remove existing nodes */
  parent.removeChild(lastFirstChild)
  if(lastFirstChild.nodeName === 'TEMPLATE') {
    lastFirstChild.setAttribute('removeAt', Date.now().toString())
  }
  
  return textNode
}

export type Counts = {
  added: number
  removed: number
}

/** Returns {clones:[], subs:[]} */
export function processTagResult(
  tag: Tag,
  result: any, // used for recording past and current value
  insertBefore: Element, // <template end interpolate />
  {
    index, counts, forceElement,
  }: {
    index?: number
    counts: Counts
    forceElement?: boolean
  }
) {
  // *for
  if(index !== undefined) {
    const existing = result.lastArray[index]

    if(existing?.tag.isLikeTag(tag)) {
      existing.tag.updateByTag(tag)
      return
    }

    const lastFirstChild = insertBefore // tag.clones[0] // insertBefore.lastFirstChild
    
    tag.buildBeforeElement(lastFirstChild, {counts, forceElement, depth: tag.tagSupport.depth + 1})
    
    result.lastArray.push({
      tag, index
    })
    
    return
  }

  // *if appears we already have seen
  if(result.tag && !forceElement) {
    // are we just updating an if we already had?
    if(result.tag.isLikeTag(tag)) {
      // components
      if(result instanceof Function) {
        const newTag = result(result.tag.tagSupport)
        result.tag.updateByTag(newTag)
        return
      }

      result.tag.updateByTag(tag)
      
      return
    }    
  }

  // *if just now appearing to be a Tag
  const before = (insertBefore as any).clone || insertBefore

  tag.buildBeforeElement(before, {counts, forceElement, depth: tag.tagSupport.depth})
  result.tag = tag // let reprocessing know we saw this previously as an if

  return
}

function processSubjectComponent(
  value: unknown,
  result: any,
  template: Element,
  ownerTag: Tag,
  options: {counts: Counts, forceElement?: boolean},
) {
  const anyValue = value as Function & {tagged?: boolean}
  if(anyValue.tagged !== true) {
    let name: string | undefined = anyValue.name || anyValue.constructor?.name

    if(name === 'Function') {
      name = undefined
    }

    const label = name || anyValue.toString().substring(0,120)
    const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`)
    throw error
  }

  const templater = value as TemplaterResult
  const tagSupport: TagSupport = result.tagSupport || getTagSupport(ownerTag.tagSupport.depth+1, templater )
  
  tagSupport.mutatingRender = () => {
    // Is this NOT my first render
    if(result.tag) {
      const exit = tagSupport.renderExistingTag(result.tag, templater)
      if(exit) {
        return
      }
    }

    // draw to my parent
    const newest = tagSupport.newest = ownerTag.tagSupport.render()
    return newest
  }

  let tag = templater.newest as Tag
  providers.ownerTag = ownerTag
  const isFirstTime = !tag
  runBeforeRender(tagSupport, tag)

  if(isFirstTime) {
    tag = templater.forceRenderTemplate(tagSupport, ownerTag)
  }
  
  ownerTag.children.push(tag)
  tag.setSupport(tagSupport)

  processTagResult(
    tag,
    result, // The element set here will be removed from document. Also result.tag will be added in here
    template, // <template end interpolate /> (will be removed)
    options,
  )

  return
}

export function afterElmBuild(
  elm: Element | ChildNode,
  options: ElementBuildOptions,
) {
  if(!(elm as Element).getAttribute) {
    return
  }

  if(!options.forceElement) {
    elementInitCheck(elm, options.counts)
  }

  if((elm as Element).children) {
    new Array(...(elm as Element).children as any).forEach(child => afterElmBuild(child, options))
  }
}

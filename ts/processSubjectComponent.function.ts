import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { runBeforeRedraw, runBeforeRender } from "./tagRunner.js"
import { TemplaterResult } from "./tag.js"
import { setUse } from "./setUse.function.js"
import { Counts } from "./interpolateTemplate.js"
import { Tag } from "./Tag.class.js"
import { processTagResult } from "./processTagResult.function.js"

export function processSubjectComponent(
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
  
  const providers = setUse.memory.providerConfig
  providers.ownerTag = ownerTag
  
  const isFirstTime = !tag || options.forceElement
  
  if(isFirstTime) {
    if(!tag) {
      runBeforeRender(tagSupport, tag)
    }
  
    // only true when options.forceElement
    if(tag) {
      runBeforeRedraw(tagSupport, tag)
    }
  
    tag = templater.forceRenderTemplate(tagSupport, ownerTag)
  }
  
  ownerTag.children.push(tag)
  tag.setSupport(tagSupport)

  const clones = processTagResult(
    tag,
    result, // The element set here will be removed from document. Also result.tag will be added in here
    template, // <template end interpolate /> (will be removed)
    options,
  )

  return clones
}

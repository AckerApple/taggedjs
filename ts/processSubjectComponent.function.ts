import { TagSupport } from "./TagSupport.class.js"
import { runBeforeRedraw, runBeforeRender } from "./tagRunner.js"
import { TemplaterResult } from "./templater.utils.js"
import { setUse } from "./setUse.function.js"
import { Counts } from "./interpolateTemplate.js"
import { Tag } from "./Tag.class.js"
import { processTagResult } from "./processTagResult.function.js"
import { TagSubject } from "./Tag.utils.js"

export function processSubjectComponent(
  value: TemplaterResult,
  result: TagSubject,
  template: Element,
  ownerTag: Tag,
  options: {counts: Counts, forceElement?: boolean},
) {
  // TODO: This below check not needed in production mode
  if(value.tagged !== true) {
    let name: string | undefined = value.wrapper.original.name || value.wrapper.original.constructor?.name

    if(name === 'Function') {
      name = undefined
    }

    const label = name || value.wrapper.original.toString().substring(0,120)
    const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`)
    throw error
  }

  const templater = value as TemplaterResult
  const tagSupport: TagSupport = value.tagSupport

  let retag = templater.newest as Tag
  
  const providers = setUse.memory.providerConfig
  providers.ownerTag = ownerTag
  
  const isFirstTime = !retag || options.forceElement

  if(isFirstTime) {
    if(retag) {
      runBeforeRedraw(tagSupport, retag)
    } else {
      runBeforeRender(tagSupport, ownerTag)
    }
  
    retag = templater.forceRenderTemplate(tagSupport, ownerTag)

    templater.newest = retag
  }
  
  ownerTag.children.push(retag)

  tagSupport.templater = retag.tagSupport.templater
  
  const clones = processTagResult(
    retag,
    result, // The element set here will be removed from document. Also result.tag will be added in here
    template, // <template end interpolate /> (will be removed)
    options,
  )

  return clones
}

import { Props } from "./Props.js"
import { Tag, TagMemory } from "./Tag.class.js"
import { deepClone, deepEqual } from "./deepFunctions.js"
import { Provider } from "./providers.js"
import { TemplateRedraw, TemplaterResult, getNewProps } from "./templater.utils.js"

/*
{    
  depth,
}
*/

export class TagSupport {
  depth: number = 0 // TODO: maybe remove

  // props from **constructor** are converted for comparing over renders
  clonedProps: Props
  latestProps: Props // new props NOT cloned props
  latestClonedProps: Props
  
  memory: TagMemory = {
    context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    state: {
      newest: [],
    },
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
  }

  constructor(
    public templater: TemplaterResult,
    public props?: Props,  // natural props
  ) {
    this.latestProps = props // getNewProps(props, templater)
    
    const latestProps = getNewProps(props, templater)
    this.latestClonedProps = deepClone( latestProps )

    this.clonedProps = this.latestClonedProps
  }

  // TODO: these below may not be in use
  oldest?: Tag
  newest?: Tag

  hasPropChanges(
    props: any, // natural props
    pastCloneProps: any, // previously cloned props
    compareToProps: any, // new props NOT cloned props
  ) {
    const oldProps = this.props
    const isCommonEqual = props === undefined && props === compareToProps
    const isEqual = isCommonEqual || deepEqual(pastCloneProps, oldProps)
    return !isEqual
  }

  mutatingRender(): Tag {
    const message = 'Tag function "render()" was called in sync but can only be called async'
    console.error(message, {tagSupport: this})
    throw new Error(message)
  } // loaded later and only callable async

  render () {
    ++this.memory.renderCount
    return this.mutatingRender()
  } // ensure this function still works even during deconstructing

  renderExistingTag(
    tag: Tag,
    newTemplater: TemplaterResult,
  ): boolean {
    const preRenderCount = this.memory.renderCount
    providersChangeCheck(tag)
  
    // When the providers were checked, a render to myself occurred and I do not need to re-render again
    if(preRenderCount !== this.memory.renderCount) {
      return true
    }
  
    const oldTemplater = tag.tagSupport.templater
    const nowProps = newTemplater.tagSupport.props // natural props
    const oldProps = oldTemplater?.tagSupport.props // previously cloned props
    const newProps = newTemplater.tagSupport.clonedProps // new props cloned

    return renderTag(
      this,
      nowProps,
      oldProps,
      newProps,
      this.templater as TemplateRedraw,
    )
  }
}

export function getTagSupport(
  depth: number,
  templater: TemplaterResult,
  props?: Props,
): TagSupport {  
  const tagSupport: TagSupport = new TagSupport(templater, props)
  tagSupport.depth = depth
  return tagSupport
}

function providersChangeCheck(tag: Tag) {
  const providersWithChanges = tag.tagSupport.memory.providers.filter(provider => {
    return !deepEqual(provider.instance, provider.clone)
  })

  // reset clones
  providersWithChanges.forEach(provider => {
    const appElement = tag.getAppElement()

    handleProviderChanges(appElement, provider)

    provider.clone = deepClone(provider.instance)
  })
}

function handleProviderChanges(
  appElement: Tag,
  provider: Provider,
) {
  const tagsWithProvider = getTagsWithProvider(appElement, provider)

  tagsWithProvider.forEach(({tag, renderCount, provider}) => {
    const unRendered = renderCount === tag.tagSupport.memory.renderCount
    if(unRendered) {
      provider.clone = deepClone(provider.instance)
      tag.tagSupport.render()
    }
  })
}

function getTagsWithProvider(
  tag: Tag,
  provider: Provider,
  memory: {
    tag: Tag
    renderCount: number
    provider: Provider
  }[] = []
) {
  const hasProvider = tag.tagSupport.memory.providers.find(xProvider => xProvider.constructMethod === provider.constructMethod)
  
  if(hasProvider) {
    memory.push({
      tag,
      renderCount: tag.tagSupport.memory.renderCount,
      provider: hasProvider
    })
  }

  tag.children.forEach(child => getTagsWithProvider(child, provider, memory))

  return memory
}

function renderTag(
  tagSupport: TagSupport,
  nowProps: any, // natural props
  oldProps: any, // previously NOT cloned props
  newProps: any, // now props cloned
  templater: TemplateRedraw,
) {
  const hasPropsChanged = tagSupport.hasPropChanges(
    nowProps,
    newProps,
    oldProps, // not cloned
  )

  tagSupport.newest = templater.redraw() // No change detected, just redraw me only

  if(!hasPropsChanged) {
    return true
  }

  return false
}

import { Tag, TagMemory } from "./Tag.class.js"
import { deepClone, deepEqual } from "./deepFunctions.js"
import { Provider } from "./providers.js"
import { TemplaterResult } from "./tag.js"

export interface TagSupport {
  depth: number
  memory: TagMemory
  templater?: TemplaterResult

  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: 0
  
  mutatingRender: (force?: boolean) => any
  
  render: (force?: boolean) => any
  renderExistingTag: (tag: Tag, newTemplater: TemplaterResult,) => boolean

  /**
   * 
   * @param {*} props value.props
   * @param {*} newProps value.newProps
   * @param {*} compareToProps compareSupport.templater.props
   * @returns {boolean}
   */
  hasPropChanges: (
    props: any,
    newProps: any,
    compareToProps: any,
  ) => boolean,

  oldest?: Tag
  newest?: Tag
}

export function getTagSupport(
  depth: number,
  templater?: TemplaterResult,
): TagSupport {
  const tagSupport: TagSupport = {
    templater,
    renderCount: 0,
    depth,
    memory: {
      context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
      state: {
        newest: [],
      }
    },
    mutatingRender: () => {
      const message = 'Tag function "render()" was called in sync but can only be called async'
      console.error(message, {tagSupport})
      throw new Error(message)
    }, // loaded later and only callable async
    render: (force?: boolean) => {
      ++tagSupport.renderCount
      return tagSupport.mutatingRender(force)
    }, // ensure this function still works even during deconstructing

    renderExistingTag: (
      tag: Tag,
      newTemplater: TemplaterResult,
    ): boolean => {
      const preRenderCount = tagSupport.renderCount
      providersChangeCheck(tag)

      // When the providers were checked, a render to myself occurred and I do not need to re-render again
      if(preRenderCount !== tagSupport.renderCount) {
        return true
      }

      const oldTemplater = tag.tagSupport.templater
      const oldProps = oldTemplater?.props
      const hasPropsChanged = tagSupport.hasPropChanges(
        newTemplater.props,
        newTemplater.newProps,
        oldProps,
      )

      if(!hasPropsChanged) {
        tagSupport.newest = (templater as any).redraw(newTemplater.newProps) // No change detected, just redraw me only
        return true
      }

      return false
    },

    hasPropChanges: (
      props: any,
      newProps: any,
      compareToProps: any,
    ) => {
      const oldProps = (tagSupport.templater as any).cloneProps
      const isCommonEqual = props === undefined && props === compareToProps
      const isEqual = isCommonEqual || deepEqual(newProps, oldProps)
      return !isEqual
    },
  }
    
  return tagSupport
}

function providersChangeCheck(tag: Tag) {
  const providersWithChanges = tag.providers.filter(provider => {
    return !deepEqual(provider.instance, provider.clone)
  })

  // reset clones
  providersWithChanges.forEach(provider => {
    const appElement = tag.getAppElement()

    handleProviderChanges(appElement, provider)

    provider.clone = deepClone(provider.instance)
  })
}

/**
 * 
 * @param {Tag} appElement 
 * @param {Provider} provider 
 */
function handleProviderChanges(
  appElement: Tag,
  provider: Provider,
) {
  const tagsWithProvider = getTagsWithProvider(appElement, provider)

  tagsWithProvider.forEach(({tag, renderCount, provider}) => {
    if(renderCount === tag.tagSupport.renderCount) {
      provider.clone = deepClone(provider.instance)
      tag.tagSupport.render()
    }
  })
}

/**
 * 
 * @param {Tag} appElement 
 * @param {Provider} provider 
 * @returns {{tag: Tag, renderCount: numer, provider: Provider}[]}
 */

function getTagsWithProvider(
  tag: Tag,
  provider: Provider,
  memory: {
    tag: Tag
    renderCount: number
    provider: Provider
  }[] = []
) {
  const hasProvider = tag.providers.find(xProvider => xProvider.constructMethod === provider.constructMethod)
  
  if(hasProvider) {
    memory.push({
      tag,
      renderCount: tag.tagSupport.renderCount,
      provider: hasProvider
    })
  }

  tag.children.forEach(child => getTagsWithProvider(child, provider, memory))

  return memory
}

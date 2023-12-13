import { Tag } from "./Tag.class.js"
import { deepEqual } from "./deepFunctions.js"

export const TagSupport = {
  templater: () => undefined,

  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: 0,
  
  mutatingRender: () => {
    throw new Error('Tag function "render()" was called in sync but can only be called async')
  }, // loaded later and only callable async
  
  render: (...args) => {
  },
  
  init: (runOnce) => {
  },
  
  async: callback => (...args) => {
    const result = callback(...args)
    tagSupport.render()

    // the callback function returned another promise
    if(result instanceof Promise) {
      result.then(() => {
        tagSupport.render()
      })
    }
  },

  /**
   * 
   * @param {*} props value.props
   * @param {*} newProps value.newProps
   * @param {*} compareToProps compareSupport.templater.props
   * @returns {boolean}
   */
  hasPropChanges: function(
    props,
    newProps,
    compareToProps,
  ) {
    const oldProps = this.templater.cloneProps
    const isCommonEqual = props === undefined && props === compareToProps
    const isEqual = isCommonEqual || deepEqual(newProps, oldProps)
    return !isEqual
  },
}

/**
 * 
 * @param {() => Tag} templater 
 * @returns {TagSupport}
 */
export function getTagSupport(
  templater,
) {
  const tagSupport = {
    templater,
    renderCount: 0,
    mutatingRender: () => {throw new Error('Tag function "render()" was called in sync but can only be called async')}, // loaded later and only callable async
    render: (...args) => {
      ++tagSupport.renderCount
      return tagSupport.mutatingRender(...args)
    }, // ensure this function still works even during deconstructing

    hasPropChanges: (...args) => TagSupport.hasPropChanges.apply(tagSupport, args),

    // TODO: We need to move these
    init: (runOnce) => {
      runOnce()
      tagSupport.init = () => undefined
    },
    async: callback => (...args) => {
      const result = callback(...args)
      tagSupport.render()

      // the callback function returned another promise
      if(result instanceof Promise) {
        result.then(() => {
          tagSupport.render()
        })
      }
    },
  }
    
  return tagSupport
}

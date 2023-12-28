import { Tag } from "./Tag.class.js"
import { deepEqual } from "./deepFunctions.js"
import { TemplaterResult } from "./tag.js"

export interface TagSupport {
  templater?: TemplaterResult

  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: 0
  
  mutatingRender: (force?: boolean) => any
  
  render: (force?: boolean) => any

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
  templater?: TemplaterResult,
): TagSupport {
  const tagSupport: TagSupport = {
    templater,
    renderCount: 0,
    mutatingRender: () => {throw new Error('Tag function "render()" was called in sync but can only be called async')}, // loaded later and only callable async
    render: (force?: boolean) => {
      ++tagSupport.renderCount
      return tagSupport.mutatingRender(force)
    }, // ensure this function still works even during deconstructing

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

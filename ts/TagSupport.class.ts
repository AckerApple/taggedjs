import { Props } from './Props'
import { Tag, TagMemory } from './Tag.class'
import { deepClone } from './deepFunctions'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { StateConfigArray } from './set.function'
import { TagChildren } from './tag'
import { TemplaterResult } from './TemplaterResult.class'
import { alterProps } from './alterProps.function'
import { TagSubject } from './Tag.utils'
import { renderExistingTag } from './renderExistingTag.function'

export class BaseTagSupport {
  isApp = true

  propsConfig: {
    latest: Props // new props NOT cloned props
    // props from **constructor** are converted for comparing over renders
    latestCloned: Props // This seems to be a duplicate of clonedProps
    lastClonedKidValues: unknown[][]
    clonedProps: Props // duplicate of latestClonedProps
  }

  memory: TagMemory = {
    // context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    state: {
      newest: [] as StateConfigArray,
    },
  }

  constructor(
    public templater: TemplaterResult,
    public subject: TagSubject,
    ) {
    const children: TagChildren = this.templater.children // children tags passed in as arguments
    const props: Props = this.templater.props  // natural props

    const latestCloned = deepClone(props) // alterProps(props, templater)
    this.propsConfig = {
      latest: props,
      latestCloned, // assume its HTML children and then detect
      clonedProps: latestCloned, // maybe duplicate
      lastClonedKidValues: children.value.map(kid => {
        const cloneValues = cloneValueArray(kid.values)
        return cloneValues
      })  
    }

    // if the latest props are not HTML children, then clone the props for later render cycles to compare
    if(!isTagInstance(props)) {
      this.propsConfig.latestCloned = deepClone( latestCloned )
      this.propsConfig.clonedProps = this.propsConfig.latestCloned
    }
  }
}

export function renderTagSupport(
  tagSupport: BaseTagSupport,
  renderUp: boolean,
): Tag {
  if(isTagInstance(tagSupport.templater)) {
    const newTag = tagSupport.templater.global.newest as Tag
    const ownerTag = newTag.ownerTag as Tag
    return renderTagSupport(ownerTag.tagSupport, true)
  }

  // const oldTagSetup = this
  const subject = tagSupport.subject
  const templater = tagSupport.templater // oldTagSetup.templater // templater
  
  const newest = subject.tag?.tagSupport.templater.global.newest
  if(newest) {
    const nowProps = templater.props as any
    const latestProps = newest?.tagSupport.templater.props as any

    if(nowProps && latestProps && latestProps.propNumber > nowProps.propNumber) {
      console.log('mismatched templater', {
        original: templater.wrapper.original,
        nowProps,
        latestProps,
        late: templater.global.newestTemplater.props,
      })
      throw new Error('the newest and what I am processing do not have the same props')
    }
  }

  const useTagSupport = tagSupport.templater.global.newest?.tagSupport as TagSupport // oldTagSetup
  // const oldest = templater.global.oldest as Tag

  if(!templater.global.oldest) {
    throw new Error('888')
  }

  const exit = renderExistingTag(
    // templater.global.newest as Tag,
    templater.global.oldest as Tag,
    templater,
    useTagSupport,
    subject,
  )

  const tag = exit.redraw

  // oldest.updateByTag(exit.redraw)

  // only update and no more?
  if(exit.remit) {
    // console.log('-- update tag', tag.tagSupport.templater.wrapper.original)
    // oldest.updateByTag(exit.redraw)
    return tag
  }
  
  // Have owner re-render
  // ??? - recently removed. As causes some sort of owner newest disconnect during prop testing
  /*
  if(renderUp && tag.ownerTag) {    
    const ownerTagSupport = tag.ownerTag.tagSupport
    console.log('--- renderup ---', ownerTagSupport.templater.wrapper.original)
    renderTagSupport(
      ownerTagSupport,
      true,
    )

    return tag
  }
  */

  return tag
}


function cloneValueArray<T>(values: (T | Tag | Tag[])[]): T[] {
  return values.map((value) => {
    const tag = value as Tag

    if(isTagInstance(tag)) {
      return cloneValueArray(tag.values)
    }

    if(isTagComponent(tag)) {
      const tagComponent = tag as unknown as TemplaterResult
      return deepClone(tagComponent.props)
    }

    if(isTagArray(tag)) {
      return cloneValueArray(tag as unknown as Tag[])
    }

    return deepClone(value)
  })
}

export class TagSupport extends BaseTagSupport {
  isApp = false

  constructor(
    public ownerTagSupport: TagSupport,
    public templater: TemplaterResult,
    public subject: TagSubject,
  ) {
    super(templater, subject)
  }
}

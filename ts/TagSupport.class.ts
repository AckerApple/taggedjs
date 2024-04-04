import { Props } from './Props'
import { Tag, TagMemory } from './Tag.class'
import { deepClone } from './deepFunctions'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { StateConfigArray } from './set.function'
import { TagChildren } from './tag'
import { TemplaterResult } from './TemplaterResult.class'
import { TagSubject } from './Tag.utils'

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

import { Props } from "./Props.js"
import { Tag, TagMemory } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"
import { isTagArray, isTagComponent, isTagInstance } from "./isInstance.js"
import { StateConfigArray, getStateValue } from "./set.function.js"
import { TagChildren } from "./tag.js"
import { TemplaterResult, alterProps } from "./templater.utils.js"

export class TagSupport {
  propsConfig: {
    latest: Props // new props NOT cloned props
    // props from **constructor** are converted for comparing over renders
    latestCloned: Props // This seems to be a duplicate of clonedProps
    lastClonedKidValues: unknown[][]
    clonedProps: Props // duplicate of latestClonedProps
  }

  memory: TagMemory = {
    context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    state: {
      newest: [] as StateConfigArray,
    },
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
  }

  updateState() {
    this.memory.state.newest.forEach(newest => {
      newest.lastValue = getStateValue(newest)
    })
  }

  constructor(
    public templater: TemplaterResult,
    public children: TagChildren, // children tags passed in as arguments
    props?: Props,  // natural props
  ) {
    const latestCloned = alterProps(props, templater)
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

  // TODO: these below may not be in use
  oldest?: Tag
  newest?: Tag

  mutatingRender(): Tag {
    const message = 'Tag function "render()" was called in sync but can only be called async'
    console.error(message, {tagSupport: this})
    throw new Error(message)
  } // loaded later and only callable async

  render () {
    ++this.memory.renderCount
    return this.mutatingRender()
  } // ensure this function still works even during deconstructing
}

function cloneValueArray<T>(values: (T | Tag | Tag[])[]): T[] {
  return values.map((value) => {
    const tag = value as Tag

    if(isTagInstance(tag)) {
      return cloneValueArray(tag.values)
    }

    if(isTagComponent(tag)) {
      const tagComponent = tag as unknown as TemplaterResult
      return deepClone(tagComponent.tagSupport.propsConfig.latestCloned)
    }

    if(isTagArray(tag)) {
      return cloneValueArray(tag as unknown as Tag[])
    }

    return deepClone(value)
  })
}
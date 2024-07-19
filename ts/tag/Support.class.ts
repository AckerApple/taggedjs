import { Props } from '../Props.js'
import { ContextItem } from './Tag.class.js'
import { empty, ValueTypes } from './ValueTypes.enum.js'
import { State } from '../state/index.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { cloneTagJsValue } from './cloneValueArray.function.js'
import { Subscription } from '../subject/subject.utils.js'

export type AnySupport = (BaseSupport & {
})

export type PropsConfig = {
  latest: Props // new props NOT cloned props
  latestCloned: Props
  castProps?: Props // props that had functions wrapped
}

export type BaseSupport = {
  appSupport: BaseSupport
  ownerSupport?: AnySupport
  appElement?: Element // only seen on this.getAppSupport().appElement
  propsConfig?: PropsConfig
  
  state: State, // TODO: this is not needed for every type of  tag
  templater: TemplaterResult,

  // only on support
  subject: ContextItem
}

/** used only for apps, otherwise use Support */
// TODO: We need to split Support and simple tag support apart
export function getBaseSupport(
  templater: TemplaterResult,
  subject: ContextItem,
  castedProps?: Props,
): BaseSupport {
  const baseSupport = {
    templater,
    subject,
    castedProps,
    state: [], // TODO: this is not needed for every type of  tag

    appSupport: undefined as any as BaseSupport,
  } as BaseSupport

  ;(baseSupport as any).appSupport = baseSupport

  const props = templater.props  // natural props

  if(!props) {
    return baseSupport
  }

  baseSupport.propsConfig = clonePropsBy(baseSupport, props, castedProps)
  return baseSupport
}
/*
  addEventListener(
    eventName: string,
    element: Element,
    callback: EventCallback,
) {
    const elm = this.appElement as Element
    const newEventName = eventName.slice(2, eventName.length)

    const global = this.subject.global
    const events = global.events = global.events || {}
    
    if(!events[newEventName]) {
      const eventArray = events[newEventName] = [] as EventMem[]
      elm.addEventListener(newEventName, event => this.findListenerFor(event, eventArray, element, elm))
    }

    const eventArray = events[newEventName]

    const found = eventArray.find(x => x.elm === element)

    if(found) {
      found.callback = callback
      return
    }

    eventArray.push({elm: element, callback})
  }

  findListenerFor(
    event: Event,
    eventArray: EventMem[],
    element: Element,
    appElm: Element,
  ) {
    eventArray.find(x => {
      if(x.elm === event.target) {
        x.callback(event)
        return true
      }
    })

    const parentNode = element.parentNode
    if(parentNode && parentNode !== appElm) {
      this.findListenerFor(event, eventArray, parentNode as Element, appElm)
    }
  }
*/

export type Support = BaseSupport & {
  ownerSupport: AnySupport
  appSupport: BaseSupport
}

export function getSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  ownerSupport: AnySupport,
  appSupport: BaseSupport,
  subject: ContextItem,
  castedProps?: Props,
): Support {
  const support = getBaseSupport(templater, subject, castedProps)
  support.ownerSupport = ownerSupport
  support.appSupport = appSupport
  return support as Support
}

function clonePropsBy(
  support: AnySupport,
  props: Props,
  castedProps?: Props,
) {
  if(support.templater.tagJsType === ValueTypes.stateRender) {
    return support.propsConfig = {
      latest: [],
      latestCloned: [],
    }
  }

  const latestCloned = props.map(props =>
    cloneTagJsValue(props)
  )
  return support.propsConfig = {
    latest: props,
    latestCloned, // assume its HTML children and then detect
    castProps: castedProps,
  }
}


export function resetSupport(
  support: Support,
  newContextLength: number // 0
) {
  const subject = support.subject
  const global = subject.global  
  global.context.length = newContextLength
  delete global.newest
}

export function destroySubs(
  subs: Subscription<any>[],
) {
  if(!subs.length) {
    return
  }

  setTimeout(function () {
    for (const sub of subs) {
      sub.unsubscribe()
    }
  }, 0)
}

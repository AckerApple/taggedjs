import { Props } from '../Props.js'
import { ContextItem, EventCallback, EventMem } from './Tag.class.js'
import { State } from '../state/index.js'
import { Events, SupportTagGlobal, TagGlobal, TemplaterResult } from './TemplaterResult.class.js'
import { Subscription } from '../subject/subject.utils.js'
import { clonePropsBy } from './clonePropsBy.function.js'
import { Subject } from '../subject/Subject.class.js'

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
  
  baseSupport.appSupport = baseSupport

  const global = subject.global as SupportTagGlobal
  global.blocked = []
  global.destroy$ = new Subject<void>()

  const props = templater.props  // natural props
  if(props) {
    baseSupport.propsConfig = clonePropsBy(baseSupport, props, castedProps)
  }

  return baseSupport
}

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


export function addSupportEventListener(
  support: AnySupport,
  eventName: string,
  element: Element,
  callback: EventCallback,
) {
  const elm = support.appElement as Element
  // const newEventName = eventName.slice(2, eventName.length)
  const replaceEventName = '_' + eventName

  const global = support.subject.global as TagGlobal
  const eventReg = global.events as Events
  
  if(!eventReg[eventName]) {
    const listener = function eventCallback(event: Event) {
      const target = event.target
      const callback = (target as any)[replaceEventName]

      if(!callback) {
        return
      }

      callback(event)
    }
    eventReg[eventName] = listener
    elm.addEventListener(eventName, listener)
  }

  // attach to element but not as "onclick" instead as "_onclick"
  ;(element as any)[replaceEventName] = callback
}

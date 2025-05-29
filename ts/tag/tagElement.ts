import { SupportTagGlobal, TemplaterResult } from './getTemplaterResult.function.js'
import { SupportContextItem } from './SupportContextItem.type.js'
import { TagWrapper } from './tag.utils.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'
import { destroySupport } from '../render/destroySupport.function.js'
import { BaseTagGlobal, DomTag, PropWatches } from './index.js'
import { initState } from '../state/state.utils.js'
import { isTagComponent } from '../isInstance.js'
import { Props } from '../Props.js'
import { TagMaker } from './TagMaker.type.js'
import { BaseSupport } from './BaseSupport.type.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { checkTagValueChange, destroySupportByContextItem } from './checkTagValueChange.function.js'
import { AnySupport } from './AnySupport.type.js'
import { renderTagElement } from '../render/renderTagElement.function.js'
import { loadNewBaseSupport } from './loadNewBaseSupport.function.js'

export type TagAppElement = Element & {
  ValueTypes: typeof ValueTypes
  setUse: typeof setUseMemory
}

export const appElements: {
  support: AnySupport
  element: Element
}[] = []

/**
 * 
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns 
 */
export function tagElement(
  app: TagMaker,
  element: HTMLElement | Element,
  props?: unknown,
): {
  support: BaseSupport
  tags: TagWrapper<unknown>[] // TagComponent[]
  ValueTypes: typeof ValueTypes
} {
  const appElmIndex = appElements.findIndex(appElm => appElm.element === element)
  if(appElmIndex >= 0) {
    const support = appElements[appElmIndex].support
    destroySupport(support, support.subject.global)
    appElements.splice(appElmIndex, 1)
    // an element already had an app on it
    console.warn('Found and destroyed app element already rendered to element', {element})
  }

  // Create the app which returns [props, runOneTimeFunction]
  
  let templater = (() => (templater2 as any)(props)) as unknown as TemplaterResult
  templater.propWatch = PropWatches.NONE
  templater.tagJsType = ValueTypes.stateRender
  // todo: props should be an array
  templater.props = [props]
  ;(templater as any).isApp = true

  // create observable the app lives on
  const subject = getNewSubject(templater, element)
  const global = subject.global as BaseTagGlobal
  initState(global.newest, setUseMemory.stateConfig)

  let templater2 = app(props) as unknown as TemplaterResult
  const isAppFunction = typeof templater2 == BasicTypes.function

  if(!isAppFunction) {
    if(!isTagComponent(templater2)) {
      templater.tag = templater2 as unknown as DomTag
      templater2 = app as unknown as TemplaterResult
    } else {
      global.newest.propsConfig = {
        latest: [props] as Props,
        castProps: [props] as Props,
      }
      templater.propWatch = templater2.propWatch
      templater.tagJsType = templater2.tagJsType
      templater.wrapper = templater2.wrapper
      templater = templater2
    }
  }

  return renderTagElement(
    app, global, templater, templater2,
    element, subject, isAppFunction,
  )
}

function getNewSubject(
  templater: TemplaterResult,
  appElement: Element,
) {
  const subject: SupportContextItem = {
    value: templater,
    withinOwnerElement: false, // i am the highest owner
    renderCount: 0,

    global: undefined as unknown as SupportTagGlobal, // gets set below in getNewGlobal()
    tagJsVar: {
      tagJsType: 'templater',
      checkValueChange: checkTagValueChange,
      delete: destroySupportByContextItem,
      processInit: function appDoNothing() {
        console.debug('do nothing app function')
      }
    }
  }

  const global = getNewGlobal(subject) as BaseTagGlobal
  // for click events and such read at a higher level
  global.events = {}

  loadNewBaseSupport(templater, subject, appElement)

  return subject
}

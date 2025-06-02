// taggedjs-no-compile

import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'

import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { DomMetaMap, LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { getSupportInCycle } from './getSupportInCycle.function.js'
import { StringTag } from './StringTag.type.js'
import { DomTag } from './DomTag.type.js'
import { processDomTagInit } from './update/processDomTagInit.function.js'
import { Tag } from './Tag.type.js'
import { checkTagValueChange, destroySupportByContextItem, TagJsVarInnerHTML } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { processOuterDomTagInit } from './processOuterDomTagInit.function.js'

export type EventCallback = (event: Event) => any
export type EventMem = {elm: Element, callback:EventCallback}

export type TagMemory = {
  state: State
}

export interface TagTemplate {
  interpolation: InterpolatedTemplates,
  string: string,
  strings: string[]
  values: unknown[]  
  domMetaMap?: DomMetaMap
}

export type ArrayItemStringTag<T> = StringTag & { arrayValue: T }

export type KeyFunction = 
/** Used in array.map() as array.map(x => html``.key(x))
 * - NEVER USE inline object key: array.map(x => html``.key({x}))
 * - NEVER USE inline array key: array.map((x, index) => html``.key([x, index]))
 */
<T>(arrayValue: T) => ArrayItemStringTag<T>

/** When compiled to then run in browser */
export function getDomTag(
  dom: LikeObjectChildren,
  values: unknown[],
): DomTag {
  const tag: DomTag = {
    values,
    ownerSupport: getSupportInCycle(),
    dom,
    
    tagJsType: ValueTypes.dom,
    processInit: processDomTagInit,
    checkValueChange: checkTagValueChange,
    delete: destroySupportByContextItem,

    key: function keyFun(arrayValue: unknown) {
      tag.arrayValue = arrayValue
      return tag
    },

    setHTML: function setHTML(innerHTML: Tag) {
      innerHTML.outerHTML = tag
      tag._innerHTML = innerHTML
      ;(innerHTML as any).oldProcessInit = innerHTML.processInit
      
      // TODO: Not best idea to override the init
      innerHTML.processInit = processOuterDomTagInit

      return tag
    },

    /** Used within the outerHTML tag to signify that it can use innerHTML */
    acceptInnerHTML: function acceptInnerHTML(useTagVar: TagJsVar): Tag {
      // TODO: datatype
      (useTagVar as TagJsVarInnerHTML).owner = tag
      return tag
    },

    html: {
      dom: function dom(
        dom: LikeObjectChildren, // ObjectChildren
        values: TagValues,
      ): DomTag {
        tag.children = {dom: dom, values}
        return tag
      }
    }
  }

  Object.defineProperty(tag, 'innerHTML', {
    set(innerHTML: Tag) {
      return tag.setHTML(innerHTML)
    },
  })

  return tag
}

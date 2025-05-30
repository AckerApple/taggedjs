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
import { TagCounts, AnySupport, ContextItem, TemplateValue, checkTagValueChange, SupportContextItem, destroySupportByContextItem, TagJsVarInnerHTML } from '../index.js'
import { forceUpdateExistingValue } from './update/forceUpdateExistingValue.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

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

type ArrayItemStringTag<T> = StringTag & { arrayValue: T }

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

/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
function processOuterDomTagInit(
  value: Tag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const outerHTML = value.outerHTML as Tag

  processDomTagInit(
    outerHTML,
    contextItem, // could be tag via result.tag
    ownerSupport, // owningSupport
    counts,
    appendTo,
    insertBefore,
  ) as AnySupport

  contextItem.handler = (
    value: TemplateValue,
    newSupport: AnySupport,
    contextItem: ContextItem,
    _values,
    counts: TagCounts,
  ) => {
    forceUpdateExistingValue(
      contextItem as any,
      (value as Tag)?.outerHTML as any || value,
      newSupport,
      counts,
    )
  }

  // TODO: Not best idea to swap out the original values changeChecker
  value.checkValueChange = function outerCheckValueChange(
    newValue: unknown,
    contextItem: SupportContextItem,
    counts: TagCounts,
  ) {
    return checkOuterTagValueChange(newValue, contextItem, counts)
  }
}

function checkOuterTagValueChange(
  newValue: unknown,
  contextItem: SupportContextItem,
  counts: TagCounts,
) {    
  return checkTagValueChange(
    newValue, // (newValue as Tag)?.outerHTML || newValue,
    contextItem, // subContext.contextItem as any,
    counts,
  )
}

/** When runtime is in browser */
export function getStringTag(
  strings: string[],
  values: unknown[],
): StringTag {
  const tag: StringTag = {
    values,
    ownerSupport: getSupportInCycle(),
    
    tagJsType: ValueTypes.tag,
    processInit: processDomTagInit,
    checkValueChange: checkTagValueChange,
    delete: destroySupportByContextItem,

    strings,
    
    /** Used within an array.map() that returns html aka array.map(x => html``.key(x)) */
    key<T>(arrayValue: T) {
      tag.arrayValue = arrayValue
      return tag as ArrayItemStringTag<T>
    },

    /** aka setInnerHTML */
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

    html: function html(
      strings: string[] | TemplateStringsArray,
      values: TagValues,
    ) {
      tag.children = {strings, values}
      return tag
    }
  }

  Object.defineProperty(tag, 'innerHTML', {
    set(innerHTML: Tag) {
      return tag.setHTML(innerHTML)
    },
  })

  return tag
}

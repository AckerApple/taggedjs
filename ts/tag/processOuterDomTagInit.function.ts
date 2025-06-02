// taggedjs-no-compile

import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { getSupportInCycle } from './getSupportInCycle.function.js'
import { StringTag } from './StringTag.type.js'
import { processDomTagInit } from './update/processDomTagInit.function.js'
import { Tag } from './Tag.type.js'
import { TagCounts, AnySupport, ContextItem, TemplateValue, checkTagValueChange, SupportContextItem, destroySupportByContextItem, TagJsVarInnerHTML, ArrayItemStringTag } from '../index.js'
import { forceUpdateExistingValue } from './update/forceUpdateExistingValue.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
export function processOuterDomTagInit(
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

  contextItem.handler = function outDomTagHanlder(
    value: TemplateValue,
    newSupport: AnySupport,
    contextItem2: ContextItem,
    _values,
    counts: TagCounts,
  ) {
    forceUpdateExistingValue(
      contextItem2 as any,
      (value as Tag)?.outerHTML as any || value,
      newSupport,
      counts,
    )
  }

  // TODO: Not best idea to swap out the original values changeChecker
  value.checkValueChange = checkOuterTagValueChange
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

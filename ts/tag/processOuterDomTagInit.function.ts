// taggedjs-no-compile

import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { getSupportInCycle } from './getSupportInCycle.function.js'
import { StringTag } from './StringTag.type.js'
import { processDomTagInit } from './update/processDomTagInit.function.js'
import { Tag } from './Tag.type.js'
import { AnySupport, ContextItem, TemplateValue, checkTagValueChange, SupportContextItem, destroySupportByContextItem, TagJsVarInnerHTML, ArrayItemStringTag } from '../index.js'
import { forceUpdateExistingValue } from './update/forceUpdateExistingValue.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js'
import { blankHandler } from '../render/dom/attachDomElements.function.js'

/** Used to override the html`` processing that will first render outerHTML and then its innerHTML */
export function processOuterDomTagInit(
  value: Tag,
  contextItem: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owningSupport
  appendTo?: Element,
  insertBefore?: Text,
) {
  const outerHTML = value.outerHTML as Tag

  processDomTagInit(
    outerHTML,
    contextItem, // could be tag via result.tag
    ownerSupport, // owningSupport
    appendTo,
    insertBefore,
  ) as AnySupport

  // contextItem.handler = function outDomTagHanlder(
  const tagJsVar = contextItem.tagJsVar as TagJsVar
  
  tagJsVar.processUpdate = function outDomTagHanlder(
    value: TemplateValue,
    contextItem2: ContextItem,
    newSupport: AnySupport,
  ) {
    forceUpdateExistingValue(
      contextItem2 as any,
      (value as Tag)?.outerHTML as any || value,
      newSupport,
    )
  }

  // TODO: Not best idea to swap out the original values changeChecker
  value.checkValueChange = checkOuterTagValueChange
}

function checkOuterTagValueChange(
  newValue: unknown,
  contextItem: SupportContextItem,
) {    
  return checkTagValueChange(
    newValue, // (newValue as Tag)?.outerHTML || newValue,
    contextItem, // subContext.contextItem as any,
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
    processInitAttribute: blankHandler,
    processInit: processDomTagInit,
    processUpdate: tagValueUpdateHandler,
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

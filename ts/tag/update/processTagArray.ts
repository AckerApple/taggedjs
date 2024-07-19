// taggedjs-no-compile

import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { ContextItem, DomTag, StringTag, TagTemplate } from '../Tag.class.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { ArrayNoKeyError } from '../../errors.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { textNode } from '../textNode.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { updateExistingValue } from './updateExistingValue.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { paintAppends, paintInsertBefores, paintRemoves } from '../paint.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { processNewArrayValue } from './processNewValue.function.js'
import { destroySupport } from '../destroySupport.function.js'

export type LastArrayItem = {
  support: Support
  index: number
  deleted?: boolean
}

type LastArrayMeta = {
  array: LastArrayItem[]
  lastRuns?: {[index: number]: TagTemplate}
}

export type TagArraySubject = ContextItem & {
  insertBefore: InsertBefore // template tag
  lastArray?: LastArrayMeta // previous array that may have been processed
}

export function processTagArray(
  subject: TagArraySubject,
  value: (TemplaterResult | StringTag)[], // arry of Tag classes
  ownerSupport: BaseSupport | Support,
  counts: Counts,
  appendTo?: Element,
) {
  const global = subject.global
  ++global.renderCount
  
  const existed = subject.lastArray ? true : false
  const lastArray = subject.lastArray = subject.lastArray || {array: []}
  const runtimeInsertBefore = global.placeholder

  let removed = 0
  /** 🗑️ remove previous items first */
  lastArray.array = lastArray.array.filter((
    item: LastArrayItem,
    index: number,
  ) => {
    const {newRemoved, same} = reviewLastArrayItem(
      item, value, index, lastArray, removed, counts
    )
    removed = removed + newRemoved
    return same
  })

  const length = value.length
  for (let index=0; index < length; ++index) {
    reviewArrayItem(
      value,
      index,
      lastArray,
      ownerSupport,
      runtimeInsertBefore,
      counts,
      existed ? undefined : appendTo,
    )
  }
}

function reviewArrayItem(
  value: unknown[],
  index: number,
  lastArray: LastArrayMeta,
  ownerSupport: AnySupport,
  runtimeInsertBefore: Text | undefined, // used during updates
  counts: Counts,
  appendTo?: Element, // used during initial rendering of entire array
) {
  const item = value[index]
  const previous = lastArray.array[index]
  const previousSupport = previous?.support
  const itemSubject: ContextItem = previousSupport?.subject || {
    value,
    global: getNewGlobal(),
  }

  const couldBeSame = lastArray.array.length > index
  if (couldBeSame) {
    updateExistingValue(
      itemSubject,
      item as TemplateValue,
      ownerSupport,
    )

    return
  }

  const newSupport = processAddTagArrayItem(
    item,
    runtimeInsertBefore as any, // thisInsert as any,
    itemSubject,
    index,
    ownerSupport,
    counts,
    lastArray.array,
    appendTo,
  )

  if(newSupport) {
    ownerSupport.subject.global.childTags.push(newSupport as Support)
  }
  
  return
}

function setPlaceholderElm(
  subject: ContextItem,
) {
  // const elm = textNode.cloneNode(false) as Text
  const elm = document.createTextNode('')
  return subject.global.placeholder = elm
}

function processAddTagArrayItem(
  item: unknown,
  before: Text, // used during updates
  itemSubject: ContextItem,
  index: number,
  ownerSupport: AnySupport,
  counts: Counts,
  lastArray: LastArrayItem[],
  appendTo?: Element, // used during initial entire array rendering
): AnySupport {
  counts.added = counts.added + 1 // index
  const subPlaceholder = setPlaceholderElm( itemSubject )

  if( appendTo ) {
    paintAppends.push({
      element: subPlaceholder,
      relative: appendTo,
    })
  } else {
    paintInsertBefores.push({
      element: subPlaceholder,
      relative: before,
    })
  }

  processNewArrayValue(item as TemplateValue, ownerSupport, itemSubject)

  const support = processFirstSubjectValue(
    item as TemplateValue,
    itemSubject,
    ownerSupport, // support,
    counts,
    appendTo,
  ) as Support
  
  // Added to previous array
  lastArray.push({
    support, index
  })

  return support
}

export function destroyArrayItem(
  lastArray: LastArrayItem[],
  index: number,
  counts: Counts,
) {
  const last = lastArray[index]
  const support = last.support
  destroyArrayTag(support, counts)
  last.deleted = true
  ++counts.removed
}

/** Destroys one item in an array of items */
function destroyArrayTag(
  support: Support,
  counts: Counts,
) {
  setTimeout(function () {
    const global = support.subject.global
    const ph = global.placeholder as Text
    delete global.placeholder
    paintRemoves.push(ph)
  }, 0)

  destroySupport(support, {
    stagger: counts.removed++,
  })
}

function reviewLastArrayItem(
  subTag: any,
  value: any[],
  index: number,
  lastArray: LastArrayMeta,
  removed: number,
  counts: Counts,
) {
  const newLength = value.length - 1
  const at = index - removed
  const lessLength = at < 0 || newLength < at

  if(lessLength) {
    destroyArrayItem(lastArray.array, index, counts)
    ++removed
    return {same: false, newRemoved: removed}
  }

  const templater = subTag.support.templater as TemplaterResult
  const nowValue = templater.tag?.arrayValue // (templater as any).arrayValue
  const lastTemp = lastArray.array[index].support.templater
  const tag = lastTemp.tag as any
  const lastArrayValue = tag.arrayValue

  // check for html``.key()
  const keySet = 'arrayValue' in tag
  if (!keySet) {
    const details = {
      array: value.map(item => item.values || item),
      vdom: (tag as any)?.support.templater.tag.dom,
      tag,
      lastArray: lastArray.array[index]
    }
    const message = 'Found Tag in array without key value, during array update. Be sure to use "html`...`.key(unique)" OR import TaggedJs "key" "key(unique).html = CustomTag(props)"'
    console.error(message, details)
    const err = new ArrayNoKeyError(message, details)
    throw err
  }

  const destroyItem = nowValue !== lastArrayValue
  if(destroyItem) {
    destroyArrayItem(lastArray.array, index, counts)
    ++removed
    return {same:false, newRemoved: removed}
  }

  return {same:true, newRemoved: removed}
}

import { InsertBefore } from'../interpolations/InsertBefore.type.js'
import { TagGlobal } from './TemplaterResult.class.js'
import { textNode } from './textNode.js'

export function setTagPlaceholder(
  global: TagGlobal,
) {
  const insertBefore = global.insertBefore as InsertBefore
  return global.placeholder = swapInsertBefore(insertBefore)
}

export function swapInsertBefore(
  insertBefore: InsertBefore
) {
  const placeholder = textNode.cloneNode(false) as Text
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(placeholder, insertBefore)
  parentNode.removeChild(insertBefore)
  return placeholder
}

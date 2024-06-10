import { InsertBefore } from'../interpolations/InsertBefore.type.js'
import { TagGlobal } from './TemplaterResult.class.js'

export function setTagPlaceholder(
  global: TagGlobal,
) {
  const insertBefore = global.insertBefore as InsertBefore
  return global.placeholder = swapInsertBefore(insertBefore)
}

export function swapInsertBefore(
  insertBefore: InsertBefore
) {
  const placeholder = document.createTextNode('')
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(placeholder, insertBefore)
  parentNode.removeChild(insertBefore)
  return placeholder
}
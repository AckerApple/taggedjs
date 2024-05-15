import { InsertBefore } from '../interpolations/Clones.type'
import { TagGlobal } from '../TemplaterResult.class'

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

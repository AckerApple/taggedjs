import { InsertBefore } from './Clones.type'
import { TagGlobal } from './TemplaterResult.class'

export function setTagPlaceholder(
  global: TagGlobal,
) {
  const insertBefore = global.insertBefore as InsertBefore
  const placeholder = global.placeholder = document.createTextNode('')
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(placeholder, insertBefore)
  parentNode.removeChild(insertBefore)
}
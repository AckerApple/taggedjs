// taggedjs-no-compile

import { isObject } from '../../isInstance.js'

export type TagVarIdNum = {tagJsVar: number}
export function getTagJsTag(
  attrPart: string | TagVarIdNum | null | undefined
) {
  if(isObject(attrPart) && 'TagJsTag' in (attrPart as TagVarIdNum))
    return (attrPart as TagVarIdNum).tagJsVar
  
  return -1
  // return (attrPart as TagVarIdNum)?.tagJsVar || -1
}


/** @deprecated - this needs to be replaced with the source attribute defining itself so select.value`1` just sets itself properly
 * Looking for (class | style) followed by a period
*/
export function isSpecialAttr(
  attrName: string,
  tagName: string // INPUT, DIV
) {
  if(attrName.startsWith('class.')) {
    return 'class'
  }

  if(attrName.startsWith('style.')) {
    return 'style'
  }

  const specialAction = isSpecialAction(attrName)
  if(specialAction !== false) {
    return specialAction
  }

  if(attrName === 'value' && tagName === 'SELECT') {
    return 'value' // requires being set after put down
  }

  return false
}

export function isSpecialAction(attrName: string) {
  switch (attrName) {
    case 'autoselect':
    case 'autoSelect':
      return 'autoselect'
    
    case 'autofocus':
    case 'autoFocus':
      return 'autofocus'
  }
  return false
}

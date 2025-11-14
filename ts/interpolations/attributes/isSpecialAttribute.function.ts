/** Looking for (class | style) followed by a period */
export function isSpecialAttr(
  attrName: string
) {
  if(attrName.startsWith('class.')) {
    return 'class'
  }

  const specialAction = isSpecialAction(attrName)
  if(specialAction !== false) {
    return specialAction
  }

  if(attrName.startsWith('style.')) {
    return 'style'
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

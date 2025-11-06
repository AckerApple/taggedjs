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
  switch (attrName.toLowerCase()) {
    case 'autoselect':
      return 'autoselect'
    case 'autofocus':
      return 'autofocus'
  }
  return false
}

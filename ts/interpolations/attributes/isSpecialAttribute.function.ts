/** Looking for (class | style) followed by a period */
export function isSpecialAttr(
  attrName: string
) {
  if(attrName.startsWith('class.')) {
    return 'class'
  }

  const specialAction = isSpecialAction(attrName)
  if(specialAction !== false) {
    return true
  }

  if(attrName.startsWith('style.')) {
    return 'style'
  }

  return false
}

export function isSpecialAction(attrName: string) {
  switch (attrName) {
    case 'autoselect':
      return 'autoselect'
    case 'autofocus':
      return 'autofocus'
    
    case 'oninit': // when read in compile process
    case 'init': // when read in realtime
      return 'oninit'
  }
  return false
}

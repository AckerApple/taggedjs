import { Context } from '../tag/Tag.class'
import { TagSupport } from '../tag/TagSupport.class'
import { HowToSet } from './interpolateAttributes'
import { processAttribute } from './processAttribute.function'

const search = new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)')

export function scanTextAreaValue(
  textarea: HTMLTextAreaElement,
  context: Context,
  ownerSupport: TagSupport,
) {
  const value = textarea.value
  if( value.search(search) >=0 ) {
    const match = value.match(/__tagvar(\d{1,4})/);
    const token = match ? match[0] : ''
    const dynamic = '{' + token + '}'
    textarea.value = ''
    textarea.setAttribute('text-var-value', dynamic)

    const howToSet: HowToSet = (_elm, _name, value: string) => textarea.value = value

    processAttribute(
      'text-var-value',
      dynamic, // realValue, // context[token].value,
      textarea,
      context,
      ownerSupport,
      howToSet,
    )  
  }
}

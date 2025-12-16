import { AnySupport, ElementVar } from '../index.js'
import { DomObjectElement } from '../interpolations/optimizers/ObjectNode.types.js'
import { paintBefore, paintCommands } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { processElementVar } from './processElementVar.function.js'

export function processDesignElementInit(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  // appendTo?: Element,
) {
  context.contexts = context.contexts || [] // added contexts
  context.htmlDomMeta = []
  // prevent children from calling a parent function and causing a mid render
  context.locked = 34

  const element = processElementVar(
    value,
    context,
    ownerSupport,
    context.contexts,
  )
  
  delete context.locked
  paintCommands.push([paintBefore, [insertBefore, element, 'htmlTag.processInit']])

  const dom: DomObjectElement = {
    nn: value.tagName,
    domElement: element,
    at: value.attributes, // TODO: most likely does nothing
  }

  context.htmlDomMeta = [dom]

  return element
}

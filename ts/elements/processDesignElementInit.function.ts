import { AnySupport, ElementFunction } from '../index.js'
import { DomObjectElement } from '../interpolations/optimizers/ObjectNode.types.js'
import { paintAfters, paintBefore, PaintCommand, paintCommands } from '../render/paint.function.js'
import { ElementContext } from '../tag/ContextItem.type.js'
import { processElementVar } from './processElementVar.function.js'

export function processDesignElementInit(
  value: ElementFunction,
  context: ElementContext,
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
  const paintCommand: PaintCommand = [
    paintBefore, [insertBefore, element, 'htmlTag.processInit']
  ]
  paintCommands.push(paintCommand)
  context.paintCommands = [paintCommand]
  paintAfters.push([() => {
    delete context.paintCommands
  }, []])


  const dom: DomObjectElement = {
    nn: value.tagName,
    domElement: element,
    at: value.attributes, // TODO: most likely does nothing
  }

  context.htmlDomMeta = [dom]

  return element
}

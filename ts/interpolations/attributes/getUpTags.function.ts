import { isTagComponent } from "../../isInstance.js"
import { providersChangeCheck } from "../../state/providersChangeCheck.function.js"
import { checkRenderUp, isInlineHtml } from "../../render/renderSupport.function.js"
import { Support } from "../../tag/createHtmlSupport.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ValueTypes } from "../../tag/ValueTypes.enum.js"

export function getUpTags(
  support: AnySupport,
  supports: AnySupport[] = []
): AnySupport[] {
  const subject = support.subject
  // const global = support.subject.global as SupportTagGlobal
  const templater = support.templater
  const inlineHtml = isInlineHtml(templater)
  const ownerSupport = (support as Support).ownerSupport

  if( subject.locked ) {
    supports.push(support)
    return supports
  }

  // is it just a vanilla tag, not component?
  if( inlineHtml ) {
    return getUpTags(ownerSupport, supports)
  }

  const newSupport = support // global.newest as AnySupport
  const isComponent = isTagComponent(newSupport.templater)
  const tagJsType = support.templater.tagJsType
  const canContinueUp = ownerSupport && tagJsType !== ValueTypes.stateRender
  const continueUp = canContinueUp && (!isComponent || checkRenderUp(newSupport.templater, newSupport))
  
  const proSupports = providersChangeCheck(newSupport)
  supports.push(...proSupports)

  if(continueUp) {
    getUpTags(ownerSupport, supports)

    if(isComponent) {
      supports.push(newSupport)
    }

    return supports // more to keep going up, do not push this child for review
  }

  supports.push(newSupport)

  return supports
}

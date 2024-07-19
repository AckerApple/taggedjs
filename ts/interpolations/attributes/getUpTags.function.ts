import { providersChangeCheck } from "../../state/providersChangeCheck.function.js"
import { checkRenderUp, isInlineHtml } from "../../tag/render/renderSupport.function.js"
import { AnySupport, Support } from "../../tag/Support.class.js"

export function getUpTags(
  support: AnySupport,
  supports: AnySupport[] = []
): AnySupport[] {
    const global = support.subject.global
    const templater = support.templater
    const inlineHtml = isInlineHtml(templater)
    const ownerSupport = (support as Support).ownerSupport
  
    // is it just a vanilla tag, not component?
    if( inlineHtml ) {
      return getUpTags(ownerSupport, supports)
    }
  
    if(global.locked) {
      supports.push(support)
      return supports
    }
  
    // const subject = support.subject
    // const oldest = global.oldest
    const newSupport = global.newest as Support
    const continueUp = ownerSupport && checkRenderUp(ownerSupport, newSupport.templater, newSupport)
    
    if(continueUp) {
      getUpTags(ownerSupport, supports)
    }

    const proSupports = providersChangeCheck(newSupport)  
    supports.push(...proSupports, newSupport)
  
    return supports
  
}

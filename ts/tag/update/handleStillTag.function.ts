import { TemplaterResult } from '../getTemplaterResult.function.js'
import { updateSupportBy } from '../../render/update/updateSupportBy.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport, TagJsComponent } from '../index.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { SupportContextItem } from '../SupportContextItem.type.js'

export function handleStillTag(
  oldSupport: AnySupport,
  subject: ContextItem,
  value: TagJsComponent<any> | TemplateValue,
  ownerSupport: AnySupport,
) {
  // Value is result of either tag(() => html``) or () => html``
  let templater = (value as TagJsComponent<any>).templater || value

  const oldTtag = oldSupport.templater.tag
  if(oldTtag) {
    const innerHTML = oldTtag._innerHTML
    if(innerHTML) {
      // Value has innerHTML that is either tag() or html``
      templater = (value as TagJsComponent<any>)._innerHTML
    }
  }

  const valueSupport = createSupport(
    templater as TemplaterResult,
    subject,
    ownerSupport,
    ownerSupport.appSupport,
  )

  const lastSubject = oldSupport.context as SupportContextItem
  const oldest = lastSubject.state.oldest as AnySupport

  updateSupportBy(oldest, valueSupport)
}

import { TemplaterResult } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'

export function validateTemplater(templater: TemplaterResult) {
  // Check if function component is wrapped in a tag() call
  const notTag = templater.tagJsType !== ValueTypes.stateRender && templater.tagged !== true
  if(notTag) {
    const wrapper = templater.wrapper
    const original: Function = wrapper?.parentWrap.original || templater as any
    let name: string | undefined = original.name || original.constructor?.name

    if(name === 'Function') {
      name = undefined
    }

    const label = name || original.toString().substring(0,120)
    const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`)
    throw error
  }
}

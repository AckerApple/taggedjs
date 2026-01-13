import { renderCountDiv } from "./renderCount.component.js"
import { tag, noElement } from "taggedjs"

export const GatewayTest = tag((
  props: any, // : {test:number}
) => {
  GatewayTest.updates(x => [props] = x)

  let renderCount: number = 0

  ++renderCount
  
  return noElement(
    'I was loaded by a gateway - props:',
    typeof props,
    ':',
    _=> JSON.stringify(props),
    renderCountDiv({renderCount, name: 'GatewayTest.ts'})
  )
})
import { html, tag, states, state } from "taggedjs"
import { dump } from "./dump"
import { renderCountDiv } from "./renderCount.component"

export const dumpContent = tag(() => {
  let userJsonString = ''
  let renderCount = 0
  let userJson: any = ''
  let badEval = false
  
  states(get => [{userJsonString, renderCount, userJson, badEval}] = get({userJsonString, renderCount, userJson, badEval}))

  ++renderCount
  
  // const userJson = JSON.parse(userJsonString)

  const change = (event: any) => {
    userJsonString = event.target.value

    try {
      userJson = sandboxEval(userJsonString, {})
      userJsonString = JSON.stringify(userJson, null, 2)
    } catch(err: any) {
      badEval = true
      try {
        JSON.parse(userJsonString)
      } catch (err: any) {
        userJson = Object.getOwnPropertyNames(err).reduce((a, key) => (a[key] = err[key]) && a || a, {} as any)
      }
    }
  }

  const sampleDump = state(() => ({
    showLevels: 15,
    showAll: true,
    value: {
      test: {
        anotherOne: 22
      },
      arrayTest: [{
        name:'something',
        location: {street: '4361'},
      }/*, {
        name:'in this',
        location: {street: '2235'},
      }, {
        name:'world',
        location: {street: '4785'},
      }*/]
    }
  }))

  return html`
    <div style="display:flex;flex-wrap:wrap;align-item:center;justify-content: center;gap:.5em;padding:.5em;">
      <textarea id="taggedjs-dump-user-textarea" wrap="off" placeholder="paste json here"
        onchange=${change}
        style="min-width:300px;min-height:400px;flex:1"
      >${userJson === "" ? "" : userJsonString}</textarea>

      ${userJson === "" ? "" : html`
        <div id="taggedjs-dump-user-result" style="flex:1;min-width:110px;width:100%;max-width:900px;background-color:rgba(255,255,255,.5);min-width:300px">
          ${dump({
            value: userJson
          })}
        </div>
      `}
    </div>
    <div style="max-width:900px">
      ${dump(sampleDump)}
    </div>

    ${renderCountDiv({renderCount , name:'dumpContent'})}
  `
})

// execute script in private context
function sandboxEval(
  src: string,
  ctx: Record<string, any>
){
  if(!src) {
    return src
  }

  ctx = new Proxy(ctx, {has: () => true})
  let func = (new Function("with(this) { return (" + src + ")}"));
  return func.call(ctx)
}

import { tag, div, textarea, noElement } from "taggedjs"
import { dump } from "./dump/index"
import { renderCountDiv } from "./renderCount.component"

export const dumpContent = tag(() => {
  let userJsonString = ''
  let renderCount = 0
  let userJson: any = ''
  let badEval = false

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

  const sampleDump = {
    showLevels: 15,
    showAll: true,
    value: {
      test: {
        anotherOne: 22
      },
      arrayTest: [{
        name:'something',
        location: {street: '4361'},
      }, {
        name:'in this',
        location: {street: '2235'},
      }, {
        name:'world',
        location: {street: '4785'},
      }]
    }
  }

  return noElement(
    div({
      style: "display:flex;flex-wrap:wrap;align-item:center;justify-content: center;gap:.5em;padding:.5em;"
    },
      textarea({
        id: "taggedjs-dump-user-textarea",
        wrap: "off",
        placeholder: "paste json here",
        onChange: change,
        style: "min-width:300px;min-height:400px;flex:1"
      },
        _=> userJson === "" ? "" : userJsonString
      ),

      _=> userJson === "" ? "" : div({
        id: "taggedjs-dump-user-result",
        style: "flex:1;min-width:110px;width:100%;max-width:900px;background-color:rgba(255,255,255,.5);min-width:300px"
      },
        _=> dump({
          value: userJson
        })
      )
    ),

    div({style: "max-width:900px"},
      // dump(sampleDump)
    ),

    _=> renderCountDiv({renderCount, name:'dumpContent'})
  )
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

import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

const componentPatternCode = `export const basic = tag(() => {
  let counter = 0
  let renderCount = 0
  let showDiv = true

  renderCount++

  return div(
    h2('Basic Component'),
    
    p(_=> \`Counter: \${counter}\`),
    p(_=> \`Render Count: \${renderCount}\`),
    
    button.onClick(() => counter++)('Increment Counter'),

    button.onClick(() => showDiv = !showDiv)(
      _=> \`Toggle Div (\${showDiv ? 'Hide' : 'Show'})\`
    ),

    _=> showDiv && boltTag(counter),
  )
})
`

const componentArgsCode = `const boltTag = tag((parentCounter: number) => {
  boltTag.updates(args => [parentCounter] = args)

  return div(
    div(_=> \`parent counter: \${parentCounter}\`)
  )
})
`

const componentCallCode = `return div(
  _=> boltTag(counter)
)`

const componentOutputCode = `import { output, tag, button } from "taggedjs"

export const child = tag((onSave: () => void) => {
  onSave = output(onSave)
  return button.onClick(() => onSave())("Save")
})

export const parent = tag(() => {
  let saved = 0

  return div(
    _=> child(() => saved++),
    div(_=> \`saved: \${saved}\`)
  )
})
`

const componentAsyncCallbackCode = `import { callback } from "taggedjs"

const getHash = () => window.location.hash.substring(1) || '/'

const HashRouter = () => {
  const memory = {route: getHash()}
  const onHashChange = callback(() => memory.route = getHash())
  window.addEventListener('hashchange', onHashChange)
  return {memory, onHashChange}
}
`

const componentPromiseCode = `const promiseTag = tag(() => {
  let x = 0
  tag.promise = new Promise((resolve) => {
    setTimeout(() => {
      ++x
      resolve(x)
    }, 250)
  })
  return div.id\`tag-promise-test\`(_=> \`count \${x}\`)
})
`

const onDestroyCode = `import { tag, div, button, onDestroy, host, signal } from "taggedjs"

const contentTag = tag(() => {
  onDestroy(() => {
    // closing logic here
  })

  return div("this tag will be destroyed")
})

const destroys = tag(() => (showContent: boolean) =>
div(
  "Content:", _=> showContent && contentTag(),
  button
    .onClick(() => { showContent = !showContent } )
    (_=> showContent ? "destroy" : "restore")
))
`

export function componentPatternSection() {
  return section({class: "section-card", id: "component-pattern"},
    docH2("component-pattern", "🧩 Component Pattern"),
    p(
      "Components are created by calling ",
      code("tag"),
      " and returning mock element functions like ",
      code("div"),
      ", ",
      code("button"),
      ", and ",
      code("p"),
      ". A minimal component example already lives in ",
      code("src/basic.tag.ts"),
      "."
    ),
    figure(
      pre(code({class: "language-ts"}, componentPatternCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/basic.tag.ts`, target: "_blank"}, code("src/basic.tag.ts"))
      )
    ),
    docH3("tag-component-display", "🧠 Component Display"),
    p(
      "When you pass arguments to a tag component, render it inside a ",
      code("_=>"),
      " block so TaggedJS treats argument changes as updates."
    ),
    p(
      "This keeps the tag mounted and lets ",
      code(".updates(...)"),
      " receive new arguments without recreating the component."
    ),
    p(
      "Using ",
      code("_=>"),
      " also helps it stand out as dynamic display, while something like ",
      code("div.onClick(() => {})"),
      " reads more like an event handler. It's optional, but recommended for ",
      "clearer intent."
    ),
    figure(
      pre(code({class: "language-ts"}, componentCallCode)),
      figcaption("Render tag components inside a dynamic output")
    ),
    docH3("tag-component-arguments", "🧵 Component Arguments"),
    p(
      "Tag components receive arguments like normal functions, but you must opt in ",
      "to argument updates when those values change. Call ",
      code(".updates(...)"),
      " inside the tag to re-assign the latest arguments in the same order they ",
      "were passed."
    ),
    p(
      "This keeps local variables in sync with the parent without re-running the ",
      "entire tag function."
    ),
    figure(
      pre(code({class: "language-ts"}, componentArgsCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/basic.tag.ts`, target: "_blank"}, code("src/basic.tag.ts"))
      )
    ),
    docH3("tag-component-callbacks", "🪝 Functions for Output"),
    p(
      "TaggedJS treats function arguments as outputs: when the child calls the ",
      "function, the parent can update state and re-render the dependent ",
      code("_=>"),
      " segments."
    ),
    p(
      "This mirrors Angular-style outputs and keeps data flowing up without ",
      "recreating the child component."
    ),
    p(
      "Calling ",
      code("output"),
      " with the callback binds the caller to the currently running tag, so when ",
      "the child triggers it, TaggedJS knows which parent output to re-evaluate."
    ),
    figure(
      pre(code({class: "language-ts"}, componentOutputCode)),
      figcaption("Child callback triggers parent updates")
    ),
    docH3("tag-component-async-callbacks", "⏱️ Async Callback Wrapper"),
    p(
      "TaggedJS exports ",
      code("callback"),
      " to wrap async handlers (events, timers, promises) so the current tag ",
      "can re-evaluate dependent ",
      code("_=>"),
      " outputs when the async work completes."
    ),
    p(
      "Call ",
      code("callback"),
      " inline and assign it to a new variable so it can be registered and ",
      "cleaned up with the async API."
    ),
    figure(
      pre(code({class: "language-ts"}, componentAsyncCallbackCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/todo/src/HashRouter.function.ts`, target: "_blank"}, code("todo/src/HashRouter.function.ts"))
      )
    ),
    docH3("tag-component-promise", "⏳ tag.promise"),
    p(
      "Set ",
      code("tag.promise"),
      " to a Promise to tell TaggedJS that a new render cycle should run when ",
      "that async work completes."
    ),
    p(
      "Do not use ",
      code("await tag.promise"),
      " or await the promise inline; the promise is only a signal for re-render, ",
      "not a value to block on."
    ),
    figure(
      pre(code({class: "language-ts"}, componentPromiseCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/async.tag.ts`, target: "_blank"}, code("src/async.tag.ts"))
      )
    ),
    docH3("on-destroy", "🧹 onDestroy Cleanup"),
    p(
      "Use ",
      code("onDestroy"),
      " to run cleanup logic when a tag component is removed. For host elements, ",
      code("host.onDestroy"),
      " lets you attach cleanup at the element level."
    ),
    figure(
      pre(code({class: "language-ts"}, onDestroyCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/destroys.tag.ts`, target: "_blank"}, code("src/destroys.tag.ts"))
      )
    ),
    p(
      "Common uses include removing event listeners, stopping intervals, or ",
      "disposing subscriptions tied to the component lifecycle."
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}

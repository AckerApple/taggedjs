import { htmlTag, section, p, pre, a, br } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

const basicCounterCode = `import { tag, p, button } from 'taggedjs'

export const basicCounter = tag(() => (counter = 0) => [
  p('Counter: ', _=> counter}),
  button.onClick(() => counter++)('Increment Counter')
])
`

const basicShowHideCode = `import { tag, div, button } from 'taggedjs'

export const basicShowHide = tag(() => (showDiv = true) =>
  div(
    button.onClick(() => showDiv = !showDiv)(
      _=> \`Toggle Div (\${showDiv ? 'Hide' : 'Show'})\`
    ),
    _=> showDiv && div('Now you see me')
  )
)
`

const componentArgsCode = `const boltTag = tag((parentCounter: number) => {
  boltTag.updates(args => [parentCounter] = args)

  return div(
    div(_=> \`parent counter: \${parentCounter}\`)
  )
})
`

const componentArgumentFlowCode = `export const parent = tag(() => {
  let counter = 0

  return div(
    button.onClick(() => counter++)("Increment"),
    _=> boltTag(counter)
  )
})

const boltTag = tag((parentCounter: number) => {
  boltTag.updates(args => [parentCounter] = args)

  return div(_=> \`parent counter: \${parentCounter}\`)
})
`

const componentInputsCode = `import { tag, output, footer, span, button } from "taggedjs"

const Footer = tag((
  todosCount: number,
  removeCompleted: () => any,
  route: string,
  activeTodoCount: number,
) => {
  Footer.inputs(args => {
    [todosCount, removeCompleted, route, activeTodoCount] = args
    removeCompleted = output(removeCompleted)
  })

  return footer(
    span(_=> activeTodoCount),
    _=> (todosCount - activeTodoCount) > 0 &&
      button.onClick(() => removeCompleted())("Clear completed")
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

const outputUpdatesCode = `import { tag, output, button } from "taggedjs"

const child = tag((onSave: () => void) => {
  onSave = output(onSave)

  child.updates(args => {
    [onSave] = args
    onSave = output(onSave)
  })

  return button.onClick(onSave)("Save")
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

const outerHtmlCode = `import { tag, div, span } from "taggedjs"

const Greeting = tag((name: string) =>
  div("hello world", () => name)
)

const html = Greeting(" love").outerHTML

console.log(html)
// <div>hello world love</div>

const Nested = tag(() =>
  div.class\`wrapper\`(
    span("hello world")
  )
)

Nested().outerHTML
// <div class="wrapper"><span>hello world</span></div>
`

const outerHtmlManualCode = `import { elementVarToHtmlString } from "taggedjs"

const html = elementVarToHtmlString(Greeting(" love"))
`

const staticHtmlOutputCode = `import { Window as HappyWindow } from "happy-dom"
import fs from "fs"
import { tagElement } from "taggedjs"
import { GuideApp } from "../src/documentations/guide.js"

const window = new HappyWindow()
globalThis.window = window as any
globalThis.document = window.document as any

const mount = document.createElement("app")
mount.id = "docs-app"
document.body.appendChild(mount)

tagElement(GuideApp, mount)

const html = mount.innerHTML
fs.writeFileSync("documentation/index.html", html)
`

const staticHtmlShellCode = `<app id="docs-app">
  <!-- taggedjs:ssr-start -->
  <header>...</header>
  <main>...</main>
  <!-- taggedjs:ssr-end -->
</app>

<script type="module">
  import { runDocs } from "../assets/dist/bundle.js"
  runDocs()
</script>
`

const staticHtmlRunDocsCode = `export function runDocs() {
  const mount = document.getElementById("docs-app")
  if(!mount) return

  mount.innerHTML = ""
  tagElement(GuideApp, mount)
}
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
  return section.class`section-card`.id`component-pattern`(docH2("component-pattern", "🧩 Component Pattern"), p(
      "Components are created by calling ",
      code("tag"),
      " and returning mock element functions like ",
      code("div"),
      ", ",
      code("button"),
      ", and ",
      code("p"),
      ". Below are some simple examples. You may see syntax used in ways you have not seen before BUT all code is native vanilla JavaScript that is supported everywhere."
    ), p.class`code-title`("Basic Counter Component"), figure.class`code-block`(pre(code.class`language-ts`(basicCounterCode))), p('☝️ ABOVE Explanation: The function "basicCounter" becomes a tag component when wrapped in a tag() call. The tag requires no inputs/props/arguments. The new tag/component is designed to create a local variable counter that is set to 0 and increments when a button is clicked.'), br, br, p.class`code-title`("Basic show/hide Component"), figure.class`code-block`(pre(code.class`language-ts`(basicShowHideCode))), p('☝️ ABOVE Explanation: The function "basicShowHide" becomes a tag component when wrapped in a tag() call. The tag requires no inputs/props/arguments. The new tag/component is designed to create a local variable "showDiv" that is toggled true/false when a button is clicked.'), br, br, p(
      "The ",
      code("tag(() => (counter = 0) => div(_=> counter))"),
      " form is shorthand for declaring local variables and returning markup. It ",
      "is the same as ",
      code("tag(() => { let counter = 0; return div(_=> counter) })"),
      ", just more compact."
    ), p(
      "Returning an array lets you emit multiple root elements without a wrapper. ",
      code("() => [div('hello'), div('world')]"),
      " is the no-wrapper alternative to ",
      code("() => div('hello world')"),
      " when you want separate siblings."
    ), br, docH3("tag-component-display", "🧠 Component Display"), p(
      "When you pass arguments to a tag component, render it inside a ",
      code("_=>"),
      " block so TaggedJS treats argument changes as updates."
    ), p(
      "This keeps the tag mounted and lets ",
      code(".updates(...)"),
      " receive new arguments without recreating the component."
    ), p(
      "Using ",
      code("_=>"),
      " also helps it stand out as dynamic display, while something like ",
      code("div.onClick(() => {})"),
      " reads more like an event handler. It's optional, but recommended for ",
      "clearer intent."
    ), figure(
      pre(code.class`language-ts`(componentCallCode)),
      figcaption("Render tag components inside a dynamic output")
    ), docH3("tag-component-arguments", "🧵 Component Arguments"), p(
      "Component arguments are TaggedJS inputs. They are values the parent passes ",
      "down to a child component, similar to Angular ",
      code("@Input()"),
      " properties."
    ), p(
      "A tag component is a stable instance after it is mounted. Its main function ",
      "sets up local state and returns the view once; later parent changes update ",
      "the dynamic output blocks instead of recreating the whole child."
    ), p(
      "That is why child tags that receive changing arguments should be rendered ",
      "inside ",
      code("_=>"),
      ". The dynamic wrapper gives TaggedJS a place to send the latest parent ",
      "values into the already-mounted child."
    ), figure(
      pre(code.class`language-ts`(componentArgumentFlowCode)),
      figcaption(
        "Source: ",
        a.href(`${repoBaseUrl}/src/basic.tag.ts`).target`_blank`(code("src/basic.tag.ts"))
      )
    ), p(
      "Use ",
      code(".updates(...)"),
      " when the child only needs the later values. It receives the current ",
      "argument array in call order and copies those values into the local ",
      "variables used by the child view."
    ), figure(
      pre(code.class`language-ts`(componentArgsCode)),
      figcaption(
        "Source: ",
        a.href(`${repoBaseUrl}/src/basic.tag.ts`).target`_blank`(code("src/basic.tag.ts"))
      )
    ), docH3("tag-component-inputs-updates", "🔌 Inputs and Updates"), p(
      "The important distinction is lifecycle timing, not two competing ways to ",
      "declare inputs. The function parameters define the component inputs. ",
      code(".updates(...)"),
      " runs on later parent argument changes. ",
      code(".inputs(...)"),
      " runs during initial input setup and again on later argument changes."
    ), p(
      "Reach for ",
      code(".inputs(...)"),
      " when incoming arguments need normalization every time they enter the ",
      "component lifecycle. In this repo that usually means turning a function ",
      "input into an output callback with ",
      code("output(...)"),
      ", because the callback must be bound on the first render and whenever the ",
      "parent passes a new function."
    ), p(
      "This keeps the Angular-shaped model clear: inputs are values flowing down ",
      "from the parent, updates are the moment those values are synchronized into ",
      "an existing component, and dynamic ",
      code("_=>"),
      " output blocks are what re-render from those synchronized values."
    ), figure(
      pre(code.class`language-ts`(componentInputsCode)),
      figcaption(
        "Source: ",
        a.href(`${repoBaseUrl}/src/todo/components/footer.ts`).target`_blank`(code("src/todo/components/footer.ts"))
      )
    ), docH3("tag-component-callbacks", "🪝 Functions for Output"), p(
      "Function arguments are the TaggedJS output pattern. The parent passes a ",
      "function down, the child calls it when something happens, and the parent ",
      "updates its own state."
    ), p(
      "That mirrors Angular ",
      code("@Output()"),
      " event flow: inputs move data down into the child, outputs notify the ",
      "parent that something happened."
    ), p(
      "Calling ",
      code("output"),
      " binds the callback to the parent render context. When the child invokes ",
      "that wrapped callback, TaggedJS can re-run the parent's affected ",
      code("_=>"),
      " output blocks after the parent state changes."
    ), figure(
      pre(code.class`language-ts`(componentOutputCode)),
      figcaption("Child callback triggers parent updates")
    ), p(
      "When a function input may change, wrap it again inside ",
      code(".updates(...)"),
      " or use ",
      code(".inputs(...)"),
      " for the initial-and-update form. The repository repeats this pattern in ",
      code("innerCounters"),
      ", ",
      code("funInPropsChild"),
      ", ",
      code("propsDebug"),
      ", and ",
      code("Footer"),
      "."
    ), figure(
      pre(code.class`language-ts`(outputUpdatesCode)),
      figcaption("Re-wrap output callbacks after assigning new inputs")
    ), docH3("tag-component-async-callbacks", "⏱️ Async Callback Wrapper"), p(
      "TaggedJS exports ",
      code("callback"),
      " to wrap async handlers (events, timers, promises) so the current tag ",
      "can re-evaluate dependent ",
      code("_=>"),
      " outputs when the async work completes."
    ), p(
      "Call ",
      code("callback"),
      " inline and assign it to a new variable so it can be registered and ",
      "cleaned up with the async API."
    ), figure(
      pre(code.class`language-ts`(componentAsyncCallbackCode)),
      figcaption(
        "Source: ",
        a.href(`${repoBaseUrl}/todo/src/HashRouter.function.ts`).target`_blank`(code("todo/src/HashRouter.function.ts"))
      )
    ), docH3("tag-component-promise", "⏳ tag.promise"), p(
      "Set ",
      code("tag.promise"),
      " to a Promise to tell TaggedJS that a new render cycle should run when ",
      "that async work completes."
    ), p(
      "Do not use ",
      code("await tag.promise"),
      " or await the promise inline; the promise is only a signal for re-render, ",
      "not a value to block on."
    ), figure(
      pre(code.class`language-ts`(componentPromiseCode)),
      figcaption(
        "Source: ",
        a.href(`${repoBaseUrl}/src/async.tag.ts`).target`_blank`(code("src/async.tag.ts"))
      )
    ), docH3("tag-component-outer-html", "🧾 outerHTML for HTML Strings"), p(
      "Call ",
      code(".outerHTML"),
      " on the result of a tag component to render it as a plain HTML string. ",
      "This is useful for server-side rendering, static HTML generation, tests, ",
      "and snapshots."
    ), p(
      code("outerHTML"),
      " is a getter, not a function. Use ",
      code("MyTag().outerHTML"),
      ", not ",
      code("MyTag.outerHTML"),
      " or ",
      code("MyTag().outerHTML()"),
      "."
    ), figure(
      pre(code.class`language-ts`(outerHtmlCode)),
      figcaption("Serialize a tag output directly")
    ), p(
      "The getter renders the component with its stored arguments, then ",
      "serializes the returned TaggedJS element using the same behavior as ",
      code("elementVarToHtmlString"),
      "."
    ), figure(
      pre(code.class`language-ts`(outerHtmlManualCode)),
      figcaption("Equivalent manual serializer form")
    ), p(
      "Event handlers are intentionally omitted from the returned HTML string, ",
      "matching direct ",
      code("elementVarToHtmlString"),
      " output."
    ), docH3("static-html-seo-output", "🔎 Static HTML / SEO Output"), p(
      "The same string output is what people usually mean by server-side ",
      "rendering, static rendering, pre-rendering, or SEO output. TaggedJS can ",
      "create the HTML before the browser runs the app, so crawlers and users ",
      "receive real document content instead of an empty mount element."
    ), p(
      "This documentation page already uses that pattern. ",
      code("scripts/renderDocsHtml.ts"),
      " mounts ",
      code("GuideApp"),
      " in a Happy DOM document, reads ",
      code("mount.innerHTML"),
      ", and writes that string between the SSR markers in ",
      code("documentation/index.html"),
      "."
    ), figure(
      pre(code.class`language-ts`(staticHtmlOutputCode)),
      figcaption("Generate static HTML from a TaggedJS component")
    ), p(
      "The saved page now contains the rendered header, table of contents, and ",
      "guide sections as normal HTML inside ",
      code("#docs-app"),
      ". That is the SEO-friendly output: the content exists in the file before ",
      "client JavaScript downloads."
    ), figure(
      pre(code.class`language-html`(staticHtmlShellCode)),
      figcaption("Static content in the mount element, followed by the client app")
    ), p(
      "On load, the browser parses that string into real DOM immediately. Then ",
      "the module script calls ",
      code("runDocs()"),
      ". This repo currently clears ",
      code("#docs-app"),
      " and mounts ",
      code("GuideApp"),
      " again so the page becomes the normal interactive TaggedJS app."
    ), figure(
      pre(code.class`language-ts`(staticHtmlRunDocsCode)),
      figcaption("Client-side remount after the static HTML is visible")
    ), p(
      "That flow is close to what frameworks like Next.js do for React in goal: ",
      "send useful HTML first, then attach the client runtime. The current ",
      "TaggedJS docs implementation is a static pre-render plus client remount; ",
      "it does not preserve and hydrate the existing DOM nodes."
    ), docH3("on-destroy", "🧹 onDestroy Cleanup"), p(
      "Use ",
      code("onDestroy"),
      " to run cleanup logic when a tag component is removed. For host elements, ",
      code("host.onDestroy"),
      " lets you attach cleanup at the element level."
    ), figure(
      pre(code.class`language-ts`(onDestroyCode)),
      figcaption(
        "Source: ",
        a.href(`${repoBaseUrl}/src/destroys.tag.ts`).target`_blank`(code("src/destroys.tag.ts"))
      )
    ), p(
      "Common uses include removing event listeners, stopping intervals, or ",
      "disposing subscriptions tied to the component lifecycle."
    ), p(a.class`inline-link`.href`#top`("Back to top")))
}

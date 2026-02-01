import { htmlTag, section, p, pre, a, ul, li } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

const subscribeOutputCode = `import { tag, ValueSubject, subscribe, span, button } from "taggedjs"

const count$ = new ValueSubject(0)

export const counter = tag(() => [
  button.onClick(() => count$.next(count$.value + 1))("Increment"),
  /* output just the emitted value */
  span('count:', subscribe(count$)),

  /* output the emitted value plus a label */
  span(subscribe(count$, value => \`count: \${value}\`))
])
`

const subscribeWithCode = `import { tag, ValueSubject, subscribeWith, span } from "taggedjs"

const status$ = new ValueSubject("idle") // anything with a subscribe method will do

export const status = tag(() => (
  span(subscribeWith(status$, "idle", value => \`status: \${value}\`))
))
`

const subscribeAttributeCode = `import { tag, ValueSubject, subscribeWith, div } from "taggedjs"

const color$ = new ValueSubject("tomato")

export const swatch = tag(() => (
  div({
    style: subscribeWith(color$, "tomato", color => ({ backgroundColor: color }))
  }, "color swatch")
))
`

const manualSubscriptionCode = `import { tag, Subject, onDestroy } from "taggedjs"

const updates$ = new Subject(0)

export const listener = tag(() => {
  const subscription = updates$.subscribe(value => {
    // side effects here
  })

  onDestroy(() => subscription.unsubscribe())

  return "listening"
})
`

export function subscriptionsSection() {
  return section({class: "section-card", id: "subscriptions"},
    docH2("subscriptions", "📡 Subscriptions & Observables"),
    p(
      "TaggedJS treats observable streams as first-class render inputs. Use ",
      code("subscribe"),
      " (and ",
      code("subscribeWith"),
      ") inside output blocks to turn emissions into DOM updates."
    ),
    p(
      "A \"LikeObservable\" is any object with ",
      code("subscribe(callback)"),
      " that returns a subscription object (or function) with an ",
      code("unsubscribe()"),
      " method. TaggedJS subscribes during render and automatically cleans up when that output is removed."
    ),
    docH3("subscribe-output", "🧾 Output Subscriptions"),
    p(
      "Start by using ",
      code("subscribe(observable)"),
      " to display the latest value from an observable."
    ),
    docH3("subscribe-map", "🧩 Map Values to Output"),
    p(
      "If you pass a callback, TaggedJS uses it to map emissions to output. This is useful for formatting or wrapping values."
    ),
    figure(
      pre(code({class: "language-ts"}, subscribeOutputCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/subscriptions.tag.ts`, target: "_blank"}, code("src/subscriptions.tag.ts"))
      )
    ),
    docH3("subscribe-no-arrow", "🚫 No _=> Wrapper"),
    p(
      "Do not wrap ",
      code("subscribe(...)"),
      " with ",
      code("_=>"),
      " — ",
      code("subscribe(...)"),
      " already returns a tagged value that the runtime recognizes and manages."
    ),
    docH3("subscribe-combine", "🔗 Combine Observables"),
    p(
      "To combine multiple observables, use ",
      code("subscribe.all([a$, b$], ([a, b]) => ...)"),
      " (which uses a combined subject under the hood) or ",
      code("pipe([a$, b$], values => ...)"),
      " if you already have a list of observables."
    ),
    docH3("subscribe-with-default", "Default value with subscribeWith"),
    p(
      "Use ",
      code("subscribeWith"),
      " when you want an initial default value before the first emission. It emits the default (or current ",
      code(".value"),
      " if available) and then switches to live updates."
    ),
    figure(
      pre(code({class: "language-ts"}, subscribeWithCode)),
      figcaption("Default emission with subscribeWith")
    ),
    docH3("subscribe-attributes", "🎨 Subscriptions in Attributes"),
    p(
      "Subscriptions also work in attributes. The runtime wires the attribute once and updates the value on each emission."
    ),
    figure(
      pre(code({class: "language-ts"}, subscribeAttributeCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/subscribeAttributes.tag.ts`, target: "_blank"}, code("src/subscribeAttributes.tag.ts"))
      )
    ),
    docH3("subscription-lifecycle", "♻️ Subscription Lifecycle"),
    p(
      "When a ",
      code("subscribe"),
      " output is rendered, TaggedJS creates an internal subscription context that stores the latest values and the list of active subscriptions."
    ),
    ul(
      li(
        "Subscribes to each observable on first render and stores the returned subscriptions in ",
        code("contextItem.subContext.subscriptions"),
        "."
      ),
      li(
        "When the output is removed (conditional turns false, array diff removes it, or component is destroyed), ",
        code("deleteAndUnsubscribe"),
        " calls ",
        code("unsubscribe()"),
        " on each stored subscription and clears the sub-context."
      ),
      li(
        "If a value changes from a subscription to something else, TaggedJS destroys the old subscription and then updates the DOM with the new value."
      )
    ),
    p(
      "For debugging, ",
      code("Subject.globalSubCount$"),
      " tracks active subscriptions and is incremented on ",
      code("subscribe"),
      " and decremented on ",
      code("unsubscribe"),
      "."
    ),
    docH3("manual-unsubscribe", "🧹 Manual Unsubscribe"),
    p(
      "If you subscribe manually via ",
      code("Subject.subscribe"),
      " (outside of ",
      code("subscribe(...)"),
      "), you are responsible for calling ",
      code("subscription.unsubscribe()"),
      ". ",
      code("onDestroy"),
      " is the usual place to do that."
    ),
    figure(
      pre(code({class: "language-ts"}, manualSubscriptionCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/providers.tag.ts`, target: "_blank"}, code("src/providers.tag.ts"))
      )
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}

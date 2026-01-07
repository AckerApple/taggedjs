import { htmlTag, section, h2, p, a } from "../node_modules/taggedjs/js/index.js"

const code = htmlTag("code")
const h3 = htmlTag("h3")

export function reactiveUpdatesSection() {
  return section({class: "section-card", id: "reactive-updates"},
    h2("Reactive Updates"),
    p(
      "Reactive updates are driven by closures and tracked by the TaggedJS runtime. ",
      "When a function uses values in an arrow callback (for example, ",
      code("_=>"),
      "), the runtime re-evaluates that part of the view when the values change."
    ),
    p(
      "In the example above, the ",
      code("p"),
      " tags and the final conditional ",
      code("_=> showDiv && boltTag(counter)"),
      " are reactive segments."
    ),
    h3("React vs TaggedJS"),
    p(
      "React typically re-runs the component function to produce the next render ",
      "output, then reconciles the result. TaggedJS keeps the main tag function ",
      "stable and re-evaluates only the dynamic segments marked with ",
      code("_=>"),
      ", which helps focus updates on the specific parts that changed."
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}

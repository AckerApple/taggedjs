import { htmlTag, section, p, a } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const code = htmlTag("code")

export function reactiveUpdatesSection() {
  return section({class: "section-card", id: "reactive-updates"},
    docH2("reactive-updates", "🔁 Reactive Updates"),
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
    docH3("react-vs-taggedjs", "⚖️ React vs TaggedJS"),
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

import { htmlTag, div, header, h1, p, a } from "../node_modules/taggedjs/js/index.js"

const nav = htmlTag("nav")

export function guideHeader() {
  return header(
    div({class: "wrap"},
      h1("Work With The TaggedJS Code"),
      p(
        "This guide is grounded in the real TaggedJS source. Each section points to ",
        "current files and uses live excerpts so you can follow the actual patterns ",
        "used in this repo."
      ),
      nav({class: "primary"},
        a({href: "index.html"}, "Docs Home"),
        a({href: "../index.html"}, "Live App"),
        a({href: "#toc"}, "Guide Index")
      )
    )
  )
}

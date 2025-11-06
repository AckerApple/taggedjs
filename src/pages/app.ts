import { head, title, meta, link, body, noscript, table, tr, td, tag, htmlDoc } from "taggedjs"

export default tag.app = tag(routeTag =>
  htmlDoc({lang: "en"},
    head(
      title('TaggedJs'),
      meta({charset:"UTF-8"}),
      meta({
        name: "viewport",
        content: "viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      }),
      meta({name: "apple-mobile-web-app-title", content: "TaggedJs"}),
      // meta({name: "apple-mobile-web-app-capable", content: "yes"}), // deprecated
      meta({name: "mobile-web-app-capable", content: "yes"}),
      meta({name: "apple-mobile-web-app-status-bar-style", content: "black"}),
      link({
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏷️</text></svg>"
      }),
      link({href: "animate.min.css", type: "text/css", rel: "stylesheet"}),
      link({href: "document.css", type: "text/css", rel: "stylesheet"})
    ),

    body(
      noscript({style: "color:red"}, 'Javascript is required but is turned off on your device'),
      table({cellPadding: "0", cellSpacing: "0", border: "0", style: "width: 100%;height: 100%;"},
        tr(
          td({valign: "center", style: "text-align: center;"},
            routeTag()
          )
        )
      )
    )
  )
)


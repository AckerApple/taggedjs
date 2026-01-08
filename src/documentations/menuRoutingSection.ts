import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

const menuRoutingCode = `export const menu = () => {
  const router = hashRouterSubject()

  return subscribe(router, item => {
    const menuName = getMenuNameByItem(item)
    return div(
      a({
        'style.opacity': _=> menuName === 'home' ? '.5' : '1',
        href: _=> menuName === 'home' ? undefined : '#/'
      }, 'home'),
      
      ' - ',
      
      a({
        'style.opacity': _=> menuName === 'isolated' ? '.5' : '1',
        href: _=> menuName === 'isolated' ? undefined : 'isolated.html'
      }, 'isolated'),
      
      ' - ',
      
      a({
        'style.opacity': _=> menuName === 'counters' ? '.5' : '1',
        href: _=> menuName === 'counters' ? undefined : '#counters/'
      }, 'counters'),
      ' - ',
      a({
        'style.opacity': _=> menuName === 'content' ? '.5' : '1',
        href: _=> menuName === 'content' ? undefined : '#content/'
      }, 'content'),
      
      ' - ',
      
      a({
        'style.opacity': _=> menuName === 'todo' ? '.5' : '1',
        href: _=> menuName === 'todo' ? undefined : 'todo/www/'
      }, 'todo app'),

      ' - ',
      
      button({
        type: "button",
        onClick: () => window.location.href = 'documentation/index.html'
      }, 'documentation'),
      
      ' - ',
      
      a({href: "https://github.com/AckerApple/taggedjs", target: "_blank"},
        'repo'
      )
    )
  })
}
`

export function menuRoutingSection() {
  return section({class: "section-card", id: "menu-routing"},
    docH2("menu-routing", "🧭 Menu And Routing"),
    p(
      "The menu is a live view of the current hash route. It subscribes to the ",
      "router subject, decides which view is active, and renders anchor links."
    ),
    figure(
      pre(code({class: "language-ts"}, menuRoutingCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/menu.tag.ts`, target: "_blank"}, code("src/menu.tag.ts"))
      )
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}

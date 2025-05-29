import { tag, html } from "taggedjs"
import { useHashRouter } from "./todo/HashRouter.function"

export function useMenuName() {
  const router = useHashRouter()
  const route = router.route
  const pathname = router.location.pathname
  
  if(pathname && route === 'counters/') {
    return 'counters'
  }

  if(pathname && route === 'content/') {
    return 'content'
  }
  
  const isIsolated = pathname.endsWith('isolated.html')
  if(isIsolated) {
    return 'isolated'
  }

  const isTodo = pathname.includes('todo/www')
  if(isTodo) {
    return 'todo'
  }

  return 'home'
}

export const menu = () => tag.use = (
  menuName = useMenuName(),
) => html`
  <div>
    <a style.opacity=${menuName === 'home' ? '.5' : '1'}
      href=${menuName === 'home' ? undefined : '#/'}
    >home</a>
    &nbsp;-&nbsp;
    <a style.opacity=${menuName === 'isolated' ? '.5' : '1'}
      href=${menuName === 'isolated' ? undefined : 'isolated.html'}
    >isolated</a>
    &nbsp;-&nbsp;
    <a style.opacity=${menuName === 'counters' ? '.5' : '1'}
      href=${menuName === 'counters' ? undefined : '#counters/'}
    >counters</a>
    &nbsp;-&nbsp;
    <a style.opacity=${menuName === 'content' ? '.5' : '1'}
      href=${menuName === 'content' ? undefined : '#content/'}
    >content</a>
    &nbsp;-&nbsp;
    <a style.opacity=${menuName === 'todo' ? '.5' : '1'}
      href=${menuName === 'todo' ? undefined : 'todo/www/'}
    >todo app</a>
    &nbsp;-&nbsp;
    <a href="https://github.com/AckerApple/taggedjs" target="_blank">repo</a>
  </div>
`

import { tag, subscribe, div, a } from "taggedjs"
import { hashRouterSubject, useHashRouter } from "./todo/HashRouter.function"

export function getMenuNameByItem(router: {route:string, location: any}) {

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

export const menu = () => {
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
      
      a({href: "https://github.com/AckerApple/taggedjs", target: "_blank"},
        'repo'
      )
    )
  })
}


/** @deprecated */
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

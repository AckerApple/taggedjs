import { RouteProps, RouteQuery, RouteTag, ValueSubject } from 'taggedjs'
import App from './pages/app'
import isolatedApp from './pages/isolatedApp.page'
// import * as fs from 'fs'

const run = () => {
  const param = ''
  
  const routeProps = {
    param,
    paramSubject: new ValueSubject(param),
    query: new RouteQuery(),
  }
  

  const routeTag: RouteTag = (extraProps?: Record<string, any>) => {
    const allProps: RouteProps = Object.assign({}, routeProps)
    Object.assign({}, extraProps)
    return (isolatedApp as any)(allProps)()
  }

  return App(routeTag)
}

const result = run()
console.log('result', result)
//const tag = result.getTemplate().string()
// fs.writeFile('isolatedApp.page.html', )
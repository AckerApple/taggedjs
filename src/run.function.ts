import { tagElement } from "taggedjs"
import { App } from "./app.tag"
import IsolatedApp from "./isolatedApp"

export function run() {
  const element = document.getElementsByTagName('app')[0]

  const pathname = window.location.pathname
  const locationSplit = pathname.split('/').filter(x => x)
  const location = locationSplit[0]?.toLowerCase()
  if(location && ['isolated.html','index-static.html'].includes(location)) {
    const start = Date.now()
    tagElement(IsolatedApp, element, {test:1})
    const end = Date.now() - start
    console.info(`⏱️ isolated render in ${end}ms`)
    return
  }

  const start = Date.now()
  tagElement(App, element, {test:1})
  const end = Date.now() - start
  console.info(`⏱️ rendered in ${end}ms`)
}

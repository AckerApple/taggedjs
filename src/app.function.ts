import { tagElement } from "taggedjs"
import { App } from "./app.tag"
import { IsolatedApp } from "./isolatedApp"

export const app = () => {// app.ts
  console.info('attaching app to element...')
  const element = document.getElementsByTagName('app')[0]

  const pathname = window.location.pathname
  const locationSplit = pathname.split('/').filter(x => x)
  const location = locationSplit[0]?.toLowerCase()
  if(location && ['isolated.html','index-static.html'].includes(location)) {
      tagElement(IsolatedApp, element, {test:1})
      return
  }

  tagElement(App, element, {test:1})
}

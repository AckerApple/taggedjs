import { div, button, tag } from "taggedjs"

const promiseTag = tag(() => {
  let x = 0
  tag.promise = new Promise((resolve) => {
    setTimeout(() => {
      ++x
      resolve(x)
    }, 250)
  })
  return div.id`tag-promise-test`(_=> `count ${x}`)
})

export const asyncSection = tag(() => {
  let showPromiseTest = false

  return div({id: "async-display-wrapper"},
    button({
      id: "toggle-promise-test",
      onClick: () => showPromiseTest = !showPromiseTest
    }, _=> showPromiseTest ? 'hide' : 'show', ' promise tag'),
    _=> showPromiseTest && promiseTag()
  )
})

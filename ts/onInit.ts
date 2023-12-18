import { Tag } from "./Tag.class.js"
import { setUse } from "./tagRunner.js"

export type OnInitCallback = () => unknown

/** When undefined, it means a tag is being built for the first time so do run init(s) */
export let initCurrentTag: Tag | undefined

export function setCurrentInitTag(tag: Tag | undefined) {
  initCurrentTag = tag
}

export function onInit(
  callback: OnInitCallback
) {
  if(!initCurrentTag) {
    callback()
  }
}

setUse({
  beforeRender: (_tagSupport, tag) => {
    setCurrentInitTag(tag)
  }
})

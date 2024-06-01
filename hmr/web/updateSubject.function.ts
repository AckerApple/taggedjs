/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 */

import { switchAllProviderConstructors } from "./switchAllProviderConstructors.function.js"
import { InsertBefore, TagSubject, TagSupport, TaggedFunction, Wrapper } from "taggedjs"

/** @typedef {{renderTagOnly: renderTagOnly, renderTagSupport: renderTagSupport, renderWithSupport: renderWithSupport}} HmrImport */

/**
 * Used to switch out the wrappers of a subject and then render
 * @param {*} contextSubject 
 * @param {TagComponent} newTag 
 * @param {TagComponent} oldTag 
 * @param {HmrImport} hmr 
 */
export async function updateSubject(
  contextSubject: TagSubject,
  newTag: TaggedFunction<any>,
  oldTag: TaggedFunction<any>,
  hmr: any
) {
  /** @type {TagSupport} */
  const contextSupport = contextSubject.tagSupport
  
  const oldest = contextSupport.global.oldest as TagSupport
  const newest = contextSupport.global.newest as TagSupport

  const toString = newTag.original.toString()
  // contextSupport.templater.wrapper.original.compareTo = toString
  if(oldTag.original) {
    oldTag.compareTo = toString
  }
  
  // everytime an old owner tag redraws, it will use the new function
  oldTag.original = newTag.original
  const contextWrapper = contextSupport.templater.wrapper as Wrapper
  contextWrapper.parentWrap.original = newTag.original
  
  const newWrapper = newest.templater.wrapper as Wrapper
  newWrapper.parentWrap.original = newTag.original
  
  const oldWrapper = oldest.templater.wrapper as Wrapper
  oldWrapper.parentWrap.original = newTag.original

  const prevConstructors = newest.global.providers.map(provider => provider.constructMethod)

  /** @type {TagSupport} */
  const reSupport: TagSupport = hmr.renderTagOnly(
    newest,
    newest,
    newest.subject,
    newest.ownerTagSupport,
  )

  const appSupport = oldest.getAppTagSupport()
  const providers = reSupport.global.providers
  const owner = oldest.ownerTagSupport.global.oldest as TagSupport
  // connect child to owner
  reSupport.ownerTagSupport = owner
  // connect owner to child
  owner.childTags.push(reSupport)  

  providers.forEach((provider, index) => {
    prevConstructors[index].compareTo = provider.constructMethod.compareTo
    provider.constructMethod.compareTo = provider.constructMethod.toString()
    switchAllProviderConstructors(appSupport, provider)
  })

  await oldest.destroy()

  oldest.global.deleted = false
  delete (reSupport.global as any).oldest // TODO this maybe redundant of oldest.destroy()
  delete reSupport.global.newest

  const insertBefore = oldest.global.insertBefore as InsertBefore
  reSupport.buildBeforeElement(insertBefore, {
    // forceElement: false,
    counts: {added:0, removed: 0},
  })

  reSupport.global.newest = reSupport
  reSupport.global.oldest = reSupport
  contextSubject.tagSupport = reSupport
}

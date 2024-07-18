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
import { InsertBefore, TagSubject, Support, TaggedFunction, Wrapper } from "taggedjs"

/** @typedef {{renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */

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
  /** @type {Support} */
  const contextSupport = contextSubject.support
  
  const oldest = contextSupport.subject.global.oldest as Support
  const newest = contextSupport.subject.global.newest as Support

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

  const prevConstructors = newest.subject.global.providers.map(provider => provider.constructMethod)

  /** @type {Support} */
  const reSupport: Support = hmr.renderTagOnly(
    newest,
    newest,
    newest.subject,
    newest.ownerSupport,
  )

  const appSupport = oldest.getAppSupport()
  const providers = reSupport.subject.global.providers
  const owner = oldest.ownerSupport.subject.global.oldest as Support
  // connect child to owner
  reSupport.ownerSupport = owner
  // connect owner to child
  owner.subject.global.childTags.push(reSupport)  

  providers.forEach((provider, index) => {
    prevConstructors[index].compareTo = provider.constructMethod.compareTo
    provider.constructMethod.compareTo = provider.constructMethod.toString()
    switchAllProviderConstructors(appSupport, provider)
  })

  await oldest.destroy()

  delete oldest.subject.global.deleted
  delete (reSupport.subject.global as any).oldest // TODO this maybe redundant of oldest.destroy()
  delete reSupport.subject.global.newest

  const insertBefore = oldest.subject.global.insertBefore as InsertBefore
  reSupport.buildBeforeElement(undefined, {counts: {added:0, removed: 0}})

  reSupport.subject.global.newest = reSupport
  reSupport.subject.global.oldest = reSupport
  contextSubject.support = reSupport
}

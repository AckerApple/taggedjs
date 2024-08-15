/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 */

import { switchAllProviderConstructors } from "./switchAllProviderConstructors.function"
import { buildBeforeElement, ContextItem, destroySupport, Support, SupportTagGlobal, TaggedFunction, TagGlobal, Wrapper } from "taggedjs"

/** @typedef {{renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */

/**
 * Used to switch out the wrappers of a subject and then render
 * @param {*} contextSubject 
 * @param {TagComponent} newTag 
 * @param {TagComponent} oldTag 
 * @param {HmrImport} hmr 
 */
export async function updateSubject(
  contextSubject: ContextItem,
  newTag: TaggedFunction<any>,
  oldTag: TaggedFunction<any>,
  hmr: any
) {
  const global = contextSubject.global as SupportTagGlobal
  
  const oldest = global.oldest as Support
  const newest = global.newest as Support

  const toString = newTag.original.toString()
  // contextSupport.templater.wrapper.original.compareTo = toString
  if(oldTag.original) {
    oldTag.compareTo = toString
  }
  
  // everytime an old owner tag redraws, it will use the new function
  oldTag.original = newTag.original
  const contextWrapper = newest.templater.wrapper as Wrapper
  contextWrapper.parentWrap.original = newTag.original
  
  const newWrapper = newest.templater.wrapper as Wrapper
  newWrapper.parentWrap.original = newTag.original
  
  const oldWrapper = oldest.templater.wrapper as Wrapper
  oldWrapper.parentWrap.original = newTag.original

  const pros = global.providers
  const prevConstructors = pros ? pros.map(provider => provider.constructMethod) : []

  /** @type {Support} */
  const reSupport: Support = hmr.renderTagOnly(
    newest,
    newest,
    newest.subject,
    newest.ownerSupport,
  )

  const appSupport = oldest.appSupport
  const ownGlobal = oldest.ownerSupport.subject.global as SupportTagGlobal
  const providers = global.providers
  const owner = ownGlobal.oldest as Support

  // connect child to owner
  reSupport.ownerSupport = owner

  if(providers) {
    providers.forEach((provider, index) => {
      prevConstructors[index].compareTo = provider.constructMethod.compareTo
      provider.constructMethod.compareTo = provider.constructMethod.toString()
      switchAllProviderConstructors(appSupport, provider)
    })
  }

  await destroySupport(oldest, 0)

  const reGlobal = reSupport.subject.global as SupportTagGlobal
  const oldGlobal = oldest.subject.global as TagGlobal
  delete oldGlobal.deleted

  buildBeforeElement(reSupport, undefined, oldest.subject.placeholder, {counts: {added:0, removed: 0}})

  reGlobal.newest = reSupport
  reGlobal.oldest = reSupport
}

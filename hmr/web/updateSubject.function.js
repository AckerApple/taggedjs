/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 * @typedef {import("taggedjs/js/state/providers").Provider} Provider
 */

const { switchAllProviderConstructors } = require("./switchAllProviderConstructors.function");

/** @typedef {{renderTagOnly: renderTagOnly, renderTagSupport: renderTagSupport, renderWithSupport: renderWithSupport}} HmrImport */

/**
 * Used to switch out the wrappers of a subject and then render
 * @param {*} contextSubject 
 * @param {TagComponent} newTag 
 * @param {TagComponent} oldTag 
 * @param {HmrImport} hmr 
 */
export async function updateSubject(
  contextSubject,
  newTag,
  oldTag,
  hmr
) {
  /** @type {TagSupport} */
  const contextSupport = contextSubject.tagSupport
  
  const oldest = contextSupport.global.oldest
  const newest = contextSupport.global.newest

  const toString = newTag.original.toString()
  // contextSupport.templater.wrapper.original.compareTo = toString
  if(oldTag.original) {
    oldTag.compareTo = toString
  }
  
  // everytime an old owner tag redraws, it will use the new function
  oldTag.original = newTag.original

  contextSupport.templater.wrapper.parentWrap.original = newTag.original
  newest.templater.wrapper.parentWrap.original = newTag.original
  oldest.templater.wrapper.parentWrap.original = newTag.original

  const prevConstructors = newest.global.providers.map(provider => provider.constructMethod)

  /** @type {TagSupport} */
  const reSupport = hmr.renderTagOnly(
    newest,
    newest,
    newest.subject,
    newest.ownerTagSupport,
  )

  const appSupport = oldest.getAppTagSupport()
  const providers = reSupport.global.providers
  const owner = oldest.ownerTagSupport.global.oldest
  // connect child to owner
  reSupport.ownerTagSupport = owner
  // connect owner to child
  owner.childTags.push(reSupport)  

  providers.forEach((provider, index) => {
    // console.log('uppppppppppppp', {
    //   x: prevConstructors[index],
    //   y: provider.constructMethod.compareTo,
    //   xy: prevConstructors[index] === provider.constructMethod.compareTo,
    //   xy2: prevConstructors[index] === provider.constructMethod,
    // })

    // switchAllProviderConstructors(oldest, provider)
    prevConstructors[index].compareTo = provider.constructMethod.compareTo
    provider.constructMethod.compareTo = provider.constructMethod.toString()
    switchAllProviderConstructors(appSupport, provider)
  })

  await oldest.destroy()

  oldest.global.deleted = false
  delete reSupport.global.oldest
  delete reSupport.global.newest

  const insertBefore = oldest.global.insertBefore
  reSupport.buildBeforeElement(insertBefore, {
    forceElement: false,
    counts: {added:0, removed: 0},
  })

  reSupport.global.newest = reSupport
  reSupport.global.oldest = reSupport
  // reSupport.subject.tagSupport = reSupport
  contextSubject.tagSupport = reSupport
}

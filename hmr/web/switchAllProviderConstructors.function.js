/**
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs/js/state/providers").Provider} Provider
 */



/**
 * 
 * @param {TagSupport} tagSupport 
 * @param {Provider} provider 
 */
export function switchAllProviderConstructors(
  tagSupport,
  provider,
) {
  // provider.constructMethod.compareTo = provider.constructMethod.compareTo || provider.constructMethod

  const proString = provider.constructMethod.compareTo
  tagSupport.global.providers.forEach(iPro => {
    if(proString === iPro.constructMethod.compareTo) {
      iPro.constructMethod.compareTo = provider.constructMethod.compareTo
    }
  })

  // recursion
  tagSupport.childTags.forEach(childTag =>
    switchAllProviderConstructors(childTag, provider)
  )
}

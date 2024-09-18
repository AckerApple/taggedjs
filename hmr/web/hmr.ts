/** client code */

// 🟠 Warning: avoid direct imports due to bundle workflow (old bundle and new bundle do not mix well)
import { renderWithSupport, renderSupport, renderTagOnly, paint, TemplaterResult, Tag, Support, TaggedFunction, Wrapper, Context, SupportTagGlobal, ValueTypes, TagAppElement, setUseMemory, Original } from "taggedjs"
import { updateSubject } from "./updateSubject.function"

/** @type {Support | undefined} */
let lastApp: Support

reconnect()

/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").TagWrapper} TagWrapper
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").Support} Support
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderSupport} renderSupport
 * @typedef {import("taggedjs").paint} paint
 */

/** @typedef {{paint: paint, renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */
export type HmrImport = {
  paint: typeof paint
  renderTagOnly: typeof renderTagOnly
  renderSupport: typeof renderSupport
  renderWithSupport: typeof renderWithSupport
}

function reconnect() {
  const socket = new WebSocket('ws://localhost:3000');

  // Listen for WebSocket errors
  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  })

  // Connection opened
  socket.addEventListener('open', (event) => {
    console.info('WebSocket connection opened:', event);
  })

  // Listen for messages from the server
  socket.addEventListener('message', async (event) => {
    console.info('💬 from server:', event.data, event.data);

    if(event.data==='Connected to the WebSocket endpoint') {
      // immediately overwrite existing running app
      rebuildApps()        
      return
    }

    runElementSelector()
  })

  // Connection closed
  socket.addEventListener('close', (event) => {
    console.info('WebSocket connection closed:', event);

    reconnect()
  })
}

function runElementSelector() {
  forEachApp(app => {
    updateByElement(app)
  })
}

function forEachApp(method: (x: Element) => any) {
  const array = [...document.querySelectorAll('app')]
  array.forEach(method)
}

/**
 * @returns {Promise<{tagName: string, newApp: any, newTemplater: () => Tag}[]>}
 */
async function discoverTags() {
  const baseArray = document.querySelectorAll('[tag]')
  const array = [...baseArray]
  
  const promises = array.map(async element => {
    const url = element.getAttribute('url')
    const tagName = element.getAttribute('name') as string

    const newApp = await import(`${url}?${Date.now()}`)

    /** @type {() => Tag} */
    try {
      const newTemplater = newApp[tagName]() as TemplaterResult
      return {
        newApp,
        newTemplater,
        tagName
      }
    } catch(err) {
      console.error(`Could not load tag by name ${tagName}`, {newApp, url})
      throw err
    }
  })

  const results = await Promise.all(promises)

  return results
}

/** @type {TagComponent{}} */
let lastTags: TaggedFunction<any>[] = []

/**
 * 
 * @param {Element} app 
 */
async function updateByElement(
  app: Element
) {
  const tagAppElm: TagAppElement = app as any

  /** @type {TagComponent[]} */
  const oldTags = lastTags
  const oldSetUse = tagAppElm.setUse as any // placed on element by tagElement command
    
  const tags = await discoverTags()

  // loop new tags looking for matching old
  for (const tag of tags) {
    const { newApp, newTemplater } = tag
    
    /** @type {HmrImport} */
    const hmr = newApp.hmr

    const wrapper = newTemplater.wrapper as Wrapper
    const newSetup = wrapper.parentWrap.original as any

    const newTags: TaggedFunction<any>[] = newSetup.tags
    const newSetUse = newSetup.setUse as typeof setUseMemory

    // Object.assign(oldSetUse, newSetUse) // updates old with new
    // share direct comparisons
    // Object.assign(tagAppElm.ValueTypes, newSetup.ValueTypes)
    ;(window as any).hmr = true

    // Object.assign(newSetUse, oldSetUse) // update the new with the old
    newSetUse.stateConfig = oldSetUse.stateConfig // update the new with the old
    setUseMemory.stateConfig = oldSetUse.stateConfig
    Object.assign(newSetup.ValueTypes, tagAppElm.ValueTypes) // update the new with the old
    Object.assign(ValueTypes, tagAppElm.ValueTypes) // update this hmr

    /** @type {{oldTag: Tag, newTag: Tag}[]} */
    const tagChangeStates = oldTags.reduce((all, oldTag, index) => {
      let newTag = newTags
        .find(newTag => newTag.original.toString() === oldTag.original.toString()) as TaggedFunction<any>

      if(!newTag) {
        const tagIndex = index // oldTag.tagIndex
        if(tagIndex !== undefined) {
          newTag = newTags[tagIndex]
        }

        all.push({oldTag, newTag})
      }

      return all
    }, [] as { oldTag: TaggedFunction<any>; newTag: TaggedFunction<any>; }[])
  
    if(!tagChangeStates.length) {
      console.warn('No old tags changed', {
        newTags, oldTags
      })
    }
  
    const matchedTagCounts = oldTags.length === newTags.length
  
    for (let index=0; index < newTags.length; ++index) {
      const newTag = newTags[index]
      let oldTag = oldTags.map(oldTag => oldTag.original).find(
        oldTag => newTag.original.toString() === oldTag.toString()
      )
  
      let tagIndex = null
      if(!oldTag && tagChangeStates[0].newTag as any) {
        tagIndex = index // newTag.tagIndex
        if( matchedTagCounts ) {
          oldTag = oldTags[ tagIndex ]
        }
      }
      
      if(!oldTag) {
        if(tagChangeStates[0].newTag as any) {
          const message = 'HMR has two tags'
  
          console.warn(message, {
            first: tagChangeStates[0].newTag.original,
            second: newTag.original,
            equal: newTag.original === tagChangeStates[0].newTag.original,
            oldTags,
            newTags,
            tagIndex,
          })
          throw new Error(message)
        }
        tagChangeStates[0].newTag = newTag
      }
    }
  
    if(tagChangeStates.length) {
      const {oldTag, newTag} = tagChangeStates[0]
      
      // Check to rebuild the MAIN APP
      const isAppChanged = hasAppRelatedTo(lastApp, oldTag.original)
      if(isAppChanged) {
        const lastWrapper = lastApp.templater.wrapper as Wrapper
        lastWrapper.parentWrap.original = newTag.original as Original
        lastApp.ownerSupport = {clones:[], childTags:[]} as any as Support
        // lastApp.rebuild().then(x => lastApp = x)
        lastTags = newTags
        throw new Error('app changed, need code for that')
        continue
      }

      // rebuild tag that has an owner
      const count = await replaceTemplater(
        lastApp, tagChangeStates[0], hmr
      )

      oldTag.original = newTag.original
      ;(newTag as any).compareTo = newTag.original.toString()

      if(count <= 0) {
        console.warn('✋ No components were updated', tagChangeStates[0])
      } else {
        console.debug(`✅ Replaced and update components ${count}`, tagChangeStates[0])
      }
    }
  
    lastTags = newTags
  
    console.info('✅ ✅ ✅ rebuilt')
  }
}

/**
 * 
 * @param {Support} ownerSupport 
 * @param {{oldTag: TagComponent, newTag: TagComponent}} param1 
 * @param {HmrImport} hmr 
 * @returns {Promise<number>}
 */
async function replaceTemplater(
  ownerSupport: Support,
  {oldTag, newTag}: {oldTag: any, newTag: any},
  hmr: any
) {
  let count = 0
  const templater = ownerSupport.templater
  const tag = templater.tag as Tag
  const values = tag.values

  const promises = values.map((value: any, index) => {
    const tagJsType = value && value.tagJsType
    if(!tagJsType) {
      return // not a tagJsType value
    }

    const isTemplater = [
      ValueTypes.templater[0],
      // ValueTypes.renderOnce[0], // TODO: HMR does not support render once
      ValueTypes.tagComponent[0],
      // ValueTypes.stateRender[0],
      // ValueTypes.dom[0],
      ValueTypes.tag[0],
    ].includes(tagJsType[0])
    if(!isTemplater) {
      return
    }

    if(!value.wrapper) {
      return
    }

    const isWrapping = wrapperHasTagMethod(value.wrapper, oldTag)

    // Check to rebuild a component within an app
    if(isWrapping) {
      const global = ownerSupport.subject.global as SupportTagGlobal
      const context = global.context as Context
      const contextSubject = context[ index ]
  
      updateSubject(
        contextSubject, newTag, oldTag, hmr
      )

      paint()
      hmr.paint()
      
      ++count

      return
    }
  })
  
  await Promise.all(promises)

  const global = ownerSupport.subject.global as SupportTagGlobal
  const context = global.context
  const subPromises = context.map(async child => {
    const childGlobal = child.global as SupportTagGlobal

    if(!childGlobal) {
      return
    }

    const support = childGlobal.newest as Support

    if(support) {
      count = count + await replaceTemplater(
        support, {oldTag, newTag},
        hmr
      )
    }
  })

  await Promise.all(subPromises)

  return count
}

function rebuildApps() {
  forEachApp(element => {
    discoverTags().then(apps => {
      apps.forEach(({newApp, tagName}) => {
        /** @type {{tagElement: tagElement}} */
        const { tagElement } = newApp.hmr
        const oldValueTypes = (element as TagAppElement).ValueTypes
        if((element as any).destroy) {
          (element as any).destroy()
        }
        
        const result = tagElement(newApp[tagName as string], element, {test:1})
        
        lastTags = result.tags
        lastApp = result.support
        
        // tagElement.ValueTypes = result.ValueTypes
        tagElement.ValueTypes = ValueTypes
        ;(element as any).ValueTypes = ValueTypes
  
        return result
      })
    })
  })
}

/**
 * 
 * @param {Support} lastApp 
 * @param {any} oldTag 
 * @returns {boolean}
 */
function hasAppRelatedTo(
  lastApp: Support,
  oldTag: any,
) {
  const oldTemplater = lastApp.templater
  const wrapper = oldTemplater.wrapper as Wrapper
  const parentWrap = wrapper.parentWrap

  const match0 = parentWrap.original === oldTag
  if(match0) return match0

  const match1 = parentWrap.original.toString() === oldTag.toString()
  return match1
}

function wrapperHasTagMethod(
  wrapper: any,
  oldTag: any,
) {
  const parentWrap = wrapper.parentWrap
  const ogFun = parentWrap.original

  const original = oldTag.original
  const match0 = ogFun === original
  if(match0) {
    return 1
  }

  const match1 = ogFun.toString() === original.toString()
  if(match1) {
    return 2
  }

  const match2 = wrapper.parentWrap.compareTo === original.toString()
  return match2
}
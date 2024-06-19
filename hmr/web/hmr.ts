/** client code */

// 🟠 Warning: avoid direct imports due to bundle workflow (old bundle and new bundle do not mix well)
// const { renderWithSupport, renderSupport } = require("taggedjs");

import { TemplaterResult, TagSubject, Tag, Support, TaggedFunction, ValueTypes, Wrapper } from "taggedjs"
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
 */

/** @typedef {{renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */

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
    console.info('Message from server:', event.data, event.data);

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
  app: any
) {
  /** @type {TagComponent[]} */
  const oldTags = lastTags
  const oldSetUse = app.setUse // placed on element by tagElement command
    
  const tags = await discoverTags()

  // loop new tags looking for matching old
  tags.forEach(async tag => {
    const { newApp, newTemplater } = tag
    
    /** @type {HmrImport} */
    const hmr = newApp.hmr

    const wrapper = newTemplater.wrapper as Wrapper
    const original = wrapper.parentWrap.original as any

    const newTags: TaggedFunction<any>[] = original.tags
    const newSetUse = original.setUse

    // providers have to remain the way they were
    newSetUse.memory.providerConfig = oldSetUse.memory.providerConfig
    
    oldSetUse.tagUse.length = 0
    // oldSetUse.tagUse = newSetUse.tagUse
    oldSetUse.tagUse.push(
      ...newSetUse.tagUse,
    )
    
    // update old middleware to use new memory
    Object.assign(oldSetUse.memory, newSetUse.memory)
    
    // bind the old and new together
    newSetUse.memory = oldSetUse.memory
  
    /** @type {{oldTag: Tag, newTag: Tag}[]} */
    const tagChangeStates = oldTags.reduce((all, oldTag) => {
      let newTag = newTags
        .map(newTag => newTag.original)
        .find(newTag => newTag.toString() === oldTag.original.toString())

      if(!newTag) {
        const tagIndex = oldTag.tagIndex
        if(tagIndex !== undefined) {
          newTag = newTags[tagIndex]
        }

        all.push({oldTag, newTag})
      }

      return all
    }, [])
  
    if(!tagChangeStates.length) {
      console.warn('No old tags changed', {
        newTags, oldTags
      })
    }
  
    const matchedTagCounts = oldTags.length === newTags.length
  
    newTags.forEach((newTag) => {
      let oldTag = oldTags.map(oldTag => oldTag.original).find(oldTag => newTag.original.toString() === oldTag.toString())
  
      let tagIndex = null
      if(!oldTag && tagChangeStates[0].newTag) {
        tagIndex = newTag.tagIndex
        if( matchedTagCounts ) {
          oldTag = oldTags[ tagIndex ]
        }
      }
      
      if(!oldTag) {
        if(tagChangeStates[0].newTag) {
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
    })
  
    if(tagChangeStates.length) {
      const {oldTag, newTag} = tagChangeStates[0]
      
      // Check to rebuild the MAIN APP
      const isAppChanged = hasAppRelatedTo(lastApp, oldTag.original)
      if(isAppChanged) {
        const lastWrapper = lastApp.templater.wrapper as Wrapper
        lastWrapper.parentWrap.original = newTag.original
        lastApp.ownerSupport = {clones:[], childTags:[]} as any as Support
        // lastApp.rebuild().then(x => lastApp = x)
        lastTags = newTags
        throw new Error('app changed, need code for that')
        return
      }

      // rebuild tag that has an owner
      const count = await replaceTemplater(
        lastApp, tagChangeStates[0], hmr
      )

      oldTag.original = newTag.original
      newTag.compareTo = newTag.original.toString()

      if(count <= 0) {
        console.warn('✋ No components were updated', tagChangeStates[0])
      } else {
        console.debug(`✅ Replaced and update components ${count}`, tagChangeStates[0])
      }
    }
  
    lastTags = newTags
  
    console.info('✅ ✅ ✅ rebuilt')
  })
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
  let  count = 0
  const tag = ownerSupport.templater.tag as Tag
  const promises = tag.values.map(async (value: any, index) => {
    const isTemplater = value.jsTagType = ValueTypes.templater
    if(!value || !isTemplater) {
      return
    }

    const wrapper = value.wrapper
    const isWrapping = wrapperHasTagMethod(wrapper, oldTag)

    // Check to rebuild a component within an app
    if(isWrapping) {
      const global = ownerSupport.subject.global
      const context = global.context
      const contextSubject = context[ index ]
      
      updateSubject(
        contextSubject as TagSubject, newTag, oldTag, hmr
      )
      
      ++count

      return
    }
  })
  
  await Promise.all(promises)

  const subPromises = ownerSupport.subject.global.childTags.map(async child => {
    count = count + await replaceTemplater(
      child, {oldTag, newTag},
      hmr
    )
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
        
        if((element as any).destroy) {
          (element as any).destroy()
        }

        const result = tagElement(newApp[tagName as string], element, {test:1})
        
        lastTags = result.tags
        lastApp = result.support
  
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
  const ogFun = wrapper.parentWrap.original

  if(!ogFun) {
    throw 'maybe issue'
  }
  if(!oldTag.original) {
    throw 'maybe issue 2'
  }
  
  const original = oldTag.original
  const match0 = ogFun === original
  if(match0) return match0

  const match1 = ogFun.toString() === original.toString()
  if(match1) return match1

  const match2 = wrapper.parentWrap.compareTo === original.toString()
  return match2
}
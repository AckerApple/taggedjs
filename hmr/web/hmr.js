/** client code */

/** @type {TagSupport | undefined} */
let lastApp;

// 🟠 Warning: avoid direct imports due to bundle workflow (old bundle and new bundle do not mix well)
// const { renderWithSupport, renderTagSupport } = require("taggedjs");

const { variablePrefix } = require("taggedjs/js/Tag.class");
const { updateSubject } = require("./updateSubject.function");

reconnect()

/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").TagWrapper} TagWrapper
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 * @typedef {import("taggedjs/js/state/providers").Provider} Provider
 */

/** @typedef {{renderTagOnly: renderTagOnly, renderTagSupport: renderTagSupport, renderWithSupport: renderWithSupport}} HmrImport */

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

function forEachApp(method) {
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
    const tagName = element.getAttribute('name')

    const newApp = await import(`${url}?${Date.now()}`)

    /** @type {() => Tag} */
    try {
      const newTemplater = newApp[tagName]()
      return {newApp, newTemplater, tagName}
    } catch(err) {
      console.error(`Could not load tag by name ${tagName}`, {newApp, url})
      throw err
    }
  })

  const results = await Promise.all(promises)

  return results
}

/** @type {TagComponent{}} */
let lastTags = []

/**
 * 
 * @param {Element} app 
 */
async function updateByElement(
  app
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
        
    /** @type {TagComponent[]} */
    // const newTags = newTemplater.wrapper.original.tags
    /** @type {TagWrapper<any>[]} */
    const newTags = newTemplater.wrapper.parentWrap.original.tags
    const newSetUse = newTemplater.wrapper.parentWrap.original.setUse

    // console.log('newTags', {newTags, oldTags})

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

    console.log('tagChangeStates', tagChangeStates)
  
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

      console.log('oldTag', {
        oldTag,
        oldTagOrg: oldTag.original,
        newTag,
        newTagOrg: newTag.original,
      })
      
      // Check to rebuild the MAIN APP
      const isAppChanged = hasAppRelatedTo(lastApp, oldTag.original)
      if(isAppChanged) {
        lastApp.templater.wrapper.parentWrap.original = newTag.original
        lastApp.ownerTagSupport = {clones:[], childTags:[]}
        lastApp.rebuild().then(x => lastApp = x)
        lastTags = newTags
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
 * @param {TagSupport} ownerTagSupport 
 * @param {{oldTag: TagComponent, newTag: TagComponent}} param1 
 * @param {HmrImport} hmr 
 * @returns {Promise<number>}
 */
async function replaceTemplater(
  ownerTagSupport,
  {oldTag, newTag},
  hmr
) {
  let  count = 0
  const tag = ownerTagSupport.templater.tag
  const promises = tag.values.map(async (value, index) => {
    if(!value || !value.isTemplater) {
      return
    }

    const wrapper = value.wrapper
    const isWrapping = wrapperHasTagMethod(wrapper, oldTag)

    // Check to rebuild a component within an app
    if(isWrapping) {
      const global = ownerTagSupport.global
      const context = global.context
      const contextSubject = context[ variablePrefix + index ]
      
      updateSubject(
        contextSubject, newTag, oldTag, hmr
      )
      
      ++count

      return
    }
  })
  
  await Promise.all(promises)

  const subPromises = ownerTagSupport.childTags.map(async child => {
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
        
        if(element.destroy) {
          console.log('destroyed along the way')
          element.destroy()
        }

        const result = tagElement(newApp[tagName], element, {test:1})
        
        lastTags = result.tags
        lastApp = result.tagSupport
  
        return result
      })
    })
  })
}

/**
 * 
 * @param {TagSupport} lastApp 
 * @param {TagSupport} oldTag 
 * @returns {boolean}
 */
function hasAppRelatedTo(lastApp, oldTag) {
  const oldTemplater = lastApp.templater
  
  const match0 = oldTemplater.wrapper.parentWrap.original === oldTag
  if(match0) return match0

  const match1 = oldTemplater.wrapper.parentWrap.original.toString() === oldTag.toString()
  return match1
}

function wrapperHasTagMethod(
  wrapper,
  oldTag,
) {
  const ogFun = wrapper.parentWrap.original
  
  const match0 = ogFun === oldTag.original
  if(match0) return match0

  const match1 = ogFun.toString() === oldTag.original.toString()
  if(match1) return match1

  // const match2 = ogFun.compareTo === oldTag.original.toString()
  const match2 = wrapper.parentWrap.compareTo === oldTag.original.toString()
  return match2
}
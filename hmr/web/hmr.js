/** client code */

/** @type {TagSupport | undefined} */
let lastApp;

// 🟠 Warning: avoid direct imports due to bundle workflow (old bundle and new bundle do not mix well)
// const { renderWithSupport, renderTagSupport } = require("taggedjs");

const { variablePrefix } = require("taggedjs/js/Tag.class");

reconnect()

/**
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 */

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

async function updateByElement(
  app
) {
  /** @type {TagComponent[]} */
  const oldTags = lastTags
  const oldSetUse = app.setUse
    
  const tags = await discoverTags()

  // loop new tags looking for matching old
  tags.forEach(async tag => {
    const { newApp, newTemplater } = tag
    
    /** @type {{renderTagSupport: renderTagSupport, renderWithSupport: renderWithSupport}} */
    const hmr = newApp.hmr
    
    const {
      renderWithSupport,
      renderTagSupport,
    } = hmr
    
    /** @type {TagComponent[]} */
    const newTags = newTemplater.wrapper.original.tags
    const newSetUse = newTemplater.wrapper.original.setUse
    
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
      let newTag = newTags.find(newTag => newTag.toString() === oldTag.toString())
      
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
      let oldTag = oldTags.find(oldTag => newTag.toString() === oldTag.toString())
  
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
            first: tagChangeStates[0].newTag,
            second: newTag,
            equal: newTag === tagChangeStates[0].newTag,
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
      const oldTemplater = lastApp.templater
      const match0 = oldTemplater.wrapper.original === oldTag
      const match1 = oldTemplater.wrapper.original.toString() === oldTag.toString()

      if(match0 || match1) {
        lastApp.templater.wrapper.original = newTag
        lastApp.ownerTagSupport = {clones:[], childTags:[]}
        lastApp.rebuild().then(x => lastApp = x)

        lastTags = newTags
        return
      }
  
      const count = await replaceTemplater(
        lastApp, tagChangeStates[0], {renderWithSupport, renderTagSupport}
      )
      
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

async function replaceTemplater(
  /** @type {TagSupport} */
  ownerTagSupport,
  /** @type {{oldTag: TagComponent, newTag: TagComponent}} */
  {oldTag, newTag},
  /** @type {{renderWithSupport:renderWithSupport, renderTagSupport:renderTagSupport}} */
  {
    renderWithSupport,
    renderTagSupport,
  }
  ) {
  let  count = 0
  const tag = ownerTagSupport.templater.tag
  const promises = tag.values.map(async (value, index) => {
    if(!value || !value.isTemplater) {
      return
    }

    const match0 = value.wrapper.original === oldTag
    const match1 = value.wrapper.original.toString() === oldTag.toString()

    // Check to rebuild a component within an app
    if(match0 || match1) {
      const global = ownerTagSupport.global
      const context = global.context
      const contextSubject = context[ variablePrefix + index ]
      
      // replace the developer function that may have been updated
      value.wrapper.original = newTag

      updateSubject(
        contextSubject, newTag, oldTag, renderTagSupport
      )
      
      ++count

      return
    }
  })
  
  await Promise.all(promises)

  const subPromises = ownerTagSupport.childTags.map(async child => {
    count = count + await replaceTemplater(
      child, {oldTag, newTag},
      {renderWithSupport, renderTagSupport}
    )
  })

  await Promise.all(subPromises)

  return count
}

/** Used to switch out the wrappers of a subject and then render */
async function updateSubject(
  contextSubject,
  /** @type {TagComponent} */
  newTag,
  /** @type {TagComponent} */
  oldTag,
  /** @type {renderTagSupport} */
  renderTagSupport
) {
  /** @type {TagSupport} */
  const contextSupport = contextSubject.tagSupport
  
  const oldest = contextSupport.global.oldest
  const newest = contextSupport.global.newest
  
  contextSupport.templater.wrapper.original = newTag
  newest.templater.wrapper.original = newTag
  oldest.templater.wrapper.original = newTag
  oldTag.original = newTag // everytime an old owner tag redraws, it will use the new function

  return await renderTagSupport(
    oldest,
    false
  )
}

function rebuildApps() {
  forEachApp(element => {
    discoverTags().then(apps => {
      apps.forEach(({newApp, tagName}) => {
        /** @type {{tagElement: tagElement}} */
        const { tagElement } = newApp.hmr
        
        if(element.destroy) {
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

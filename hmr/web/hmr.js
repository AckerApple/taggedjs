/** client code */

const { variablePrefix } = require("taggedjs/js/Tag.class");

// do not use another import as it wont be same memory as running app
// import { redrawTag, Tag, tagElement } from "taggedjs"

reconnect()

/**
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
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
    const { redrawTag } = newApp.hmr
    
    /** @type {TagComponent[]} */
    const newTags = newTemplater.wrapper.original.tags
    const newSetUse = newTemplater.wrapper.original.setUse
    oldSetUse.tagUse = newSetUse.tagUse
    // update old middleware to use new memory
    Object.assign(oldSetUse.memory, newSetUse.memory)
    
    // bind the old and new together
    newSetUse.memory = oldSetUse.memory
  
    /** @type {{oldTag: Tag, newTag: Tag}[]} */
    const tagChangeStates = oldTags.reduce((all, oldTag, loopIndex) => {
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
  
    newTags.forEach((newTag, index) => {
      let oldTag = oldTags.find(oldTag => newTag.toString() === oldTag.toString())
  
      let tagIndex = null
      if(!oldTag && tagChangeStates[0].newTag) {
        // const tagIndex = newTag.tagSupport.templater.wrapper.tagIndex // newTag.tagIndex
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
      const compareTag = tagChangeStates[0].oldTag
      
      // Check to rebuild the MAIN APP
      const oldTemplater = lastApp.tagSupport.templater
      const match0 = oldTemplater.wrapper.original === compareTag
      const match1 = oldTemplater.wrapper.original.toString() === compareTag.toString()
      if(match0 || match1) {
        const newTag = tagChangeStates[0].newTag
        lastApp.tagSupport.templater.wrapper.original = newTag
        await lastApp.destroy()
        lastApp = await rebuildTag(lastApp, redrawTag)
        lastTags = newTags
        return
      }
  
      const count = await replaceTemplater(lastApp, tagChangeStates[0], redrawTag)
      
      if(count <= 0) {
        console.warn('✋ No components were updated', tagChangeStates[0])
      } else {
        console.debug(`✅ Replaced and update components ${count}`, tagChangeStates[0])
      }
    }
  
    lastTags = newTags
  
    console.info('✅ ✅ ✅ rebuilt', )
  })
}

async function rebuildTag(
  /** @type {Tag} */
  tag,
  redrawTag,
  ownerTag,
) {
  /** @type {{retag: Tag}} */
  const { retag } = redrawTag(
    tag.tagSupport,
    tag.tagSupport.templater,
    tag, // existingTag
    ownerTag, // TODO: not needed
  )

  retag.tagSupport.templater.insertBefore = tag.tagSupport.templater.insertBefore

  retag.rebuild()

  if(tag.ownerTag) {
    retag.ownerTag.children.push(retag)
  }

  return retag
}

async function replaceTemplater(
  /** @type {Tag} */
  tag,
  /** @type {{oldTag: TagComponent, newTag: TagComponent}} */
  {oldTag, newTag},
  redrawTag,
  ) {
  let  count = 0
  const promises = tag.values.map(async (value, index) => {
    if(!value || !value.isTemplater) {
      return
    }

    const match0 = value.wrapper.original === oldTag
    const match1 = value.wrapper.original.toString() === oldTag.toString()

    // Check to rebuild a component within an app
    if(match0 || match1) {
      const tagSupport = tag.tagSupport
      // const tagSupport = oldTag.tagSupport
      const memory = tagSupport.memory
      const context = memory.context
      const contextSubject = context[ variablePrefix + index ]
      value.wrapper.original = newTag
      const contextSupport = contextSubject.tag.tagSupport
      contextSupport.templater.wrapper.original = newTag
      
      await contextSubject.tag.destroy()
      // destroyContextClones(contextSubject.tag.tagSupport.memory.context)
      
      contextSubject.tag = await rebuildTag(contextSubject.tag, redrawTag, tag)
      
      ++count

      return
    }
  })
  
  await Promise.all(promises)

  const subPromises = tag.children.map(async child => {
    count = count + await replaceTemplater(child, {oldTag, newTag}, redrawTag)
  })

  await Promise.all(subPromises)

  return count
}

/** @type {Tag | undefined} */
let lastApp;

function rebuildApps() {
  forEachApp(element => {
    discoverTags().then(apps => {
      apps.forEach(({newApp, tagName}) => {
        const { tagElement } = newApp.hmr
        const result = tagElement(newApp[tagName], element, {test:1})
        
        lastTags = result.tags
        lastApp = result.tag
  
        return result
      })
    })
  })
}

function destroyContextClones(context) {
  Object.values(context).forEach(context => {
    if(context.clone) {
      delete context.clone
    }

    if(context.tag) {
      destroyContextClones(context.tag.tagSupport.memory.context)
    }
  })
}

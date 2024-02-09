import { redrawTag, Tag, renderAppToElement } from "./assets/js/taggedjs/index.js";

reconnect()

/**
 * @typedef {import("./assets/js/taggedjs/templater.utils.js").TagComponent} TagComponent
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
  document.querySelectorAll('app').forEach(method)
}

async function getNewApp() {
  const newApp = await import(`./assets/dist/bundle.js?${Date.now()}`)
  /** @type {() => Tag} */
  const newTemplater = newApp.App()
  return {newApp, newTemplater}
}

/** @type {TagComponent{}} */
let lastTags = []

async function updateByElement(
  app
) {
  /** @type {TagComponent[]} */
  const oldTags = lastTags
  const oldSetUse = app.setUse
    
  const { newTemplater } = await getNewApp()
  /** @type {TagComponent[]} */
  const newTags = newTemplater.wrapper.original.tags
  const newSetUse = newTemplater.wrapper.original.setUse

  oldSetUse.tagUse = newSetUse.tagUse
  
  // update old middleware to use new memory
  Object.assign(oldSetUse.memory, newSetUse.memory)
  
  // bind the old and new together
  newSetUse.memory = oldSetUse.memory

  const tagChangeStates = oldTags.reduce((all, oldTag) => {
    const newTag = newTags.find(newTag => newTag.toString() === oldTag.toString())
    if(!newTag) {
      all.push({oldTag, newTag})
    }
    return all
  }, [])

  if(!tagChangeStates) {
    console.warn('No old tags changed')
  }

  const matchedTagCounts = oldTags.length === newTags.length

  newTags.forEach(newTag => {
    let oldTag = oldTags.find(oldTag => newTag.toString() === oldTag.toString())

    let tagIndex = null
    if(!oldTag && tagChangeStates[0].newTag) {
      // const tagIndex = newTag.tagSupport.templater.wrapper.tagIndex // newTag.tagIndex
      tagIndex = newTag.tagIndex
      if(matchedTagCounts && oldTags[ tagIndex ].length === newTag.length) {
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
      lastApp = await rebuildTag( lastApp )
      lastTags = newTags
      return
    }

    const count = await replaceTemplater(lastApp, tagChangeStates[0])
    
    if(count <= 0) {
      console.warn('✋ No components were updated', tagChangeStates[0])
    } else {
      console.debug(`✅ Replaced and update components ${count}`, tagChangeStates[0])
    }
  }

  lastTags = newTags

  console.info('✅ ✅ ✅ rebuilt')
}

async function rebuildTag(
  tag,
) {
  const { retag } = redrawTag(tag, tag.tagSupport.templater)

  retag.insertBefore = tag.insertBefore

  retag.rebuild()

  if(tag.ownerTag) {
    // retag.ownerTag.clones.push(...retag.clones)
    // retag.clones.length=0
    retag.ownerTag.children.push(retag)
  }

  return retag
}

async function replaceTemplater(
  /** @type {Tag} */
  tag,
  /** @type {{oldTag: TagComponent, newTag: TagComponent}} */
  {oldTag, newTag},
  count = 0
) {
  const promises = tag.values.map(async (value, index) => {
    if(!value || !value.isTemplater) {
      return
    }

    const match0 = value.wrapper.original === oldTag
    const match1 = value.wrapper.original.toString() === oldTag.toString()

    // Check to rebuild a component within an app
    if(match0 || match1) {
      // replaceTags(tag, value, index, {oldTag, newTag})
      const contextSubject = tag.tagSupport.memory.context[`__tagVar${index}`]
      value.wrapper.original = newTag
      
      contextSubject.tag.tagSupport.templater.wrapper.original = newTag
      await contextSubject.tag.destroy()

      destroyContextClones(contextSubject.tag.tagSupport.memory.context)

      contextSubject.tag = await rebuildTag(contextSubject.tag)

      ++count
      return
    }

    // TODO: this might be removable
    /*if(value.newest) {
      count = count + await replaceTemplater(value.newest, {oldTag, newTag}, count)
    }*/
  })
  
  await Promise.all(promises)

  const subPromises = tag.children.map(async child => {
    count = count + await replaceTemplater(child,{oldTag, newTag})
  })

  await Promise.all(subPromises)

  return count
}

/** @type {Tag | undefined} */
let lastApp;

function rebuildApps() {
  forEachApp(element => {
    getNewApp().then(({newApp}) => {
      const result = renderAppToElement(newApp.App, element, {test:1})
      
      lastTags = result.tags
      lastApp = result.tag

      return result
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
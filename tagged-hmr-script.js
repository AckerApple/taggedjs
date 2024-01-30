import { runBeforeRender, redrawTag, Subject, Tag, getTagSupport, renderAppToElement } from "./assets/js/taggedjs/index.js";
import { addAppTagRender } from "./assets/js/taggedjs/renderAppToElement.js";

reconnect()

function reconnect() {
  const socket = new WebSocket('ws://localhost:3000');

  // Listen for WebSocket errors
  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  })

  // Connection opened
  socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);

    // Send a message to the server
    socket.send('Hello, server!');

    // destroy previous app
    destroyApps()
  })

  // Listen for messages from the server
  socket.addEventListener('message', async (event) => {
    console.log('Message from server:', event.data, event.data);

    if(event.data==='Connected to the WebSocket endpoint') {
      // immediately overwrite existing running app
      rebuildApps()        
      return
    }

    console.log('reloading app...')
    runElementSelector()
  })

  // Connection closed
  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
    
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

async function updateByElement(
  app
) {
  console.log('update element')
  const oldTag = app.tag
  const oldTags = app.tags
  const oldSetUse = app.setUse
    
  const { newTemplater } = await getNewApp()
  const newTags = newTemplater.wrapper.original.tags
  const newSetUse = newTemplater.wrapper.original.setUse

  oldSetUse.tagUse = newSetUse.tagUse
  oldSetUse.memory = newSetUse.memory

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

  newTags.forEach(newTag => {
    const oldTag = oldTags.find(oldTag => newTag.toString() === oldTag.toString())
    if(!oldTag) {
      if(tagChangeStates[0].newTag) {
        throw new Error('HMR tags mismatched')
      }
      tagChangeStates[0].newTag = newTag
    }
  })

  if(tagChangeStates.length) {
    const compareTag = tagChangeStates[0].oldTag
    console.debug('replacing components', tagChangeStates[0], oldTag.tagSupport)
    const oldTemplater = oldTag.tagSupport.templater
    const match0 = oldTemplater.wrapper.original === compareTag
    const match1 = oldTemplater.wrapper.original.toString() === compareTag.toString()

    if(match0 || match1) {
      const newTag = tagChangeStates[0].newTag
      oldTag.tagSupport.templater.wrapper.original = newTag

      console.log('oldTag 0', oldTag)
      app.tag = await rebuildTag(oldTag, newTag)
      app.tags = newTags
      // app.setUse = newSetUse    
      return
    }

    const count = await replaceTemplater(oldTag, tagChangeStates[0])
    
    if(count <= 0) {
      console.warn('No components were updated', tagChangeStates[0])
    } else {
      console.debug(`Replaced and update components ${count}`, tagChangeStates[0])
    }
  }

  app.tags = newTags
  // app.setUse = newSetUse

  console.log('✅ ✅ ✅ rebuilt')
}

async function rebuildTag(tag, newTag) { 
  const hasOldest = tag.tagSupport.oldest
  
  if(hasOldest) {
    // await tag.tagSupport.oldest.destroy()
    tag.tagSupport.oldest.destroy()
    // delete tag.tagSupport.oldest
  }

  if(!hasOldest) {
    if(tag.ownerTag) {
      tag.ownerTag.clones = tag.ownerTag.clones.filter(clone=>clone.parentNode)
    }

    if(tag.clones.filter(clone=>!clone.parentNode).length) {
      throw new Error('clones with no parent')
    }

    tag.clones = tag.clones.filter(clone=>clone.parentNode)
    await tag.destroy()
  }

  if(tag.tagSupport.newest) {
    // await tag.tagSupport.newest.destroy()
    tag.tagSupport.newest.destroy()
    delete tag.tagSupport.newest
  }

  const {retag} = redrawTag(tag, tag.tagSupport.templater)


  retag.providers = tag.providers
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
    if(match0 || match1) {
      // replaceTags(tag, value, index, {oldTag, newTag})
      const contextSubject = tag.tagSupport.memory.context[`__tagVar${index}`]
      value.wrapper.original = newTag
    
      contextSubject.tag = await rebuildTag(contextSubject.tag, newTag)

      ++count
    }

    if(value.newest) {
      count = count + await replaceTemplater(value.newest, {oldTag, newTag}, count)
      return
    }

    /*if(value.oldest) {
      count = count + await replaceTemplater(value.oldest, {oldTag, newTag}, count)
    }*/
  })

  await Promise.all(promises)

  return count
}

function destroyApps() {
  forEachApp(element => {
    const oldTag = element.tag
    oldTag.destroy()
    delete element.tag
  })
}

function rebuildApps() {
  forEachApp(element => {
    getNewApp().then(({newApp}) => {
      const tag = renderAppToElement(newApp.App, element, {test:1})
    })
  })
}
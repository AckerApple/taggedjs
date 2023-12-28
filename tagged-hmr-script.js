import { getTagSupport, interpolateElement } from "./assets/js/taggedjs/index.js";

console.log('override')

const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened:', event);

  // Send a message to the server
  socket.send('Hello, server!');
});

// Listen for messages from the server
socket.addEventListener('message', async (event) => {
  console.log('Message from server:', event.data, event.data);

  if(event.data==='Connected to the WebSocket endpoint') {
    // immediately overwrite existing running app
    /*
    const newApp = await import(`./assets/dist/bundle.js?${Date.now()}`)
    newApp.default()
    */

    console.log('will run')

    setTimeout(() => {
      runElementSelector()
    }, 3000)
    
    return
  }

  return

  console.log('reloading app...')

  runElementSelector()
})

// Listen for WebSocket errors
socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed:', event);
});

function runElementSelector() {
  document.querySelectorAll('app').forEach(app => {
    updateByElement(app)
  })
}

async function updateByElement(
  app
) {
  const oldTag = app.tag

  console.log('rebuilding...', oldTag.clones.length, oldTag.clones)
  oldTag.rebuild()
  console.log('✅ rebuilt')
  
  return
  const tagSupport = oldTag.tagSupport
  
  const newApp = await import(`./assets/dist/bundle.js?${Date.now()}`)
  const newTemplater = newApp.App()
  
  console.log('app.App', {tagSupport, newTemplater, template: newTemplater.wrapper.original})
  /*
  tagSupport.templater = newTemplater
  tagSupport.templater.wrapper = newTemplater.wrapper
  const newOriginal = newTemplater.wrapper.original
  tagSupport.templater.wrapper.original = newOriginal
  const result = newOriginal()
  */

  const newTag = newTemplater.wrapper()
  newTag.tagSupport = getTagSupport(newTemplater)
  const newStrings = [...newTag.strings]

  console.log('newTag', newTag, newTag.tagSupport)
  console.log('oldTag',oldTag, oldTag.tagSupport)
  newTag.updateByTag(oldTag)
  newTag.strings = newStrings
  const newString = newTag.getTemplate().string
  
  // tag.strings = result.strings
  // tagSupport.templater.forceRenderTemplate(tagSupport, oldTag.ownerTag)
  // tagSupport.render(true)
  // tagSupport.redraw()
  // const newTemplate = oldTag.getTemplate()
  // const newString = newTemplate.string
  // oldTag.update()
  
  app.innerHTML = newString
  interpolateElement(app, newTag.context, newTag)
  // console.log('result.string', {result, newString, newTemplate})
  // oldTag.update()
  // tagSupport.render()
}
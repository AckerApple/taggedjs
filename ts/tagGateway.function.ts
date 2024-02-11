import { Tag } from "./Tag.class.js"
import { redrawTag } from "./redrawTag.function.js"
import { tagElement } from "./tagElement.js"
import { TagComponent, TemplaterResult } from "./templater.utils.js"

type Gateway = {tag:Tag, id:string, observer: MutationObserver}
const gateways: {[id: string]:Gateway} = {}

export function destroyGateways() {
  Object.entries(gateways).forEach(([id, gateway]) => checkGateway(gateway))
}

function checkGateway(gateway: Gateway) {
  const {id, observer, tag} = gateway

  if(document.getElementById(id)) {
    return true
  }

  observer.disconnect()
  tag.destroy()

  delete gateways[id]
  
  return false
}

export const tagGateway = function tagGateway(
  component: TagComponent,
): {id: string} {
  const componentString = functionToHtmlId(component)
  const id = '__tagTemplate_' + componentString
  let intervalId: NodeJS.Timeout
  let found = false

  function findElement() {
    intervalId = setInterval(() => {
      const elements = document.querySelectorAll('#' + id)

      if(!elements.length) {
        return
      }

      // Element has been found, load
      clearInterval(intervalId)

      found = true

      elements.forEach(element => {
        const updateTag = (element as any).updateTag
        if(updateTag) {
          updateTag()
          return
        }
        
        const props = parsePropsString(element)
  
        try {
          const { tag } = tagElement(component, element, props)
          
          watchElement(id, element as HTMLElement, tag)
        } catch (err) {
          console.warn('Failed to render component to element', {component, element, props})
          throw err
        }
      })
    }, 10)
  }

  findElement()

  setTimeout(() => {
    if(found) {
      return
    }

    clearInterval(intervalId)

    throw new Error(`TaggedJs Element ${id} not found`)
  }, 2000)

  return { id }
}

function parsePropsString(
  element: Element,
) {
  const propsString = element.getAttribute('props')
  if(!propsString) {
    return
  }

  let props = {}
  
  try {
    return JSON.parse(propsString)
  } catch (err) {
    console.warn('Failed to parse props on element', {element, propsString, props})
    throw err
  }
}

function watchElement(
  id: string,
  targetNode: HTMLElement,
  tag: Tag,
) {
  let lastTag = tag
  const observer = new MutationObserver((mutationsList, observer) => {
    if(!checkGateway(gateway)) {
      return
    }

    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        updateTag()
      }
    }
  })

  function updateTag() {
    const templater = tag.tagSupport.templater as TemplaterResult
    const oldProps = templater.tagSupport.props
    templater.tagSupport.props = parsePropsString(targetNode)

    const isSameProps = JSON.stringify(oldProps) === JSON.stringify(templater.tagSupport.props)

    if(isSameProps) {
      return // no reason to update, same props
    }
    
    templater.tagSupport.latestProps = templater.tagSupport.props

    const result = redrawTag(lastTag, templater)

    // update records
    gateway.tag = lastTag = result.retag
  }

  ;(targetNode as any).updateTag = updateTag
  
  const gateway = {id, tag, observer}
  gateways[id] = gateway
  
  // Configure the observer to watch for changes in child nodes and attributes
  const config = { attributes: true }
  
  // Start observing the target node for specified changes
  observer.observe(targetNode, config)
}

function functionToHtmlId(func: any) {
  // Convert function to string
  let funcString = func.toString();

  // Remove spaces and replace special characters with underscores
  let cleanedString = funcString.replace(/\s+/g, '_')
                               .replace(/[^\w\d]/g, '_');

  // Ensure the ID starts with a letter
  if (!/^[a-zA-Z]/.test(cleanedString)) {
      cleanedString = 'fn_' + cleanedString;
  }

  return cleanedString;
}

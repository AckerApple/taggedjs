import { Subject } from "./Subject.js"
import { Context, Tag } from "./Tag.class.js"
import { inputAttribute } from "./inputAttribute.js"
import { isSubjectInstance } from "./isInstance.js"

const startRegX = /^\s*{/
const endRegX = /}\s*$/

export function interpolateAttributes(
  child: Element,
  scope: Context,
  ownerTag: Tag,
) {
  const attrNames = child.getAttributeNames()
  attrNames.forEach(attrName => {
    const value = child.getAttribute(attrName)
    const isSpecial = isSpecialAttr(attrName)

    
    // An attempt to replicate React
    if ( value && value.search(startRegX) >= 0 && value.search(endRegX) >= 0 ) {
      // get the code inside the brackets like "variable0" or "{variable0}"
      const code = value.replace('{','').split('').reverse().join('').replace('}','').split('').reverse().join('')
      const result = scope[code]

      // attach as callback
      if(result instanceof Function) {
        ;(child as any)[attrName] = function(...args: any[]) {
          result(child, args)
        }
        return
      }

      if(isSubjectInstance(result)) {
        child.removeAttribute(attrName)
        const callback = (newAttrValue: any) => {
          if(newAttrValue instanceof Function) {
            ;(child as any)[attrName] = function(...args: any[]) {
              newAttrValue(child, args)
            }

            ;(child as any)[attrName].tagFunction = newAttrValue

            return
          }
      
          if (isSpecial) {
            inputAttribute(attrName, newAttrValue, child)
            return
          }

          if(newAttrValue) {
            child.setAttribute(attrName, newAttrValue)
            return
          }

          const isDeadValue = newAttrValue === undefined || newAttrValue === false || newAttrValue === null
          if(isDeadValue) {
            child.removeAttribute(attrName)
            return
          }

          // value is 0
          child.setAttribute(attrName, newAttrValue)
        }

        const sub = result.subscribe(callback as any)
        ownerTag.cloneSubs.push(sub) // this is where unsubscribe is picked up

        // child.setAttribute(attrName, result.value)
        // callback(result.value)

        return
      }


      child.setAttribute(attrName, result.value)
      return
    }

    // Non dynamic
    if (isSpecial) {
      return inputAttribute(attrName, value, child)
    }
  })
}

/** Looking for (class | style) followed by a period */
export function isSpecialAttr(attrName: string) {
  return attrName.search(/^(class|style)(\.)/) >= 0
}
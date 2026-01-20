import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js'
import { ElementVarBase } from './ElementVarBase.type.js'

type ElementLike = Pick<ElementVarBase, 'tagName' | 'innerHTML' | 'attributes'>

export function elementVarToHtmlString(element: ElementVarBase): string {
  return renderElement(element)
}

function renderElement(element: ElementLike): string {
  const attributes = renderAttributes(element.attributes)
  const children = renderChildren(element.innerHTML)
  return `<${element.tagName}${attributes}>${children}</${element.tagName}>`
}

function renderAttributes(attributes: Attribute[]): string {
  if (!attributes || attributes.length === 0) {
    return ''
  }

  const parts: string[] = []
  attributes.forEach(attr => {
    const name = attr[0]
    if (typeof name !== 'string' || name.length === 0) {
      return
    }

    const value = resolveDynamicValue(attr[1])
    if (value === true) {
      parts.push(name)
      return
    }

    if (value === false || value === undefined || value === null) {
      return
    }

    parts.push(`${name}="${escapeHtml(String(value))}"`)
  })

  return parts.length > 0 ? ` ${parts.join(' ')}` : ''
}

function renderChildren(children: any[]): string {
  if (!children || children.length === 0) {
    return ''
  }

  return children
    .map(child => {
      const resolved = resolveDynamicValue(child)
      if (isElementLike(resolved)) {
        return renderElement(resolved)
      }

      if (Array.isArray(resolved)) {
        return renderChildren(resolved)
      }

      if (resolved === undefined || resolved === null || resolved === false) {
        return ''
      }

      return escapeHtml(String(resolved))
    })
    .join('')
}

function isElementLike(value: any): value is ElementLike {
  return !!value && typeof value === 'object' && typeof value.tagName === 'string'
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function resolveDynamicValue(value: any): any {
  if (typeof value === 'function') {
    return value()
  }

  return value
}

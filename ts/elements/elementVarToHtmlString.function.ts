import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js'
import type { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { BasicTypes, ValueTypes } from '../tag/ValueTypes.enum.js'
import type { TagJsComponent } from '../TagJsTags/tag.function.js'
import { ElementVarBase } from './ElementVarBase.type.js'

type ElementLike = Pick<ElementVarBase, 'tagName' | 'innerHTML' | 'attributes'>
type HtmlStringValue = ElementVarBase | TemplaterResult | TagJsComponent<any>

export function elementVarToHtmlString(
  element: HtmlStringValue
): string {
 return elementToString(element)
}

function renderElement(
  element: ElementLike
): string {
  return (element as any).render()
  // return directRenderElement(element)
}

export function directRenderElement(
  element: ElementLike
) {
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
    .map(elementToString)
    .join('')
}

export function elementToString(value: any): string {
  const resolved = resolveDynamicValue(value)
  if (isElementLike(resolved)) {
    return renderElement(resolved)
  }

  if (isTagComponentLike(resolved)) {
    return renderTagComponent(resolved)
  }

  if (Array.isArray(resolved)) {
    return renderChildren(resolved)
  }

  if (resolved === undefined || resolved === null || resolved === false) {
    return ''
  }

  return escapeHtml(String(resolved))
}

function isElementLike(value: any): value is ElementLike {
  return !!value && typeof value === 'object' && typeof value.tagName === 'string'
}

function isTagComponentLike(value: any): value is TemplaterResult {
  return !!value && typeof value === 'object' && value.tagJsType === ValueTypes.tagComponent
}

function renderTagComponent(component: TemplaterResult): string {
  const original = component.wrapper?.original
  if (typeof original !== 'function') {
    return ''
  }

  let result: any = original(...(component.props as unknown[]))
  if (typeof result === BasicTypes.function && result.tagJsType === undefined) {
    result = result()
  }

  return elementToString(result)
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

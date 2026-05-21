import { BasicTypes, ValueTypes } from '../tag/ValueTypes.enum.js';
export function elementVarToHtmlString(element) {
    return renderValue(element);
}
function renderElement(element) {
    const attributes = renderAttributes(element.attributes);
    const children = renderChildren(element.innerHTML);
    return `<${element.tagName}${attributes}>${children}</${element.tagName}>`;
}
function renderAttributes(attributes) {
    if (!attributes || attributes.length === 0) {
        return '';
    }
    const parts = [];
    attributes.forEach(attr => {
        const name = attr[0];
        if (typeof name !== 'string' || name.length === 0) {
            return;
        }
        const value = resolveDynamicValue(attr[1]);
        if (value === true) {
            parts.push(name);
            return;
        }
        if (value === false || value === undefined || value === null) {
            return;
        }
        parts.push(`${name}="${escapeHtml(String(value))}"`);
    });
    return parts.length > 0 ? ` ${parts.join(' ')}` : '';
}
function renderChildren(children) {
    if (!children || children.length === 0) {
        return '';
    }
    return children
        .map(renderValue)
        .join('');
}
function renderValue(value) {
    const resolved = resolveDynamicValue(value);
    if (isElementLike(resolved)) {
        return renderElement(resolved);
    }
    if (isTagComponentLike(resolved)) {
        return renderTagComponent(resolved);
    }
    if (Array.isArray(resolved)) {
        return renderChildren(resolved);
    }
    if (resolved === undefined || resolved === null || resolved === false) {
        return '';
    }
    return escapeHtml(String(resolved));
}
function isElementLike(value) {
    return !!value && typeof value === 'object' && typeof value.tagName === 'string';
}
function isTagComponentLike(value) {
    return !!value && typeof value === 'object' && value.tagJsType === ValueTypes.tagComponent;
}
function renderTagComponent(component) {
    const original = component.wrapper?.original;
    if (typeof original !== 'function') {
        return '';
    }
    let result = original(...component.props);
    if (typeof result === BasicTypes.function && result.tagJsType === undefined) {
        result = result();
    }
    return renderValue(result);
}
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
function resolveDynamicValue(value) {
    if (typeof value === 'function') {
        return value();
    }
    return value;
}
//# sourceMappingURL=elementVarToHtmlString.function.js.map
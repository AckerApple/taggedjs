import { KeyFunction } from '../index.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js';
import type { AttributeCallable } from './attributeCallables.js';
import { AttrValue, ElementFunction } from './ElementFunction.type.js';
import { ElementVarBase } from "./ElementVarBase.type";
export declare const ATTRIBUTE_CALLABLE_DEFS: Array<[apiName: string, attrName: string]>;
export type CombinedElementFunctions = ElementVarBase & {
    /** array value metadata */
    key: KeyFunction;
    /** Inline CSS styles for the element */
    style: AttributeCallable;
    /** Unique identifier used for selectors and linking */
    id: AttributeCallable;
    /** CSS class names used for styling and state */
    class: AttributeCallable;
    /** Main value for `meta` tags (depends on paired `name`/`charset`/etc.) */
    content: AttributeCallable;
    /** Character encoding declaration (commonly on `meta`) */
    charset: AttributeCallable;
    /** Relationship type for linked resources (e.g. stylesheet, icon) */
    rel: AttributeCallable;
    /** Vertical alignment hint (legacy/compat usage) */
    valign: AttributeCallable;
    /** for dialog elements */
    open: AttributeCallable;
    /** URL target for links and related elements */
    href: AttributeCallable;
    /** Current/input value for form controls */
    value: AttributeCallable;
    /** Hint text shown when input has no value */
    placeholder: AttributeCallable;
    /** Minimum allowed character length */
    minLength: AttributeCallable;
    /** Maximum allowed character length */
    maxLength: AttributeCallable;
    /** Minimum numeric/date range value */
    min: AttributeCallable;
    /** Maximum numeric/date range value */
    max: AttributeCallable;
    /** Step interval for numeric/date inputs */
    step: AttributeCallable;
    /** Field name used for forms and metadata */
    name: AttributeCallable;
    /** Text wrapping behavior (commonly for `textarea`) */
    wrap: AttributeCallable;
    /** Browsing context target (e.g. `_blank`) */
    target: AttributeCallable;
    /** Source URL for embedded media/content */
    src: AttributeCallable;
    /** Visible text rows (commonly for `textarea`) */
    rows: AttributeCallable;
    /** Form input validation */
    required: AttributeCallable;
    /** Element/input type behavior */
    type: AttributeCallable;
    /** Advisory text, often shown as tooltip */
    title: AttributeCallable;
    /** Alternative text for non-text content (e.g. images) */
    alt: AttributeCallable;
    /** Preferred element width */
    width: AttributeCallable;
    /** Preferred element height */
    height: AttributeCallable;
    /** Language tag for content and accessibility tooling */
    lang: AttributeCallable;
    /** Loading strategy hint (e.g. lazy/eager) */
    loading: AttributeCallable;
    /** Associates a label/output element with a control id */
    for: AttributeCallable;
    /** Marks control as non-interactive */
    disabled: AttributeCallable;
    /** Marks checkbox/radio as selected */
    checked: AttributeCallable;
    /** Marks option as selected in a list */
    selected: AttributeCallable;
    /** Inner cell spacing in table layouts (legacy/compat usage) */
    cellPadding: AttributeCallable;
    /** Space between table cells (legacy/compat usage) */
    cellSpacing: AttributeCallable;
    /** Requests focus when element is initialized */
    autoFocus: AttributeCallable;
    /** Border size hint (legacy/compat usage) */
    border: AttributeCallable;
    /** Accessible label when visible text is missing/insufficient */
    ariaLabel: AttributeCallable;
    /** Referrer information policy used for outgoing requests */
    referrerPolicy: AttributeCallable;
    /** SVG viewport and coordinate system definition */
    viewBox: AttributeCallable;
    /** SVG fill paint for shapes/text */
    fill: AttributeCallable;
    attr: (nameOrValue: AttrValue, value?: AttrValue) => ElementFunction;
    attrs: (nameValuePairs: {
        [name: string]: AttrValue;
    }) => ElementFunction;
    contextMenu: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onCancel: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onDoubleClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onDblClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onBlur: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onChange: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onInput: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onKeyUp: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onKeyDown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseOver: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseOut: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseUp: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseDown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onClose: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
};

# Converting from html`` Template Literals to Mock Elements

This guide provides comprehensive instructions for converting TaggedJS code from the deprecated `html` template literal syntax to the modern mock element syntax.

## Why Convert?

TaggedJS is migrating away from `html` tagged template literals to mock element functions. The new syntax provides:
- Better TypeScript support
- Improved performance
- More explicit and maintainable code
- Better integration with the framework's reactive system

## Quick Reference

### Before (Deprecated)
```typescript
import { html, tag } from "taggedjs";

export default tag(() => {
  let count = 0;

  return html`
    <div>
      <button onclick=${() => ++count}>Increment</button>
      <span>${count}</span>
    </div>
  `;
});
```

### After (Modern)
```typescript
import { div, button, span, tag } from "taggedjs";

export default tag(() => {
  let count = 0;

  return div(
    button({onClick: () => ++count}, 'Increment'),
    span(_=> count)
  );
});
```

## Core Conversion Rules

### 1. Update Imports

**Remove** `html` import and **add** element imports:

```typescript
// OLD
import { html, states, tag } from "taggedjs";

// NEW
import { div, span, button, strong, hr, tag } from "taggedjs";
// Note: Remove 'html', add specific elements you need
```

Common elements to import: `div`, `span`, `button`, `input`, `select`, `option`, `fieldset`, `legend`, `table`, `tr`, `td`, `th`, `strong`, `b`, `a`, `hr`, `br`, `label`, `form`, etc.

### 2. Convert Template Return to Function Calls

```typescript
// OLD
return html`<div>...</div>`

// NEW
return div(...)
```

### 3. Convert Elements to Function Calls with Attributes-First Syntax

**Pattern**: `element({attributes}, children...)`

```typescript
// OLD
<button id="my-btn" onclick=${handler}>Click me</button>

// NEW
button({id: "my-btn", onClick: handler}, 'Click me')
```

**Key points**:
- First argument: attributes object `{attribute: value, ...}`
- Remaining arguments: children (strings, numbers, elements, components)
- If no attributes: just pass children directly `div('text', span('more'))`

### 4. Event Handlers: Function vs String

**CRITICAL**: Event handler casing depends on whether you're passing a **function** or a **string**.

**Function Handlers (use camelCase):**
```typescript
// CORRECT - function handlers use camelCase
button({onClick: handler}, 'Click')
input({onKeyup: (e) => console.log(e)})
div({onMouseover: showMenu, onMouseout: hideMenu})

// WRONG - don't use lowercase with functions
button({onclick: handler}, 'Click')  // ❌
```

**String Handlers (use lowercase):**
```typescript
// CORRECT - string handlers use lowercase (HTML attributes)
dialog({
  onmousedown: "this.close()",
  ondragstart: "event.dataTransfer.effectAllowed='move'"
})

// These are inline JavaScript executed by the browser
// They use lowercase because they become actual HTML attributes
```

**The Rule:**
- **Function reference** → camelCase: `onClick`, `onKeyup`, `onMouseover`
- **String (inline JS)** → lowercase: `onclick`, `onkeyup`, `onmouseover`

Common event handlers (function form):
- `onClick` (not `onclick`)
- `onKeyup`, `onKeydown` (not `onkeyup`, `onkeydown`)
- `onMouseover`, `onMouseout` (not `onmouseover`, `onmouseout`)
- `onChange`, `onInput`, `onFocus`, `onBlur`
- `onDragstart`, `onDrag`, `onDragend`

### 5. Text Interpolation: Split into Arguments

```typescript
// OLD
html`Count: ${count}, Max: ${max}`

// NEW
div('Count: ', count, ', Max: ', max)
// OR for reactive values
div('Count: ', _=> count, ', Max: ', _=> max)
```

### 6. Reactive Values: Use Arrow Function Prefix `_=>`

Use the arrow function prefix `_=>` for reactive values that should update:

```typescript
// For reactive/changing values
span(_=> count)              // Updates when count changes
div('Value: ', _=> value)    // Text with reactive value

// For conditional rendering
_=> showContent && div('Content')
_=> items.length > 0 && renderList()

// For computed expressions
_=> isActive ? 'Active' : 'Inactive'
```

**When to use `_=>`**:
- Values that change over time (component state, props)
- Conditional rendering
- Computed/derived values
- Array maps that need reactivity

**When NOT to use `_=>`**:
- Static strings or constants
- Initial values that don't change
- Props passed to child components (the child handles reactivity)

### 7. Self-Closing Elements: No Function Call

```typescript
// OLD
<hr />
<br />

// NEW - no parentheses!
hr,
br,
```

### 8. Nested html`` Templates: Convert to noElement() or Elements

```typescript
// OLD
${items.map(item => html`
  <div>
    <strong>${item.name}</strong>
  </div>
`.key(item.id))}

// NEW - use noElement for fragments
items.map(item => div(
  strong(item.name)
).key(item.id))

// OR use noElement for multiple siblings without wrapper
items.map(item => noElement(
  '👉',
  strong(item.name),
  '👈'
).key(item.id))
```

**IMPORTANT: Dynamic Arrays**

When an array is **dynamic** (can be modified with push, splice, etc.), wrap the `.map()` call in `_=>`:

```typescript
// Dynamic array that can change
const items = [] as Item[]

// WRONG - map won't re-run when array changes
div(
  items.map(item => div(item.name).key(item))
)

// CORRECT - map re-runs when array changes
div(
  _=> items.map(item => div(item.name).key(item))
)

// Also use _=> for reactive values within the map
div(
  _=> items.map(item => div(
    strong(_=> item.title),  // If item properties can change
    span(_=> item.value)
  ).key(item))
)
```

**When to use `_=>` with `.map()`:**
- ✅ Use `_=>` when the array can be modified (push, splice, pop, etc.)
- ✅ Use `_=>` when the array reference might change
- ❌ Skip `_=>` when the array is static/constant (like props that don't change)

### 9. Conditional Rendering

```typescript
// OLD
${condition && html`<div>Content</div>`}
${condition ? html`<div>Yes</div>` : html`<div>No</div>`}

// NEW - use arrow function prefix
_=> condition && div('Content')
_=> condition ? div('Yes') : div('No')
```

### 10. HTML Entities to Unicode

```typescript
// OLD
&nbsp;
&lt;
&gt;

// NEW
\u00A0  // non-breaking space
\u003C  // <
\u003E  // >
```

### 11. Dynamic Style Properties

```typescript
// OLD
<button style.background-color=${isActive ? 'red' : 'green'}>Click</button>

// NEW
button({
  'style.background-color': isActive ? 'red' : 'green'
}, 'Click')

// For reactive dynamic styles
button({
  'style.visibility': _=> show ? 'visible' : 'hidden'
}, 'Click')
```

### 12. HTML Document Structure

For full HTML documents (like app.ts):

```typescript
// OLD
html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>App</title>
      <meta charset="UTF-8" />
    </head>
    <body>...</body>
  </html>
`

// NEW
import { html, head, title, meta, body } from "taggedjs";

html({lang: "en"},
  head(
    title('App'),
    meta({charset: "UTF-8"})
  ),
  body(...)
)
```

Note: The `<!DOCTYPE html>` is automatically added by `html()`.

## Complete Examples

### Example 1: Button with Counter

```typescript
// OLD
import { html, tag } from "taggedjs";

export const counter = tag(() => {
  let count = 0;

  return html`
    <div>
      <button id="increment" onclick=${() => ++count}>
        Increment ${count}
      </button>
      <span id="display">${count}</span>
    </div>
  `;
});

// NEW
import { div, button, span, tag } from "taggedjs";

export const counter = tag(() => {
  let count = 0;

  return div(
    button(
      {id: "increment", onClick: () => ++count},
      'Increment ',
      _=> count
    ),
    span({id: "display"}, _=> count)
  );
});
```

### Example 2: Conditional Content with Styles

```typescript
// OLD
import { html, tag } from "taggedjs";

export const toggle = tag(() => {
  let show = true;

  return html`
    <div style="padding: 1em;">
      <button onclick=${() => show = !show}>Toggle</button>
      ${show && html`
        <div style="background: blue;">
          Visible content
        </div>
      `}
    </div>
  `;
});

// NEW
import { div, button, tag } from "taggedjs";

export const toggle = tag(() => {
  let show = true;

  return div({style: "padding: 1em;"},
    button({onClick: () => show = !show}, 'Toggle'),
    _=> show && div(
      {style: "background: blue;"},
      'Visible content'
    )
  );
});
```

### Example 3: List with Map

```typescript
// OLD
import { html, tag } from "taggedjs";

export const list = tag(() => {
  const items = ['apple', 'banana', 'cherry'];

  return html`
    <div>
      <h3>Fruits</h3>
      <ul>
        ${items.map(item => html`
          <li>
            <strong>${item}</strong>
            <button onclick=${() => console.log(item)}>Log</button>
          </li>
        `.key(item))}
      </ul>
    </div>
  `;
});

// NEW
import { div, h3, ul, li, strong, button, tag } from "taggedjs";

export const list = tag(() => {
  const items = ['apple', 'banana', 'cherry'];

  return div(
    h3('Fruits'),
    ul(
      items.map(item => li(
        strong(item),
        button({onClick: () => console.log(item)}, 'Log')
      ).key(item))
    )
  );
});
```

### Example 4: Form with Input Events

```typescript
// OLD
import { html, tag } from "taggedjs";

export const form = tag(() => {
  let value = '';

  return html`
    <div>
      <input
        type="text"
        placeholder="Enter text"
        onkeyup=${(e) => value = e.target.value}
      />
      <div>You typed: ${value}</div>
    </div>
  `;
});

// NEW
import { div, input, tag } from "taggedjs";

export const form = tag(() => {
  let value = '';

  return div(
    input
      .type`text`
      .placeholder`Enter text`
      .onKeyup((e) => value = e.target.value)
,
    div('You typed: ', _=> value)
  );
});
```

### Example 5: Table Structure

```typescript
// OLD
import { html, tag } from "taggedjs";

export const dataTable = tag(() => {
  return html`
    <table cellPadding="5" border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
  `;
});

// NEW
import { table, thead, tbody, tr, th, td, tag } from "taggedjs";

export const dataTable = tag(() => {
  return table({cellPadding: 5, border: "1"},
    thead(
      tr(
        th('Name'),
        th('Age')
      )
    ),
    tbody(
      tr(
        td('John'),
        td('30')
      )
    )
  );
});
```

## Common Pitfalls

### ❌ Wrong: Lowercase event handlers
```typescript
button({onclick: handler}, 'Click')  // Don't do this
```

### ✅ Correct: camelCase event handlers
```typescript
button({onClick: handler}, 'Click')  // Do this
```

### ❌ Wrong: Function calls for hr/br
```typescript
div(hr(), br())  // Don't do this
```

### ✅ Correct: No function calls for hr/br
```typescript
div(hr, br)  // Do this
```

### ❌ Wrong: Not using arrow prefix for reactive values
```typescript
span(counter)  // Won't update when counter changes
```

### ✅ Correct: Use arrow prefix for reactive values
```typescript
span(_=> counter)  // Updates when counter changes
```

### ❌ Wrong: Nested html`` not converted
```typescript
items.map(item => html`<div>${item}</div>`.key(item))  // Don't mix syntaxes
```

### ✅ Correct: Convert nested templates too
```typescript
items.map(item => div(item).key(item))  // Do this
```

### ❌ Wrong: Dynamic array map without arrow prefix
```typescript
const items = [] as Item[]

// Won't re-render when items array changes
div(
  items.map(item => div(item.name).key(item))
)
```

### ✅ Correct: Dynamic array map with arrow prefix
```typescript
const items = [] as Item[]

// Re-renders when items array changes (push, splice, etc.)
div(
  _=> items.map(item => div(_=> item.name).key(item))
)
```

## Checklist for Conversion

- [ ] Remove `html` from imports
- [ ] Add all necessary element imports (`div`, `span`, `button`, etc.)
- [ ] Convert `html`...`` to element function calls
- [ ] Change **function** event handlers to camelCase (`onClick`, `onKeyup`, etc.)
- [ ] Keep **string** event handlers lowercase (`onclick: "..."`, `onmousedown: "..."`)
- [ ] Split text interpolation into separate arguments
- [ ] Add `_=>` prefix to reactive/conditional values
- [ ] Add `_=>` prefix to dynamic array `.map()` calls
- [ ] Convert `<hr />` and `<br />` to `hr,` and `br,` (no function calls)
- [ ] Convert nested `html`...`` templates to mock elements
- [ ] Replace HTML entities with Unicode (`&nbsp;` → `\u00A0`)
- [ ] Convert dynamic style properties (`style.property`)
- [ ] Test the component to ensure reactivity still works

## Testing After Conversion

After converting a file:

1. **Build the project**: `npm run build`
2. **Check for TypeScript errors**: `tsc --noEmit`
3. **Run tests**: `npm test`
4. **Test in browser**: Start dev server and verify functionality
5. **Check reactivity**: Ensure reactive values update correctly

## Getting Help

- Check `CLAUDE.md` for framework-specific patterns
- Look at already-converted files in the same directory for examples
- Test incrementally - convert one component at a time
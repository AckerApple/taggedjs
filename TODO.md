tests

- Set max recuse depth of 15
- Test a tag that sometimes returns null and has providers
  - looking to ensure as tag changes the providers are moved
  - test going back to null and back and that no elements find themselves back on page

### TODO NOW: Before Mega-aide
- Remove the destroy call that gets added on tagElement
  - its used for HMR
- routing
- ? Upgrade state to support both named and array state memory
  - helps with HMR
  - Can fix `state mismatch` error
- Production mode
  - Remove guards like state checks

### Small TODO
- How to have subscription display logic
  - ${subscribe => x}
  - html`...${subscribe(directory$, directory => {})}`
  - html`...${async(directoryPromise, directory => {})}`

### Before wider audience
- All logging must go through subscriptions
  - we still have console.warn and console.error
  - maybe have a subject that emits logs?
- Hot reloading handle state changes better
- How to load styles other than just inline & non-dynamic style tag that effects entire page
- Ability to produce one time HTML files
  - Then rehydrate with actual JavaScript
- SSR - server side rendering
  - we will need `<template start>` present
  - We may need to render attributes and then make a marker attribute
    - title="real title here" tag:title="__tagvar2_"


## Documentations

### TaggedJs differences from React

In many cases, since TaggedJs is natively compatible with browser vanilla Javascript, React is a few characters less.

- TaggedJs uses ``` html`` ``` instead of `()` to define HTML content
  - `return (<div></div>)`
  - ```return html`<div></div>` ```
- Components render as `${component()}` instead of `<component />`
  - `return (<div><component /></div>)`
  - ```return html`<div>${component()}</div>` ```
- The boolean `true` will render to screen
- An attribute dynamic value of `undefined` will cause `element.removeAttribute(name)` to occur
- Render template syntax is `${}` instead of `{}`
  - `<div onclick={handler}></div>`
  - `<div onclick=${handler}></div>`
  - and
  - `<div>{value}</div>`
  - `<div>${value}</div>`
- `className` is just `class`
  - `<div className={'flex'}></div>`
  - `<div class=${'flex'}></div>`

### Children

- innerHTML can be the 1st or 2nd argument
  - `<div>${component(html`<small>hello world</small>`)}</div>`
  - `<div>${component({ x: y }).html`<small>hello world</small>`}</div>`
  - The component always has fixed arguments for this of `component = (props, {children})`

### Hooks

- React has `useEffect(fn, [...watch])` and TaggedJs has `watch([...watch], fn)`
  

### Benefits to TaggedJs over React

- You can have multiple root elements in TaggedJs
  - You don't need `<></>`
  - In React this will fail `() => (<div>Hello</div><div>World</div>)
    - Errors due to needing a master wrapping element
  - In TaggedJs this will work `() => html`<div>Hello</div><div>World</div>`
- You can have components with single argument inputs:
  - instead of  `Hello <something x=3> World`
  - you can now `Hello ${something(3)} World`
  - The component for this is very small `export const something = tag(x => html`${x}rd`)`
- Concept of providers
- Provided hooks
  - state hook
  - subscribe hook - coming soon
  - render hook - move
  - init hook - move
  - async hook - move

### Angular similarities
- Support for bracket element definitions
  - `<div style.background-color]="red"></div>`
  - NOT [style.background-color]="'red'"
  - NOT [style.backgroundColor]="'red'" NOR [style.backgroundColor]="red"
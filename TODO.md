### TODO NOW: Before Mega-aide
- Simplify attaching to an element
  - instead of `renderAppToElement(App, element, {test:1})`
- How to have subscription display logic
  - ${subscribe => x}
  - html`...${subscribe(directory$, directory => {})}`
  - html`...${async(directoryPromise, directory => {})}`
- routing
- Upgrade state to support both named and array state memory
  - helps with HMR
- Test tag switch ${ trueFalse ? tagOne() : tagTwo() }
- All logging must go through subscriptions
- Production mode
  - Remove guards like state checks

### Extra testing
- Test switching a components return string
  - return x ? html`.0.` : html`.1.`

### Before wider audience
- remove console.errors
  - maybe have a subject that emits logs?
- Hot reloading
- How to load styles other than just inline & non-dynamic style tag that effects entire page
- Ability to produce one time HTML files
  - Then rehydrate with actual JavaScript
- SSR - server side rendering
  - we will need <template start> present
  - We may need to render attributes and then make a marker attribute
    - title="real title here" tag:title="__tagVar2_"


## Documentations

### React differences
- Use html`` instead of ()
- The boolean -true- will render to screen
- Render template syntax is ${} instead of {}
- Concept of providers
- Provided hooks
  - state hook
  - subscribe hook - coming soon
  - render hook - move
  - init hook - move
  - async hook - move
- innerHTML is 1st or 2nd argument
- No tags for Components
  - `<Component a={b} x={y}></Component>` <- Instead of
  - `${Component({x: y, a: b})}` <- its this

### Angular similarities
- Support for bracket element definitions
  - `<div style.background-color]="red"></div>`
  - NOT [style.background-color]="'red'"
  - NOT [style.backgroundColor]="'red'" NOR [style.backgroundColor]="red"
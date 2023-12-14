### TODO NOW: Before Mega-aide / Cary
- innerHTML?
- Changelog
- Allow any arguments. Do not restrict to 1 arg with props
- Simplify attaching to an element
  - instead of `renderAppToElement(App, element, {test:1})`
  - do `???`
- It appears props only watch the first argument
  - Most like re-engineer tag.js:9 `return (props) => {`
- How to have subscription display logic
  - html`...${subscribe(directory$, directory => {})}`
  - html`...${async(directoryPromise, directory => {})}`
- Remove need for function within function
  - move {async, init} out and to work like state using beforeRedraw and afterRender
  - Consider rename async to callback()
- routing
- ? Create `const [debug, setDebug] = useState()` ?
  - Issue is hot reloading
    - danger of not matching right state during changes
    - However, it is just development mode and accidental use of development mode in production

### Extra testing
- Test switching a components return string
  - return x ? html`.0.` : html`.1.`

### Before wider audience
- Hot reloading
- How to load styles other than just inline & non-dynamic style tag that effects entire page
- Ability to produce one time HTML files
  - Then rehydrate with actual JavaScript
- SSR - server side rendering
  - we will need <template start> present
  - We may need to render attributes and then make a marker attribute
    - title="real title here" tag:title="__tagVar2_"

## Attributes
- We need to properly process [style.background-color]=${isSomething ? 'red' : null}

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

### Angular similarities
- Support for bracket element definitions
  - [style.background-color]="red"
  - NOT [style.background-color]="'red'"
  - NOT [style.backgroundColor]="'red'" NOR [style.backgroundColor]="red"
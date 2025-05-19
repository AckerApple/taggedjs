# taggedjs
tagged template reactive html

### Props

Rendering back to calling/parent tag will only occur for root and level 1 function props

```
// ✅
const component = tag((onchange) => html`<textarea onchange=${onchange}></textarea>`)
```

```
// ✅
const component = tag(({onchange}) => html`<textarea onchange=${onchange}></textarea>`)
```

```
// ❌
const component = tag(({textarea:{onchange}}) => html`<textarea onchange=${onchange}></textarea>`)
```

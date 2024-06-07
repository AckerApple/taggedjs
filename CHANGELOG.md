## CHANGELOG

### v2.5.22 - 6-2024
- fixed functions as argument props
- fixed nested textareas
- fixed rendering up from non-tag component
- Do not update attribute value unless its context value changed
- Fixed double subscribing
- Introduced state locking. A tag wont render again if its currently running events
  - When event complete, it replays states
- Fixed child to parent referencing aka support.global.childTags
- Reduced amount of tags traveled for providers and corrected its scoping
- Created concept of soft delete to better handle a tag that has different outputs but same providers

### v2.5.14 - 5-2024
- `new Subject(0).set(1)` is now replaced by one of the following:
  - `new Subject(0).next(2)`
  - `new Subject(0).set = 1` which is a setter that calls next() auto

### v2.5.6 - 5-2024
- `watch()` now fires on init. Use `watch.noInit()` if needed
  - not considering breaking change due to no public audience
- Added `watch.asSubject()`
- Added `watch.noInit()`
- Added `watch.truthy()`
- Added `callback()`
- Added optional state maker `const aTag = tag((...props...) => (...state...) => html``)`
- `setProp(x => [format, format = x])` is now `letProp(format)(x => [format, format = x])`
- oneRender tags now with `const someTag = (...props...) => tag.oneRender = (...state...) => html`` `

### v2.5.0 - 5-2024
- Added HMR support
- Fix ability to pass a function as a prop and call that prop immediately

### v2.4.32
- support for mirroring
- provider data typing correction
- fix provider as an arrow function

### v2.4.0
- Solid version

### v2.2.0
- Many fixes
  - clones are not doubled on owner and tag
  - More compatible with HMR

### v2.1.0
- Breaking 💔: Use tag(() => html``) instead of tag(() => () => html``)
- Breaking 💔: Use import getCallback instead of ({async}) => ...

### v1.0.0
- Breaking 💔: Use import onInit instead of ({init}) => ...

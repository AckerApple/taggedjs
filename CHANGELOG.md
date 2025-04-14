## CHANGELOG

### v2.8.10 - 5-2025
- Fixed array deleting

### v2.8.9 - 4-2025
- Detect bad array key

### v2.8.4 - 2-2025
- Corrected data typing for watch

### v2.8.0 - 12-2024
- removed letState() in favor or states(get => [x] = get(x))

### v2.7.8 - 12-2024
- added signals()
- ensured proper sequencing of destroy calls

### v2.7.0 - 7-2024
- new states() let coordinator has been added! yay!
- oneRender is now renderOnce
- oneRender is now renderOnce
- added tag() === tag.shallowPropWatch
- added tag.deepPropWatch()
- added tag.immutablePropWatch()

### v2.6.0 - 7-2024
- tag().children is now tag(children)

### v2.5.24 - 6-2024
- performance
- Change away from `new Subject().set = x` back to `new Subject().set(x)`

### v2.5.23 - 6-2024
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
- Move tracking of items placed down into a global scope

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

# taggedjs
tagged template reactive html

[documentation](https://ackerapple.github.io/taggedjs/documentation)

## Array identity

`null` and `undefined` are valid empty positions in rendered arrays. Unkeyed
entries use their array position as identity. Use `.key(value)` (or an element
ID) when a child must retain its DOM node and component state while neighboring
entries are inserted, removed, or replaced.

## Array readers

`array()` and `arrayWatch()` support `.some(predicate, thisArg?)` with native
array semantics: a boolean result, short-circuiting, and `(value, index, array)`
predicate arguments. `SignalArray<T>` already inherits this typed API from `Array<T>`.
Readers do not emit or schedule renders. Recompute them in an existing signal
subscription or render flow; reading `.some()` does not establish a new automatic
dependency. Direct element-property changes still need the normal signal update.
`arrayWatch()` caches reader functions but they read its current `.value`, including
after replacement. As with its existing editors, mutation notification behavior
is unchanged.

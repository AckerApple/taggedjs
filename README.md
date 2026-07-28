# taggedjs
tagged template reactive html

[documentation](https://ackerapple.github.io/taggedjs/documentation)

## Array identity

`null` and `undefined` are valid empty positions in rendered arrays. Unkeyed
entries use their array position as identity. Use `.key(value)` (or an element
ID) when a child must retain its DOM node and component state while neighboring
entries are inserted, removed, or replaced.

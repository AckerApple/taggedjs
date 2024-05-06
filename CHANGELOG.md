## CHANGELOG

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

// Shared test map configuration
// Maps test file names to their required views

export const testMap: Record<string, string> = {
  'destroys.test': 'destroys',
  'content.test': 'content',
  'dumpContent.test': 'content', // dumpContent also uses content view
  'counters.test': 'counters',
  'props.test': 'props',
  'providers.test': 'providerDebug',
  'injectionTesting.test': 'providerDebug', // injectionTag is in providerDebug
  'tagSwitch.test': 'tagSwitchDebug',
  'child.test': 'child',
  'arrays.test': 'arrays',
  'mirror.test': 'mirroring',
  'watch.test': 'watchTesting',
  'funInProps.test': 'funInPropsTag',
  'attributes.test': 'attributeDebug',
  'oneRender.test': 'oneRender',
  'todos.test': 'todo',
  'basic.test': 'basic',
  'start.test': '', // start.test doesn't need a specific view
}
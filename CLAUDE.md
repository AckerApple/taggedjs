# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaggedJS is a reactive UI framework for building web applications using TypeScript and template literals. This is the gh-pages branch containing the documentation site.

## Technology Stack

- **TypeScript** 5.8.3
- **Webpack** 5.96.1 for bundling
- **Jest** 29.7.0 for testing
- **Custom HMR server** for hot module replacement
- **ES Modules** throughout the codebase

## Commands

```bash
# Build the project
npm run build

# Start development server with HMR
npm run hmr

# Run tests
npm test

# Run a specific test file
npm test -- path/to/file.test.ts

# Type checking
tsc --noEmit

# Clean build artifacts
rm -rf assets/
```

## Testing Notes

**Important**: Before running tests, ensure the project is built with `npm run build`. Tests rely on the compiled bundle.js file in assets/dist/.

**Browser Testing**: When making changes to components that will be tested in the browser, always run `npm run build` before running tests. The browser tests depend on the bundled JavaScript files being up-to-date.

For view-specific tests (like arrays.test.ts), the test setup will automatically navigate to the correct view using the vitest.setup.ts configuration.

## Architecture & Patterns

### Component Structure
Components in TaggedJS use the `.tag.ts` extension and follow this pattern:

```typescript
export default tag<YourComponentTemplate>("component-name", (tag, { html, state, onInit }) => {
  // State management
  const myState = state({ value: 0 });
  
  // Template with reactive bindings
  return html`
    <div>
      <p>Value: ${myState.value}</p>
      <button onclick=${() => myState.value++}>Increment</button>
    </div>
  `;
});
```

### Key Framework Features

1. **Reactive State**: 
   - Use `state()` for **const** declarations (reactive values that cannot be reassigned)
   - Use `states()` for **let** declarations (reactive values that can be reassigned)
   - Example: `const mySubject = state(() => new Subject())` vs `let counter = 0; states(get => [counter] = get(counter))`
2. **Template Literals**: HTML templates with `html` tag support reactive interpolation
3. **Event Handling**: Direct function binding in templates (e.g., `onclick=${handler}`)
4. **Lifecycle Hooks**: `onInit()` and `onDestroy()` for component lifecycle
5. **Observables**: `Subject` class and `subscribe()` for reactive streams

### Project Structure

```
gh-pages/
├── src/                    # Source TypeScript files
│   ├── components/         # Reusable UI components
│   ├── docs/              # Documentation components
│   ├── examples/          # Example code demonstrations
│   └── *.tag.ts           # Tagged components
├── assets/                # Compiled output (git ignored)
├── hmr/                   # Hot module replacement server
├── tests/                 # Test utilities
└── webpack.config.js      # Build configuration
```

### Testing Approach

- Tests are co-located with components as `.test.ts` files
- Use Jest with TypeScript support
- Mock DOM environment available via `tests/testUtils.ts`
- Component testing focuses on reactive behavior and template output

## Important Files

- `webpack.config.js` - Build configuration with HMR setup
- `hmr/server.js` - Custom HMR implementation
- `src/index.ts` - Main entry point
- `tests/testUtils.ts` - Testing utilities
- `tsconfig.json` - TypeScript configuration

## Development Notes

- The custom HMR server runs on port 3001 and provides live reloading
- Components must export default with the `tag` function
- State changes automatically trigger re-renders
- The framework uses a virtual DOM-like approach with template literals
- Documentation site structure mirrors the component hierarchy
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

taggedjs is a reactive HTML templating framework that provides a lightweight alternative to React, Angular, Vue, and Svelte. It uses JavaScript tagged template literals for HTML templating and provides a signal-based reactivity system.

## Development Commands

### Build Commands
- `npm run build` - Full build process (TypeScript compilation + webpack bundle + dist)
- `npm run build:js` - TypeScript compilation only
- `npm run build:webpack` - Create webpack bundle
- `npm run build:watch` - Watch mode for development

### Testing
- `npm test` - Run Jest tests
- Tests are located alongside source files with `.spec.ts` extension

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix

### Publishing
- `npm run publish` - Full publish workflow (test → build → save to dist branch → publish)

## Architecture Overview

### Core Concepts

1. **Tagged Template Literals**: The framework uses JavaScript template literals for HTML templating:
   ```typescript
   html`<div>${value}</div>`
   ```

2. **Reactive State Management**: 
   - Signal-based reactivity in `/ts/state`
   - Subject/Observable pattern in `/ts/subject`
   - State functions, providers, and watchers

3. **Component System**:
   - Created using the `tag` function
   - Props support with limitations (see README.md)
   - Lifecycle hooks: onInit, onDestroy

### Directory Structure

- `/ts` - TypeScript source code
  - `/tag` - Core tag functionality and HTML template processing
  - `/state` - State management (signals, providers, reactive state)
  - `/render` - DOM rendering and update logic
  - `/subject` - Observable/reactive programming patterns
  - `/interpolations` - Template interpolation and attribute handling
  - `/tagJsVars` - Special variables and functions for templates

- `/js` - Compiled JavaScript output
- `/dist` - Distribution files (separate git branch)

### Key APIs

- `html` - Main template function for creating HTML templates
- `tag` - Function for creating components
- `state`, `signal`, `subject` - Reactive state primitives
- `watch` - Create reactive computations
- Various DOM manipulation and lifecycle functions

## Important Notes

1. **Props Limitations**: Function props only work at root level or first level of destructuring (see README.md)

2. **Build Output**: The project maintains a separate `dist` branch for distribution files

3. **ES Modules**: Project is configured as ES Module (`"type": "module"`)

4. **TypeScript**: Strict mode enabled with ESNext target

5. **Testing**: Use Jest with ts-jest for TypeScript support
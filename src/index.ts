// Mocha/Chai initialization no longer needed with dual test system
// import './testing/initialize-mocha-chai'

export { hmr, tagElement } from "taggedjs"
export { App } from "./app.tag"

import IsolatedApp from "./isolatedApp"
export { IsolatedApp }

import { todoApp } from "./todo/todos.app"
export { todoApp }

import { run } from './run.function'
export { run }

// Initialize Mocha/Chai before anything else
import './testing/initialize-mocha-chai'

export { hmr, tagElement } from "taggedjs"
export { App } from "./app.tag"

import IsolatedApp from "./isolatedApp"
export { IsolatedApp }

import { todoApp } from "./todo/todos.app"
export { todoApp }

import { run } from './run.function'
export { run }

import { tagElement } from "taggedjs"
import { app } from './app.tag'

export default function run() {
  tagElement(app, document.getElementsByTagName('app')[0])
}

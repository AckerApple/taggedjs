import { TagGlobal } from '../TemplaterResult.class.js'

export function getNewGlobal(): TagGlobal {
  return {
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
  }
}

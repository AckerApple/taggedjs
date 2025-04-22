import type { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnyTag } from './AnyTag.type.js';

export type TagMaker<Args extends any[] = any[]> = 
  | ((...args: Args) => AnyTag | TagMaker) 
  | ((...args: Args) => (...args: Args) => AnyTag | TagMaker);
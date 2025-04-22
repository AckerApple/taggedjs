import { AnyTag } from './AnyTag.type.js';

export type TagMaker<Args extends any[] = any[]> = 
  | ((...args: Args) => AnyTag | TagMaker) 
  | ((...args: Args) => (...args: Args) => AnyTag | TagMaker);
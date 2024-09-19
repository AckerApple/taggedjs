import { DomTag, StringTag } from './Tag.class.js';
export type TagMaker<Args extends any[] = any[]> = ((...args: Args) => StringTag | DomTag | TagMaker) | ((...args: Args) => (...args: Args) => StringTag | DomTag | TagMaker);

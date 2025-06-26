import type { StringTag } from './StringTag.type.js';
import type { DomTag } from './DomTag.type.js';
import { AnySupport } from './AnySupport.type.js';
export declare function isLikeTags(newSupport: AnySupport | StringTag, // new
oldSupport: AnySupport): boolean;
export declare function isLikeDomTags(newTag: DomTag, oldTag: DomTag): boolean;
export declare function isLikeValueSets(values0: any[], values1: any[]): boolean;

import type { StringTag } from './StringTag.type.js';
import type { DomTag } from './DomTag.type.js';
import { AnySupport } from './AnySupport.type.js';
export declare function isLikeTags(support0: AnySupport | StringTag, // new
support1: AnySupport): boolean;
export declare function isLikeDomTags(tag0: DomTag, tag1: DomTag): boolean;
export declare function isLikeValueSets(values0: any[], values1: any[]): boolean;

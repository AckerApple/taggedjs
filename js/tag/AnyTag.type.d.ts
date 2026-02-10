import type { StringTag } from './StringTag.type.js';
import type { DomTag } from './DomTag.type.js';
import { TagJsComponent } from '../TagJsTags/index.js';
export type AnyTag = StringTag | DomTag | TagJsComponent<any>;

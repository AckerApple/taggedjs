import { HowToSet } from './howToSetInputValue.function.js';
import { AnySupport } from '../../tag/getSupport.function.js';
import { ContextItem } from '../../tag/Context.types.js';
import { Counts } from '../interpolateTemplate.js';
export declare function updateNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, lastValue: string | Record<string, any> | undefined, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: ContextItem[], counts: Counts): void;

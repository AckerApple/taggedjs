import { TagGlobal } from '../TemplaterResult.class.js'
import { BaseSupport, Support } from '../Support.class.js'
import { Subject, defineValueOn } from '../../subject/Subject.class.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { getValueType } from '../getValueType.function.js'

export class TagJsSubject<T> extends ValueSubject<T> {
  tagJsType = ValueTypes.tagJsSubject
  // travels with all renderings
  global: TagGlobal = getNewGlobal()

  constructor(
    value: any,
    valueType?: ValueType | ImmutableTypes | BasicTypes | undefined
  ) {
    super(value)
    this.global.nowValueType = valueType || getValueType(value)
    defineValueOn(this) // if you extend this AND have a constructor, you must call this in your extension
  }
}

export function getNewGlobal(): TagGlobal {
  return {
    destroy$: new Subject<BaseSupport | Support>(),
    context: [], // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
    subscriptions: [],
    oldest: undefined as any, // TODO: This needs to addressed
    blocked: [], // renders that did not occur because an event was processing
    childTags: [], // tags on me
    htmlDomMeta: [],
  }
}
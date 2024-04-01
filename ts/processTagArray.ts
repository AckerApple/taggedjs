import { Clones } from './Clones.type'
import { ArrayValueNeverSet, Tag } from './Tag.class'
import { ValueSubject } from './ValueSubject'
import { TagSupport } from './TagSupport.class'
import { Counts, Template } from './interpolateTemplate'
import { TemplaterResult } from './TemplaterResult.class'
import { ArrayNoKeyError } from './errors'
import { destroyArrayTag } from './checkDestroyPrevious.function'
import { Provider } from './providers'
import { TagSubject } from './Tag.utils'
import { applyFakeTemplater } from './processSubjectValue.function'

export type LastArrayItem = {
  tag: Tag
  index: number
  deleted?: boolean
}

export type TagArraySubject = ValueSubject<Tag[]> & {
  lastArray?: LastArrayItem[]
  template: Element | Text | Template
  isChildSubject?: boolean // present when children passed as prop0 or prop1
}

export function processTagArray(
  subject: TagArraySubject,
  value: Tag[], // arry of Tag classes
  template: Element | Text | Template, // <template end interpolate />
  ownerTag: Tag,
  options: {
    counts: Counts
    forceElement?: boolean
  },
): Clones {
  const clones: Clones = ownerTag.clones // []
  let lastArray = subject.lastArray = subject.lastArray || []

  subject.template = template

  let removed = 0
  
  /** 🗑️ remove previous items first */
  lastArray = subject.lastArray = subject.lastArray.filter((
    item: any,
    index: number,
  ) => {
    const newLength = value.length-1
    const at = index - removed
    const lessLength = newLength < at
    const subTag = value[index - removed]
    const subArrayValue = subTag?.arrayValue
    const destroyItem = lessLength || !areLikeValues(subArrayValue, item.tag.arrayValue)
    
    if(destroyItem) {
      const last = lastArray[index]
      const tag: Tag = last.tag
      destroyArrayTag(tag, options.counts)
      last.deleted = true

      ++removed
      ++options.counts.removed
      
      return false
    }

    return true
  })

  // const masterBefore = template || (template as any).clone
  const before = template || (subject.value as any).insertBefore || (template as any).clone

  value.forEach((subTag, index) => {
    const previous = lastArray[index]
    const previousSupport = !previous?.deleted && previous?.tag.tagSupport
    const fakeSubject = new ValueSubject({} as Tag) as unknown as TagSubject
    
    applyFakeTemplater(subTag, ownerTag, fakeSubject)

    if(previousSupport) {
      subTag.tagSupport.templater.global = previousSupport.templater.global
      previousSupport.templater.global.newest = subTag

      if(!subTag.ownerTag) {
        throw new Error('no owner on newest')
      }
    } else {  
      ownerTag.childTags.push(subTag)
    }
    
    subTag.ownerTag = ownerTag    

    // check for html``.key()
    const keyNotSet = subTag.arrayValue as ArrayValueNeverSet | undefined
    if (keyNotSet?.isArrayValueNeverSet) {
      const details = {
        template: subTag.getTemplate().string,
        array: value,
        ownerTagContent: ownerTag.lastTemplateString,
      }
      const message = 'Use html`...`.key(item) instead of html`...` to template an Array'
      console.error(message, details)
      const err = new ArrayNoKeyError(message, details)
      throw err
    }
    
    const couldBeSame = lastArray.length > index
    if (couldBeSame) {

      const isSame = areLikeValues(previous.tag.arrayValue, subTag.arrayValue)
      if (isSame) {
        subTag.tagSupport = subTag.tagSupport || previous.tag.tagSupport
        const oldest = previous.tag.tagSupport.templater.global.oldest as Tag
        oldest.updateByTag(subTag)
        return []
      }

      processAddTagArrayItem(before, subTag, index, options, lastArray, true)
      throw new Error('item should be back')
      // return [] // removed: item should have been previously deleted and will be added back
    }

    processAddTagArrayItem(before, subTag, index, options, lastArray, true)
  })

  return clones
}

function processAddTagArrayItem(
  before: Element | Text | Template,
  subTag: Tag,
  index: number,
  options: {
    counts: Counts
    forceElement?: boolean
  },
  lastArray: LastArrayItem[],
  test: boolean,
) {
  const lastValue = {
    tag: subTag, index
  }
  
  // Added to previous array
  lastArray.push(lastValue)

  const counts: Counts = {
    added: options.counts.added + index,
    removed: options.counts.removed,
  }

  const lastFirstChild = before // tag.clones[0] // insertBefore.lastFirstChild    
  if(!lastFirstChild.parentNode) {
    throw new Error('issue adding array item')
  }

  subTag.buildBeforeElement(
    lastFirstChild,
    {counts, forceElement: options.forceElement, test}
  )
}

/** compare two values. If both values are arrays then the items will be compared */
function areLikeValues(valueA: unknown, valueB: unknown): Boolean {
  if(valueA === valueB) {
    return true
  }

  const bothArrays = valueA instanceof Array && valueB instanceof Array
  const matchLengths = bothArrays && valueA.length == valueB.length
  if(matchLengths) {
    return valueA.every((item, index) => item == valueB[index])
  }

  return false
}

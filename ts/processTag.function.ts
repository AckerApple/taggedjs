import { isTagInstance } from './isInstance'
import { InsertBefore } from './Clones.type'
import { Tag } from './Tag.class'
import { TagSubject } from './Tag.utils'
import { TagSupport } from './TagSupport.class'
import { TemplaterResult, Wrapper } from './TemplaterResult.class'
import { ValueSubject } from './subject'
import { Props } from './Props'

/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(
  tag: Tag,
  subject: TagSubject, // could be tag via result.tag
  insertBefore: InsertBefore,
  ownerTag: Tag, // owner
) {
  // first time seeing this tag?
  if(!tag.tagSupport) {
    if(!isTagInstance(tag)) {
      throw new Error('issue non-tag here')
    }

    applyFakeTemplater(tag, ownerTag, subject)

    if(ownerTag.childTags.find(x => x === tag)) {
      throw new Error('about to reattach tag already present - 5')
    }

    ownerTag.childTags.push(tag as Tag)
  }
  
  tag.ownerTag = ownerTag

  if((insertBefore as any).tagName !== 'TEMPLATE') {
    throw new Error(`;;;; - ${insertBefore.nodeName}`)
  }

  tag.buildBeforeElement(insertBefore, {
    counts: {added:0, removed:0},
    forceElement: true,
  })
}

export function applyFakeTemplater(
  tag: Tag,
  ownerTag: Tag,
  subject: TagSubject,
) {
  if(!ownerTag) {
    throw new Error('no owner error')
  }
  const fakeTemplater = getFakeTemplater()

  tag.tagSupport = new TagSupport(
    ownerTag.tagSupport,
    fakeTemplater, // the template is provided via html`` call
    subject,
  )

  fakeTemplater.global.oldest = tag
  fakeTemplater.global.newest = tag
  fakeTemplater.tagSupport = tag.tagSupport

  // asking me to render will cause my parent to render
  tag.ownerTag = ownerTag
}

function getFakeTemplater() {
  return {
    global:{
      renderCount: 0,
      providers: [],
      context: {},
      subscriptions: [],
      deleted: false,
      
      newestTemplater: {} as TemplaterResult,
    },
    children: new ValueSubject<Tag[]>([]), // no children
    props: {} as Props,
    
    isTag: true,
    isTemplater: false,
    tagged: false,
    wrapper: (() => undefined) as unknown as Wrapper,
    tagSupport: {} as TagSupport,
  } as TemplaterResult
}

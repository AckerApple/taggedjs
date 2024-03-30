import { Tag } from "./Tag.class"
import { TagSupport } from "./TagSupport.class"
import { ValueSubject } from "./ValueSubject"
import { html } from "./html"
import { TemplaterResult } from "./TemplaterResult.class"
import { TagSubject } from "./Tag.utils"

describe('Tag.class', () => {
  it('simple update', () => {
    let [tag0, tag1] = getTags()

    tag0.updateByTag(tag1)
    const template = tag0.getTemplate()
    expect(template.string).toBe( tag1.getTemplate().string )
  })

  it('middle variable update', () => {
    let [tag0, tag1] = getTags({
      html0: html`test`,
      html1: html`test ${1} test`,
    })

    tag0.updateByTag(tag1)
    const template = tag0.getTemplate()
    expect(template.string).toBe( tag1.getTemplate().string )
    expect(template.strings).toEqual( [ 'test ', ' test' ] )
    expect(template.values).toEqual( [ 1 ] )
  })

  it('end variable update', () => {
    let [tag0, tag1] = getTags({
      html0: html`test`,
      html1: html`test end ${1}`,
    })

    tag0.updateByTag(tag1)
    const template = tag0.getTemplate()
    expect(template.string).toBe( 'test end <template interpolate end id="__tagvar0"></template>' )
    expect(template.strings).toEqual( [ 'test end ', '' ] )
    expect(template.values).toEqual( [ 1 ] )
  })

  it('only variable', () => {
    let [tag0, tag1] = getTags({
      html0: html`test`,
      html1: html`${1}`,
    })

    tag0.updateByTag(tag1)
    const template = tag0.getTemplate()
    expect(template.string).toBe('<template interpolate end id="__tagvar0"></template>')
    expect(template.strings).toEqual( ['', ''] )
    expect(template.values).toEqual( [ 1 ] )
    expect(template.context.__tagvar0.value).toEqual(1)
  })
})


function getTags(
  {html0, html1} = {
    html0: html`testing`,
    html1: html`testing-1482`,
  }
) {
  const tag0 = new Tag(html0.strings, html0.values)
  const tag1 = new Tag(html1.strings, html1.values)
  
  tag0.hasLiveElements = true

  const ownerTagSupport = {} as TagSupport
  const templater0 = {
    global: {
      context: {},
      oldest: tag0,
    },
    children: new ValueSubject<Tag[]>([]),
  } as TemplaterResult

  const subject = new ValueSubject(templater0) as TagSubject
  tag0.tagSupport = new TagSupport(ownerTagSupport, templater0, subject)

  const templater1 = {
    global: {
      context: {},
      oldest: tag1,
    },
    children: new ValueSubject<Tag[]>([]),
  } as TemplaterResult
  tag1.tagSupport = new TagSupport(ownerTagSupport, templater1, subject)

  return [tag0, tag1]
}
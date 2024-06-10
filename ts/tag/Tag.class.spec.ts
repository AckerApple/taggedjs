import { Tag } from './Tag.class.js'
import { Support } from './Support.class.js'
import { ValueSubject } from '../subject/ValueSubject.js'
import { html } from './html.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { TagSubject } from '../subject.types.js'
import { Props } from '../Props.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'

describe('Tag.class', () => {
  it('simple update', () => {
    const {support0, support1} = getTags()

    support0.updateBy(support1)
    const template = support0.getTemplate()
    expect(template.string).toBe( support1.getTemplate().string )
  })

  it('middle variable update', () => {
    let {support0, support1} = getTags({
      html0: html`test`,
      html1: html`test ${1} test`,
    })

    support0.updateBy(support1)
    const template = support0.getTemplate()
    expect(template.string).toBe( support1.getTemplate().string )
    expect(template.strings).toEqual( [ 'test ', ' test' ] )
    // expect(template.values).toEqual( [ 1 ] )
  })

  it('end variable update', () => {
    let {support0, support1} = getTags({
      html0: html`test`,
      html1: html`test end ${1}`,
    })

    support0.updateBy(support1)
    const template = support0.getTemplate()
    expect(template.string).toBe( 'test end <template interpolate end id="__tagvar0"></template>' )
    expect(template.strings).toEqual( [ 'test end ', '' ] )
    // expect(template.values).toEqual( [ 1 ] )
  })

  it('only variable', () => {
    let {support0, support1} = getTags({
      html0: html`test`,
      html1: html`${1}`,
    })

    support0.updateBy(support1)
    const template = support0.getTemplate()
    expect(template.string).toBe('<template interpolate end id="__tagvar0"></template>')
    expect(template.strings).toEqual( ['', ''] )
    // expect(template.values).toEqual( [ 1 ] )
    // expect(template.context.__tagvar0.value).toEqual(1)
  })
})


function getTags(
  {html0, html1} = {
    html0: html`testing`,
    html1: html`testing-1482`,
  }
) {
  const templater0 = {
    children: new ValueSubject<Tag[]>([]),
    props: [] as Props,
  } as TemplaterResult

  const templater1 = {
    children: new ValueSubject<Tag[]>([]),
    props: [] as Props,
  } as TemplaterResult

  const subject = new TagJsSubject(templater0) as any as TagSubject
  const tag0 = new Tag(html0.strings, html0.values)
  const tag1 = new Tag(html1.strings, html1.values)

  tag0.templater = templater0
  tag1.templater = templater1
  templater0.tag = tag0
  templater1.tag = tag1

  const support0 = new Support(tag0.templater, {} as any as Support, subject)
  const support1 = new Support(tag1.templater, {} as any as Support, subject)

  support0.subject.global.oldest = support0
  support1.subject.global.oldest = support1

  support0.hasLiveElements = true

  const ownerSupport = {} as Support

  subject.next(templater0)

  return {tag0, tag1, support0, support1}
}
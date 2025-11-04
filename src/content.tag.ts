import { LikeObjectChildren, html, tag, ValueSubject, state, states, subscribe, Subject, getInnerHTML, div, input, select, option, noElement, button, hr, fieldset, legend, span, b } from "taggedjs"
import { dumpContent } from "./dumpContent.tag"
import { renderCountDiv } from "./renderCount.component"
import { fx } from "taggedjs-animate-css"

export const testStaggerBy = 20

const outerHtml = tag((
  staggerBy = 10,
) => {
  const xx = tag.getInnerHTML()
  
  return div({
    id:"outer-html-fx-test",
    attr: fx({stagger: staggerBy, duration: '.1s'}),
    'style.border': "1px solid orange",
    
  }, xx)
})

export const concatStyles = tag((innerHTML: any) => {
  concatStyles.updates(x => [innerHTML] = x)
  let width = 1
  let borderColor = 'white'

  return div(
    div({
      id: "dynamic-border-element",
      style: _=> `border-width:${width}px;border-color:${borderColor};border-style:solid;`
    }, innerHTML),

    div(
      'borderWidth:',
      input({
        id: "dynamic-border-width",
        type: "range",
        min: "0",
        max: "10",
        step: "1",
        value: _=> width,
        onChange: event => width = Number(event.target.value)
      }),
      ' - ',
      _=> width,
      'px'
    ),

    div(
      'borderColor:',
      select({
        id: "dynamic-border-color",
        onChange: event => borderColor = event.target.value
      },
        option({value: "", selected: _=> borderColor === ''}),
        option({value: "black", selected: _=> borderColor === 'black'}, 'black'),
        option({value: "blue", selected: _=> borderColor === 'blue'}, 'blue'),
        option({value: "white", selected: _=> borderColor === 'white'}, 'white')
      )
    )
  )
})

export const content = tag(() => {
  const vs0 = new ValueSubject(0)

  let renderCount: number = 0
  let orangeToggle = true
  let boldToggle = false
  let counter = 0
  let staggerBy = testStaggerBy
  let showHideFx = false
  const counts = new Subject({ added: 0, removed: 0})// as ValueSubject<{added: number, removed: number}>

  ++renderCount

  const dom: LikeObjectChildren = [{
    nn: 'b', ch:[{
      nn: 'text',
      tc: 'big',
    }]
  }]
  const injectionTest = '<script>alert("i should never run but be seen on page")</script>'

  const pipe = subscribe(vs0, () => {
    return noElement(
      button({
        type:"button",
        onClick:() => {
          ++counter
        }
      }, 'increase inside ', _=> counter),
      
      button({
        type:"button", onClick:() => vs0.next( vs0.value + 1 )
      }, 'increase vs0'),
    )
  })

  return noElement(
    fieldset({style: "flex-grow:1"},
      legend(
        'piped subject click ',
        span({id: "pipe-counter-click-display"},
          _=> counter
        )
      ),
      
      pipe,
      
      button({type: "button", onClick: () => ++counter},
        'increase outside ', _=> counter
      )
    ),

    fieldset({style: "flex-grow:1"},
      legend('hide show'),

      button({
        id: "content-toggle-fx",
        type: "button",
        onClick: () => showHideFx = !showHideFx
      }, 'toggle hideshow fx'),

      _=> showHideFx && div({
        name:"test-the-tester", attr: fx({duration:'10ms'}),
      }, 'test the tester - 0'),

      _=> showHideFx && div({
        name:"test-the-tester",
        attr: fx({duration:'10ms', stagger: staggerBy}),
      }, 'test the tester - 1'),

      _=> showHideFx && div({
        name:"test-the-tester",
        attr: fx({duration:'10ms', stagger: staggerBy * 2}),
      }, 'test the tester - 2'),

      _=> showHideFx && (outerHtml(staggerBy).innerHTML = innerHtmlTag()),

      div(
        div(
          'added: ',
          span({id: "content-fx-added"},
            subscribe(counts, counts => counts.added)
          ),
          ' ',
          'removed: ',
          span({id: "content-fx-removed"},
            subscribe(counts, counts => counts.removed)
          )
        ),
        div(
          'staggerBy:',
          input({
            type: "range", min: "10",
            max: "300", step: "1",
            onChange: event => staggerBy = Number(event.target.value)
          })
        )
      ),

      hr,

      concatStyles('test the tester2')
    ),

    fieldset(
      legend('Dump Content'),
      dumpContent(),
      renderCountDiv({renderCount, name: 'content'})
    ),

    fieldset({id: "noParentTagFieldset"},
      legend('No Parent Test'),
      numberedNoParents()
    ),

    hr({id: "noParentsTest2-start"}),
    
    numberedNoParents(),
    
    hr({id: "noParentsTest2-end"}),

    div({style:"display:flex;flex-wrap:wrap;gap:1em;"},
      fieldset(
        legend('injection test'),
        div({id:"injection-test"}, 'injection test ', injectionTest),
        div({id:"hello-big-dom-world"}, 'hello ', html.dom(dom), ' world'),
        div({id:"hello-big-string-world"}, 'hello ', b('big'), ' world'),
      ),

      fieldset(
        legend('tagvar injection'),
        div(
          div({id:"inject-tagvar-0"}, ':tagvar0:'), '===', div({id:"inject-read-tagvar-0"}, ':tagvar0:'),
          div({id:"inject-tagvar-1"}, ':tagvarx0x:'), '===', div({id:"inject-read-tagvar-1"}, ':tagvarx0x:'),
          div({id:"inject-tagvar-2"}, ':tagvar0:'), '===', div({id:"inject-read-tagvar-2"}, ':tagvar0:')
        )
      ),

      div({id:"style-simple-border-orange", 'style.border':"3px solid orange"}, 'simple orange border'),
      div({id:"style-var-border-orange", 'style.border': "3px solid orange"}, 'var orange border'),

      div(
        div({
          id:"style-toggle-border-orange",
          'style.border': _=> orangeToggle ? "3px solid orange" : "3px solid green",
        }, 'toggle orange border'),

        button({
          id:"toggle-border-orange",
          onClick: () => orangeToggle = !orangeToggle,
        }, 'orange toggle ', _=> orangeToggle),
      ),

      div(
        div({
          id: "style-toggle-bold",
          style: _=> boldToggle ? 'font-weight:bold;' : '',
        }, 'toggle orange border'),

        button({
          id: "toggle-bold",
          onClick: () => boldToggle = !boldToggle,
        }, 'bold toggle ', boldToggle ? 'true' : 'false'),
      ),

      div({id:"hello-spacing-dom-world"}, 54, ' hello', ' worlds'),
    ),

    div({style:"display:flex;flex-wrap:wrap;gap:1em;font-size:0.8em"},
      div({style:"flex-grow:1"},
        fieldset(
          legend('zero test'),
          'P.0 You should see "0" here => "', `${0}`, '"'
        )
      ),
      /* proof you cannot see false values */
      div({style:"flex-grow:1"},
        fieldset(
          legend('false test'),
          'P.1 You should see "" here => "', `${false}`, '"',
        )
      ),

      div({style:"flex-grow:1"},
        fieldset(
          legend('null test'),
          'P.2 You should see "" here => "', `${null}`, '"',
        )
      ),

      div({style:"flex-grow:1"},
        fieldset(
          legend('undefined test'),
          'P.3 You should see "" here => "', `${undefined}`, '"',
        )
      ),

      /* proof you can see true booleans */
      div({style:"flex-grow:1"},
        fieldset(
          legend('true test'),
          'P.4 You should see "true" here => "', `${true}`, '"',
        )
      ),

      /* proof you can try to use the tagVar syntax */
      fieldset(
        div({style:"flex-grow:1"},
          'P.5 You should see "{22}" here => "' , `${'{'}`, '22', `${'}'}`, '"',
        )
      ),

      // TODO: useless
      fieldset(
        div({style:"flex-grow:1"},
          'P.6 You should see "{__tagVar0}" here => "{__tagVar0}"',
        )
      ),

      /* TODO: Move me to subscriptions.tag.ts */
      div({style:"flex-grow:1"},
        'should be a safe string no html ',
        span({id:"content-dom-parse-0-0"}, '"<div>hello</div>"'),
        ' here => ',
        span({id:"content-dom-parse-0-1"}, `"${'<div>hello</div>'}"`)
      )
    ),

    renderCountDiv({renderCount, name: 'content'})
  )
})

const numberedNoParents = tag(() => {
  return noElement(
    hr,
    'content1',
    hr,
    'test0',
    hr,
    'content2',
    hr,
    'test1',
    hr,
    'content3',
    hr,
    'test3',
    hr,
    'content4',
    hr,
  )
})


const innerHtmlTag = () => {
  return noElement('inner html tag')
}
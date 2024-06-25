import { getDomMeta } from '../../tag/domMetaCollector.js';
import { html } from '../../tag/html.js';
import { exchangeParsedForValues } from './exchangeParsedForValues.function.js';
import { htmlInterpolationToDomMeta } from './htmlInterpolationToDomMeta.function.js'

describe('htmlInterpolationToDomMeta', () => {
  it('works', () => {
    // Example usage with an array of HTML fragments and dynamic values
    const strings = [
        'lets start here<li class.completed=',
        ` data-testid="todo-item"><div class="view"><div style.display=`,
        '><input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=',
        ' onChange=',
        ' /><label data-testid="todo-item-label" onDoubleClick=',
        ' ',
        '>',
        'hello world',
        '</label></div></div></li>'
    ];
    
    const values = [true, 1 === 1 ? 'none' : 'block', false, "console.debug('change')", "console.debug('doubleclick')", "checked", "👋 ", " that I love"];
    
    const parsedElements = htmlInterpolationToDomMeta(strings, values)
    // console.debug('parsedElements', JSON.stringify(parsedElements, null, 2))
    const string = JSON.stringify(parsedElements)
    expect(string).toBe("[{\"nodeName\":\"text\",\"textContent\":\"lets start here\"},{\"nodeName\":\"li\",\"attributes\":[[\"class.completed\",\":tagvar0:\"],[\"data-testid\",\"todo-item\"]],\"children\":[{\"nodeName\":\"div\",\"attributes\":[[\"class\",\"view\"]],\"children\":[{\"nodeName\":\"div\",\"attributes\":[[\"style.display\",\":tagvar1:\"]],\"children\":[{\"nodeName\":\"input\",\"attributes\":[[\"class\",\"toggle\"],[\"type\",\"checkbox\"],[\"data-testid\",\"todo-item-toggle\"],[\"checked\",\":tagvar2:\"],[\"onchange\",\":tagvar3:\"]]},{\"nodeName\":\"label\",\"attributes\":[[\"data-testid\",\"todo-item-label\"],[\"ondoubleclick\",\":tagvar4:\"],[\":tagvar5:\"]],\"children\":[{\"nodeName\":\"text\",\"textContent\":\":tagvar6:\"},{\"nodeName\":\"text\",\"textContent\":\"hello world\"},{\"nodeName\":\"text\",\"textContent\":\":tagvar7:\"}]}]}]}]}]")
  })

  it('handles masking with escaping', () => {
    const strings = ['<b>bold <!-- [g t] [g&nbsp;t] <u>and</u> --> brave</b>']
    const values: any[] = []
    const parsedElements = htmlInterpolationToDomMeta(strings, values)
    // console.debug('parsedElements', JSON.stringify(parsedElements, null, 2))
    expect(parsedElements).toEqual([
      {
        "nodeName": "b",
        "children": [
          {
            "nodeName": "text",
            "textContent": "bold <!-- [g t] [g t] <u>and</u> --> brave"
          },
        ]
      }
    ])
  })

  describe('attributes', () => {    
    it('no attributes on elem', () => {
      const strings = ['<b>bold</b>']
      const values: any[] = []
      const parsedElements = htmlInterpolationToDomMeta(strings, values)
      expect(parsedElements).toEqual([{"nodeName":"b","children":[{"nodeName":"text","textContent":"bold"}]}])
    })
  
    it('one attribute on elem', () => {
      const strings = ['<b style="text-decoration:underline;">bold</b>']
      const values: any[] = []
      const parsedElements = htmlInterpolationToDomMeta(strings, values)
      expect(parsedElements).toEqual([{"nodeName":"b","attributes":[["style","text-decoration:underline;"]],"children":[{"nodeName":"text","textContent":"bold"}]}])
    })

    it('aligned spacing', () => {
      const strings = [
        '<input  type        = "text" placeholder = ',
        ' style       = "width:100%" />'
      ]
      const values: any[] = ['placeholder']
      const parsedElements = htmlInterpolationToDomMeta(strings, values)
      // console.debug(JSON.stringify(parsedElements, null, 2))
      expect(parsedElements).toEqual([
        {
          "nodeName": "input",
          "attributes": [
            [
              "type",
              "text"
            ],
            [
              "placeholder",
              ":tagvar0:"
            ],
            [
              "style",
              "width:100%"
            ]
          ]
        }
      ])
    })

    it('aligned spacing with line returns', () => {
      const strings = [
        '            <input\n' +
        '                type        = "text"\n' +
        '                placeholder = ',
        '                value       = ',
        '                onblur      = ',
        '                onKeyDown   = ',
        '                style       = "width:100%"\n' +
        '            />'
      ]
      
      const values: any[] = [
        'placeholder',
        'defaultValue',
        'handleBlur',
        'handleKeyDown'
      ]
      const parsedElements = htmlInterpolationToDomMeta(strings, values)
      //console.debug(JSON.stringify(parsedElements, null, 2))
      expect(parsedElements).toEqual([
        {
          "nodeName": "input",
          "attributes": [
            [
              "type",
              "text"
            ],
            [
              "placeholder",
              ":tagvar0:"
            ],
            [
              "value",
              ":tagvar1:"
            ],
            [
              "onblur",
              ":tagvar2:"
            ],
            [
              "onkeydown",
              ":tagvar3:"
            ],
            [
              "style",
              "width:100%"
            ]
          ]
        }
      ])
    })
  })

  it('spacing maintains', () => {
    const strings = ['',' ',' worlds']
    const values: any[] = [53,'hello']
    const parsedElements = htmlInterpolationToDomMeta(strings, values)
    expect(parsedElements).toEqual([
      { nodeName: 'text', textContent: ':tagvar0:' },
      { nodeName: 'text', textContent: ' ' },
      { nodeName: 'text', textContent: ':tagvar1:' },
      { nodeName: 'text', textContent: ' worlds' },
    ])
  })

  it('variable exchange', () => {
    const strings = [
      '<fieldset><div style="flex-grow:1">P.5 You should see "{22}" here => "',
      '22',
      '"</div></fieldset>'
    ]

    const values = ['{','}']

    const parsedElements = htmlInterpolationToDomMeta(strings, values)
    const string = JSON.stringify(parsedElements)
    // console.debug(string)
    expect(string).toBe("[{\"nodeName\":\"fieldset\",\"children\":[{\"nodeName\":\"div\",\"attributes\":[[\"style\",\"flex-grow:1\"]],\"children\":[{\"nodeName\":\"text\",\"textContent\":\"P.5 You should see \\\"{22}\\\" here => \\\"\"},{\"nodeName\":\"text\",\"textContent\":\":tagvar0:\"},{\"nodeName\":\"text\",\"textContent\":\"22\"},{\"nodeName\":\"text\",\"textContent\":\":tagvar1:\"},{\"nodeName\":\"text\",\"textContent\":\"\\\"\"}]}]}]")
  })

  it('empty strings', async () => {
    const result = htmlInterpolationToDomMeta([], [1])
    expect(result).toEqual([ { nodeName: 'text', textContent: ':tagvar0:' } ])
  })
})


describe('exchangeParsedForValues', () => {    
  it('empty strings', () => {
    const values = [1]
    const parsedElements = htmlInterpolationToDomMeta([], values)
    expect(parsedElements).toEqual([{"nodeName":"text","textContent":":tagvar0:"}])
    
    exchangeParsedForValues(parsedElements, values)
    const string = JSON.stringify(parsedElements)
    expect(string).toBe(`[{"nodeName":"text","value":1}]`)
  })

  it('spacing maintains', () => {
    const strings = ['',' ',' worlds']
    const values: any[] = [53,'hello']
    const parsedElements = htmlInterpolationToDomMeta(strings, values)
    expect(parsedElements).toEqual([{
      nodeName: 'text',
      textContent: ':tagvar0:'
    },{
      nodeName: 'text',
      textContent: ' '
    },{
      nodeName: 'text',
      textContent: ':tagvar1:'
    },{
      nodeName: 'text',
      textContent: ' worlds'
    }])
    exchangeParsedForValues(parsedElements, values)
    expect(parsedElements).toEqual([
      { nodeName: 'text', value: 53 },
      { nodeName: 'text', textContent: ' ' },
      { nodeName: 'text', value: 'hello' },
      { nodeName: 'text', textContent: ' worlds' }
    ])
  })
})

describe('getDomMeta', () => {
  it('empty strings', async () => {
    const result = getDomMeta([], [1])
    expect(result).toEqual([ { nodeName: 'text', textContent: ':tagvar0:' } ])
  })

  it('wild 1', async () => {
    const allStrings: any[] = [[{"nodeName":"div","attributes":[["id","empty-string-1"]]}],[{"nodeName":"div","attributes":[["id","select-tag-above"]],"children":[{"nodeName":"text","textContent":"select tag above"}]}],[{"nodeName":"div","attributes":[["id","select-tag-above"]],"children":[{"nodeName":"text","textContent":"null, select tag above"}]}],[{"nodeName":"div","attributes":[["id","select-tag-above"]],"children":[{"nodeName":"text","textContent":"empty-string, select tag above"}]}],[{"nodeName":"div","attributes":[["id","selectTag-wrap"]],"children":[{"nodeName":"text","textContent":"selectedTag:"},{"nodeName":"text","textContent":" |"},{"nodeName":"text","textContent":":tagvar0:"},{"nodeName":"text","textContent":"|"}]},{"nodeName":"select","attributes":[["id","tag-switch-dropdown"],["onchange",":tagvar1:"]],"children":[{"nodeName":"option","attributes":[]},{"nodeName":"text","textContent":"<!-- TODO: implement selected attribute --->"},{"nodeName":"option","attributes":[["value",":tagvar0:"],[":tagvar2:"]],"children":[{"nodeName":"text","textContent":"empty-string"}]},{"nodeName":"option","attributes":[["value","undefined"],[":tagvar3:"]],"children":[{"nodeName":"text","textContent":"undefined"}]},{"nodeName":"option","attributes":[["value","null"],[":tagvar4:"]],"children":[{"nodeName":"text","textContent":"null"}]},{"nodeName":"option","attributes":[["value","1"],[":tagvar5:"]],"children":[{"nodeName":"text","textContent":"tag 1"}]},{"nodeName":"option","attributes":[["value","2"],[":tagvar6:"]],"children":[{"nodeName":"text","textContent":"tag 2"}]},{"nodeName":"option","attributes":[["value","3"],[":tagvar7:"]],"children":[{"nodeName":"text","textContent":"tag 3"}]}]},{"nodeName":"div","attributes":[["id","switch-tests-wrap"],["style","display:flex;flex-wrap:wrap;gap:1em;"]],"children":[{"nodeName":"text","textContent":":tagvar8:"},{"nodeName":"div","attributes":[["id","arraySwitching-test-wrap"],["style","border:1px solid red;flex-grow:1"]],"children":[{"nodeName":"h3","attributes":[],"children":[{"nodeName":"text","textContent":"Test 4 - arraySwitching"}]},{"nodeName":"div","attributes":[["id","arraySwitching-wrap"]],"children":[{"nodeName":"text","textContent":":tagvar9:"}]}]}]},{"nodeName":"text","textContent":":tagvar10:"}],[{"nodeName":"div","attributes":[["id","ternaryPropTest-wrap"]],"children":[{"nodeName":"text","textContent":":tagvar0:"},{"nodeName":"text","textContent":":"},{"nodeName":"text","textContent":":tagvar1:"}]}],[{"nodeName":"div","attributes":[["id","tag1"],["style","border:1px solid orange;"]],"children":[{"nodeName":"div","attributes":[["id","tagSwitch-1-hello"]],"children":[{"nodeName":"text","textContent":"Hello 1 "}, {"nodeName":"text","textContent":":tagvar0:"}, {"nodeName":"text","textContent":" World"}]},{"nodeName":"button","attributes":[["onclick",":tagvar1:"]],"children":[{"nodeName":"text","textContent":"increase "},{"nodeName":"text","textContent":":tagvar2:"}]},{"nodeName":"text","textContent":":tagvar3:"}]}],[{"nodeName":"div","attributes":[["id","tag2"],["style","border:1px solid orange;"]],"children":[{"nodeName":"div","attributes":[["id","tagSwitch-2-hello"]],"children":[{"nodeName":"text","textContent":"Hello 2 "}, {"nodeName":"text","textContent":":tagvar0:"}, {"nodeName":"text","textContent":" World"}]},{"nodeName":"button","attributes":[["onclick",":tagvar1:"]],"children":[{"nodeName":"text","textContent":"increase "},{"nodeName":"text","textContent":":tagvar2:"}]},{"nodeName":"text","textContent":":tagvar3:"}]}],[{"nodeName":"div","attributes":[["id","tag3"],["style","border:1px solid orange;"]],"children":[{"nodeName":"div","attributes":[["id","tagSwitch-3-hello"]],"children":[{"nodeName":"text","textContent":"Hello 3 "},{"nodeName":"text","textContent":":tagvar0:"},{"nodeName":"text","textContent":" World"}]},{"nodeName":"button","attributes":[["onclick",":tagvar1:"]],"children":[{"nodeName":"text","textContent":"increase "},{"nodeName":"text","textContent":":tagvar2:"}]},{"nodeName":"text","textContent":":tagvar3:"}]}],[{"nodeName":"text","textContent":"its an undefined value"}],[{"nodeName":"text","textContent":"its a null value"}],[{"nodeName":"text","textContent":"space"}],[{"nodeName":"text","textContent":":tagvar0:"}],[{"nodeName":"text","textContent":":tagvar0:"}],[{"nodeName":"text","textContent":":tagvar0:"}],[{"nodeName":"text","textContent":":tagvar0:"}],[{"nodeName":"text","textContent":":tagvar0:"}],[{"nodeName":"text","textContent":"nothing to show for in arrays"}]]

    const tag3 = (x:string) => 'tag'+x+'value'
    const values = ['d','e','f'].map(x => {
      const keyResult = html.dom(allStrings[16], tag3(x)).key(x)
      return keyResult
    })
    const result = html.dom(allStrings[15], values)
    exchangeParsedForValues(result.dom, result.values)
    // console.debug(JSON.stringify(result, null, 2))
    expect(JSON.parse(JSON.stringify(result))).toEqual({
      "values": [
        [
          {
            "values": [
              "tagdvalue"
            ],
            "tagJsType": "dom",
            "dom": [
              {
                "nodeName": "text",
                "textContent": ""
              }
            ],
            "html": {},
            "arrayValue": "d"
          },
          {
            "values": [
              "tagevalue"
            ],
            "tagJsType": "dom",
            "dom": [
              {
                "nodeName": "text",
                "textContent": ""
              }
            ],
            "html": {},
            "arrayValue": "e"
          },
          {
            "values": [
              "tagfvalue"
            ],
            "tagJsType": "dom",
            "dom": [
              {
                "nodeName": "text",
                "textContent": ""
              }
            ],
            "html": {},
            "arrayValue": "f"
          }
        ]
      ],
      "tagJsType": "dom",
      "dom": [
        {
          "nodeName": "text",
          "value": [
            [
              {
                "nodeName": "text",
                "textContent": ""
              }
            ],
            [
              {
                "nodeName": "text",
                "value": "tagevalue"
              }
            ],
            [
              {
                "nodeName": "text",
                "textContent": ""
              }
            ]
          ]
        }
      ],
      "html": {}
    })
  })
})

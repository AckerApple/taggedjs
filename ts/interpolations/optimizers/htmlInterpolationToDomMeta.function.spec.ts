import { getDomMeta } from '../../tag/domMetaCollector.js';
import { html } from '../../tag/html.js';
import { exchangeParsedForValues } from './exchangeParsedForValues.function.js';
import { htmlInterpolationToDomMeta, htmlInterpolationToPlaceholders, parseHTML } from './htmlInterpolationToDomMeta.function.js'

describe('htmlInterpolationToDomMeta', () => {
  it('exchangeParsedForValues - onclicks', () => {
    const strings = [
      "<!--app.js--><h1 id=\"h1-app\">🏷️ TaggedJs - ",
      "</h1><button id=\"toggle-test\" onclick=",
      ">toggle test ",
      "</button><button onclick=",
      ">run test</button>"
    ]

    const values = [2+2, 'toggle', 'toggleValue', 'runTesting']
    const domMeta = htmlInterpolationToDomMeta(strings, values)
    const {parsedElements: result} = exchangeParsedForValues(domMeta, values)
    // console.debug('result', JSON.stringify(result, null, 2))
    expect(result).toEqual([
      {
        "nodeName": "text",
        "textContent": "<!--app.js-->"
      },
      {
        "nodeName": "h1",
        "attributes": [
          [
            "id",
            "h1-app"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": "🏷️ TaggedJs - "
          },
          {
            "nodeName": "text",
            "value": 4
          }
        ]
      },
      {
        "nodeName": "button",
        "attributes": [
          [
            "id",
            "toggle-test"
          ],
          [
            "onclick",
            "toggle"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": "toggle test "
          },
          {
            "nodeName": "text",
            "value": "toggleValue"
          }
        ]
      },
      {
        "nodeName": "button",
        "attributes": [
          [
            "onclick",
            "runTesting"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": "run test"
          }
        ]
      }
    ])
  })

  it('select input attributes', () => {
    const strings = [
      "<div id=\"selectTag-wrap\">selectedTag: |", // 0
      "|</div><select id=\"tag-switch-dropdown\" onchange=",
      "><option></option><!-- TODO: implement selected attribute ---><option value=\"\" ", // 2
      ">empty-string</option><option value=\"undefined\" ",
      ">undefined</option><option value=\"null\" ", // 4
      ">null</option><option value=\"1\" ",
      ">tag 1</option><option value=\"2\" ", // 6
      ">tag 2</option><option value=\"3\" ",
      ">tag 3</option></select><div id=\"switch-tests-wrap\" style=\"display:flex;flex-wrap:wrap;gap:1em;\"><div style=\"border:1px solid blue;flex-grow:1\"><h3>Test 1 - string | Tag</h3><div>",
      "</div></div><div style=\"border:1px solid blue;flex-grow:1\"><h3>Test 2 - Tag</h3><div>", // 9
      "</div></div></div>"
    ]

    const values = [
      'selected-tag', // content - 0
      '() => onchange', // attr - 1
      'value_empty', // attr - 2
      'value_undefined', // attr - 3
      'value_null', // attr - 4
      'value_1', // attr - 5
      'value_2', // attr - 6
      'value_3', // attr - 7
      'some content 0', // content - 8
      'some content 1', // content - 9
    ]

    
    // const placeheldStrings = htmlInterpolationToPlaceholders(strings, values)
    // console.log('placeheldStringsplaceheldStringsplaceheldStrings')
    // console.log(placeheldStrings)
    // console.log('placeheldStringsplaceheldStringsplaceheldStrings')

    // const htmlString = htmlInterpolationToPlaceholders(strings, values).join('')
    // const domMeta2 = parseHTML(htmlString)
    // console.log('htmlString', JSON.stringify({htmlString, domMeta2}, null, 2))

    const domMeta = htmlInterpolationToDomMeta(strings, values)
    // console.debug('domMeta', JSON.stringify(domMeta, null, 2))
    expect(domMeta).toEqual([
      {
        "nodeName": "div",
        "attributes": [
          [
            "id",
            "selectTag-wrap"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": "selectedTag: |"
          },
          {
            "nodeName": "text",
            "textContent": ":tagvar0:"
          },
          {
            "nodeName": "text",
            "textContent": "|"
          }
        ]
      },
      {
        "nodeName": "select",
        "attributes": [
          [
            "id",
            "tag-switch-dropdown"
          ],
          [
            "onchange",
            ":tagvar1:"
          ]
        ],
        "children": [
          {
            "nodeName": "option"
          },
          {
            "nodeName": "text",
            "textContent": "<!-- TODO: implement selected attribute --->"
          },
          {
            "nodeName": "option",
            "attributes": [
              [
                "value",
                undefined,
              ],
              [
                ":tagvar2:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "empty-string"
              }
            ]
          },
          {
            "nodeName": "option",
            "attributes": [
              [
                "value",
                "undefined"
              ],
              [
                ":tagvar3:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "undefined"
              }
            ]
          },
          {
            "nodeName": "option",
            "attributes": [
              [
                "value",
                "null"
              ],
              [
                ":tagvar4:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "null"
              }
            ]
          },
          {
            "nodeName": "option",
            "attributes": [
              [
                "value",
                "1"
              ],
              [
                ":tagvar5:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "tag 1"
              }
            ]
          },
          {
            "nodeName": "option",
            "attributes": [
              [
                "value",
                "2"
              ],
              [
                ":tagvar6:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "tag 2"
              }
            ]
          },
          {
            "nodeName": "option",
            "attributes": [
              [
                "value",
                "3"
              ],
              [
                ":tagvar7:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "tag 3"
              }
            ]
          }
        ]
      },
      {
        "nodeName": "div",
        "attributes": [
          [
            "id",
            "switch-tests-wrap"
          ],
          [
            "style",
            "display:flex;flex-wrap:wrap;gap:1em;"
          ]
        ],
        "children": [
          {
            "nodeName": "div",
            "attributes": [
              [
                "style",
                "border:1px solid blue;flex-grow:1"
              ]
            ],
            "children": [
              {
                "nodeName": "h3",
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": "Test 1 - string | Tag"
                  }
                ]
              },
              {
                "nodeName": "div",
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": ":tagvar8:"
                  }
                ]
              }
            ]
          },
          {
            "nodeName": "div",
            "attributes": [
              [
                "style",
                "border:1px solid blue;flex-grow:1"
              ]
            ],
            "children": [
              {
                "nodeName": "h3",
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": "Test 2 - Tag"
                  }
                ]
              },
              {
                "nodeName": "div",
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": ":tagvar9:"
                  }
                ]
              }
            ]
          }
        ]
      }
    ])
  })

  it('7 variables', () => {
    const strings = [
      "<!--propsDebug.js--><h3>Props Json</h3><textarea style=\"font-size:0.6em;height:200px;width:100%;;max-width:400px\" wrap=\"off\"\n          onchange=",
      "\n        >",
      "</textarea><pre>",
      "</pre><!--<div style=\"display:flex;flex-wrap:wrap\"></div>--><hr /><h3>Props Number</h3><textarea style=\"font-size:0.6em;height:200px;width:100%;color:white;\" wrap=\"off\" disabled\n        >",
      "</textarea><div><button id=\"propsDebug-🥩-1-button\" onclick=",
      "\n          >🐄 🥩 propNumber ",
      "</button><span id=\"propsDebug-🥩-1-display\">",
      "</span></div>"
    ]

    const values = [
      '() => onchange', // attr - 0
      'text_area_content', // content - 1
      'pre_content', // content - 2
      'text_area_content_2', // content - 3
      '() => div_onclick', // attr - 4
      'prop_num_content' , // content - 5
      'span-content' , // content - 6
    ]
    
    // const placeholders = htmlInterpolationToPlaceholders(strings, values)
    // console.debug('placeholders', JSON.stringify(placeholders, null, 2))

    const domMeta = htmlInterpolationToDomMeta(strings, values)
    // console.debug('domMeta', JSON.stringify(domMeta, null, 2))

    expect(domMeta).toEqual([
      {
        "nodeName": "text",
        "textContent": "<!--propsDebug.js-->"
      },
      {
        "nodeName": "h3",
        "children": [
          {
            "nodeName": "text",
            "textContent": "Props Json"
          }
        ]
      },
      {
        "nodeName": "textarea",
        "attributes": [
          [
            "style",
            "font-size:0.6em;height:200px;width:100%;;max-width:400px"
          ],
          [
            "wrap",
            "off"
          ],
          [
            "onchange",
            ":tagvar0:"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": ":tagvar1:"
          }
        ]
      },
      {
        "nodeName": "pre",
        "children": [
          {
            "nodeName": "text",
            "textContent": ":tagvar2:"
          }
        ]
      },
      {
        "nodeName": "text",
        "textContent": "<!--<div style=\"display:flex;flex-wrap:wrap\"></div>-->"
      },
      {
        "nodeName": "hr"
      },
      {
        "nodeName": "h3",
        "children": [
          {
            "nodeName": "text",
            "textContent": "Props Number"
          }
        ]
      },
      {
        "nodeName": "textarea",
        "attributes": [
          [
            "style",
            "font-size:0.6em;height:200px;width:100%;color:white;"
          ],
          [
            "wrap",
            "off"
          ],
          [
            "disabled"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": ":tagvar3:"
          }
        ]
      },
      {
        "nodeName": "div",
        "children": [
          {
            "nodeName": "button",
            "attributes": [
              [
                "id",
                "propsDebug-🥩-1-button"
              ],
              [
                "onclick",
                ":tagvar4:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "🐄 🥩 propNumber "
              },
              {
                "nodeName": "text",
                "textContent": ":tagvar5:"
              }
            ]
          },
          {
            "nodeName": "span",
            "attributes": [
              [
                "id",
                "propsDebug-🥩-1-display"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": ":tagvar6:"
              }
            ]
          }
        ]
      }
    ])
  })

  it('exchangeParsedForValues - 3 vars attrs and content', () => {
    const strings = [
      "<div>👉 Subscriptions:<span id=\"👉-counter-sub-count\">", // global_count - 0
      "</span></div><button onclick=", // () => ++global_count - 1
      ">log subs</button><div>initCounter:", // initCounter - 2
      "</div><div><button id=\"counters-app-counter-subject-button\"\n              onclick=", // appCounterClick - 3
      "\n            >🍒 ++app subject</button><span>🍒 <span id=\"app-counters-display\">", // app-counters-display - 4
      "</span></span><span>🍒 <span id=\"app-counters-subject-display\">", // app-counters-subject-display - 5
      "</span></span></div>}</div>"
    ]

    const values = [
      'global_count', // attr
      '() => ++global_count', // attr
      'initCounter', // content
      '() => ++appCounterClick', // attr
      'app-counters-display', // content
      'app-counters-subject-display' , // content
    ]
    
    const domMeta = htmlInterpolationToDomMeta(strings, values)
    // console.debug('domMeta', JSON.stringify(domMeta, null, 2))
    expect(domMeta).toEqual([
      {
        "nodeName": "div",
        "children": [
          {
            "nodeName": "text",
            "textContent": "👉 Subscriptions:"
          },
          {
            "nodeName": "span",
            "attributes": [
              [
                "id",
                "👉-counter-sub-count"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": ":tagvar0:"
              }
            ]
          }
        ]
      },
      {
        "nodeName": "button",
        "attributes": [
          [
            "onclick",
            ":tagvar1:"
          ]
        ],
        "children": [
          {
            "nodeName": "text",
            "textContent": "log subs"
          }
        ]
      },
      {
        "nodeName": "div",
        "children": [
          {
            "nodeName": "text",
            "textContent": "initCounter:"
          },
          {
            "nodeName": "text",
            "textContent": ":tagvar2:"
          }
        ]
      },
      {
        "nodeName": "div",
        "children": [
          {
            "nodeName": "button",
            "attributes": [
              [
                "id",
                "counters-app-counter-subject-button"
              ],
              [
                "onclick",
                ":tagvar3:"
              ]
            ],
            "children": [
              {
                "nodeName": "text",
                "textContent": "🍒 ++app subject"
              }
            ]
          },
          {
            "nodeName": "span",
            "children": [
              {
                "nodeName": "text",
                "textContent": "🍒 "
              },
              {
                "nodeName": "span",
                "attributes": [
                  [
                    "id",
                    "app-counters-display"
                  ]
                ],
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": ":tagvar4:"
                  }
                ]
              }
            ]
          },
          {
            "nodeName": "span",
            "children": [
              {
                "nodeName": "text",
                "textContent": "🍒 "
              },
              {
                "nodeName": "span",
                "attributes": [
                  [
                    "id",
                    "app-counters-subject-display"
                  ]
                ],
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": ":tagvar5:"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "nodeName": "text",
        "textContent": "}"
      }
    ])
  })

  it('exchangeParsedForValues - 3 vars attrs and content', () => {
    const strings = [
      '<div><small>(',' render count <span id=','>','</span>)</small></div>'
    ]

    const values = ['name', 'name_render_count', 'renderCount']
    const domMeta = htmlInterpolationToDomMeta(strings, values)
    // console.debug('domMeta', JSON.stringify(domMeta, null, 2))
    expect(domMeta).toEqual([
      {
        "nodeName": "div",
        "children": [
          {
            "nodeName": "small",
            "children": [
              {
                "nodeName": "text",
                "textContent": "("
              },
              {
                "nodeName": "text",
                "textContent": ":tagvar0:"
              },
              {
                "nodeName": "text",
                "textContent": " render count "
              },
              {
                "nodeName": "span",
                "attributes": [
                  [
                    "id",
                    ":tagvar1:"
                  ]
                ],
                "children": [
                  {
                    "nodeName": "text",
                    "textContent": ":tagvar2:"
                  }
                ]
              },
              {
                "nodeName": "text",
                "textContent": ")"
              }
            ]
          }
        ]
      }
    ])
  })

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
    
    const values = [
      true, // class.completed - 0
      1 === 1 ? 'none' : 'block', // style.display - 1
      false, // checked - 2
      "console.debug('change')", // onChange - 3
      "console.debug('doubleclick')", // onDoubleClick - 4
      "checked", // 5
      "👋 ", // content - 6
      " that I love" // content - 7
    ];
    
    const parsedElements = htmlInterpolationToDomMeta(strings, values)
    // console.debug('parsedElements', JSON.stringify(parsedElements, null, 2))
    // const string = JSON.stringify(parsedElements)
    // const x = "[{\"nodeName\":\"text\",\"textContent\":\"lets start here\"},{\"nodeName\":\"li\",\"attributes\":[[\"class.completed\",\":tagvar0:\"],[\"data-testid\",\"todo-item\"]],\"children\":[{\"nodeName\":\"div\",\"attributes\":[[\"class\",\"view\"]],\"children\":[{\"nodeName\":\"div\",\"attributes\":[[\"style.display\",\":tagvar1:\"]],\"children\":[{\"nodeName\":\"input\",\"attributes\":[[\"class\",\"toggle\"],[\"type\",\"checkbox\"],[\"data-testid\",\"todo-item-toggle\"],[\"checked\",\":tagvar2:\"],[\"onchange\",\":tagvar3:\"]]},{\"nodeName\":\"label\",\"attributes\":[[\"data-testid\",\"todo-item-label\"],[\"ondoubleclick\",\":tagvar4:\"],[\":tagvar5:\"]],\"children\":[{\"nodeName\":\"text\",\"textContent\":\":tagvar6:\"},{\"nodeName\":\"text\",\"textContent\":\"hello world\"},{\"nodeName\":\"text\",\"textContent\":\":tagvar7:\"}]}]}]}]}]"
    // console.debug('parsedElements-old', JSON.stringify(JSON.parse(x), null, 2))
    expect(parsedElements).toEqual([
      {
        "nodeName": "text",
        "textContent": "lets start here"
      },
      {
        "nodeName": "li",
        "attributes": [
          [
            "class.completed",
            ":tagvar0:"
          ],
          [
            "data-testid",
            "todo-item"
          ]
        ],
        "children": [
          {
            "nodeName": "div",
            "attributes": [
              [
                "class",
                "view"
              ]
            ],
            "children": [
              {
                "nodeName": "div",
                "attributes": [
                  [
                    "style.display",
                    ":tagvar1:"
                  ]
                ],
                "children": [
                  {
                    "nodeName": "input",
                    "attributes": [
                      [
                        "class",
                        "toggle"
                      ],
                      [
                        "type",
                        "checkbox"
                      ],
                      [
                        "data-testid",
                        "todo-item-toggle"
                      ],
                      [
                        "checked",
                        ":tagvar2:"
                      ],
                      [
                        "onchange",
                        ":tagvar3:"
                      ]
                    ]
                  },
                  {
                    "nodeName": "label",
                    "attributes": [
                      [
                        "data-testid",
                        "todo-item-label"
                      ],
                      [
                        "ondoubleclick",
                        ":tagvar4:"
                      ],
                      [
                        ":tagvar5:"
                      ]
                    ],
                    "children": [
                      {
                        "nodeName": "text",
                        "textContent": ":tagvar6:"
                      },
                      {
                        "nodeName": "text",
                        "textContent": "hello world"
                      },
                      {
                        "nodeName": "text",
                        "textContent": ":tagvar7:"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ])
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

    it.only('aligned spacing with line returns', () => {
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

  it('variable exchange - with arrow function', () => {
    const parsedHtml = {
      html: '<div ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed=\'move\';dt.dropEffect=\'move\'" onclick=${onclickFun}>${3}</div>',
      strings: [ '<div ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed=\'move\';dt.dropEffect=\'move\'" onclick=', '></div>' ],
      values: [ 'onclickFun', '3' ]
    }

    const parsedElements = htmlInterpolationToDomMeta(parsedHtml.strings, parsedHtml.values)
    // const string = JSON.stringify(parsedElements, null, 2)
    // console.debug(string)
    expect(parsedElements).toEqual([
      {
        "nodeName": "div",
        "attributes": [
          [
            "ondragstart",
            "const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
          ],
          [
            "onclick",
            ":tagvar0:"
          ]
        ]
      },
      {
        "nodeName": "text",
        "textContent": ":tagvar1:"
      }
    ])
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

  it('empty values', () => {
    const values: any[] = []
    const parsedElements = [
    {
        "nodeName": "b",
        "children": [
            {
                "nodeName": "text",
                "textContent": "bold 77"
            }
        ]
    }
]
    const parsedElements_old = JSON.parse(JSON.stringify(parsedElements))
    exchangeParsedForValues(parsedElements as any, values)
    // const string = JSON.stringify(parsedElements)
    // console.debug(JSON.stringify(string, null, 2))
    expect(parsedElements_old).toEqual(parsedElements)
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
    const allStrings: any[] = [
      [{"nodeName":"div","attributes":[["id","empty-string-1"]]}],
      [{
        "nodeName":"div","attributes":[["id","select-tag-above"]],
        "children":[{"nodeName":"text","textContent":"select tag above"}]
      }],[{
        "nodeName":"div","attributes":[["id","select-tag-above"]],
        "children":[{"nodeName":"text","textContent":"null, select tag above"}]
      }],[{
        "nodeName":"div","attributes":[["id","select-tag-above"]],
        "children":[{"nodeName":"text","textContent":"empty-string, select tag above"}]
      }],[{
        "nodeName":"div","attributes":[["id","selectTag-wrap"]],
        "children":[
          {"nodeName":"text","textContent":"selectedTag:"},
          {"nodeName":"text","textContent":" |"},
          {"nodeName":"text","textContent":":tagvar0:"},
          {"nodeName":"text","textContent":"|"}
        ]
      },{
        "nodeName":"select","attributes":[["id","tag-switch-dropdown"],["onchange",":tagvar1:"]],
        "children":[
          {"nodeName":"option","attributes":[]},
          {"nodeName":"text","textContent":"<!-- TODO: implement selected attribute --->"},
          {"nodeName":"option","attributes":[["value",":tagvar0:"],[":tagvar2:"]],
            "children":[{"nodeName":"text","textContent":"empty-string"}]
          },{"nodeName":"option","attributes":[["value","undefined"],[":tagvar3:"]],
            "children":[{"nodeName":"text","textContent":"undefined"}]
          },{"nodeName":"option","attributes":[["value","null"],[":tagvar4:"]],
            "children":[{"nodeName":"text","textContent":"null"}]
          },{"nodeName":"option","attributes":[["value","1"],[":tagvar5:"]],
            "children":[{"nodeName":"text","textContent":"tag 1"}]
          },{"nodeName":"option","attributes":[["value","2"],[":tagvar6:"]],
            "children":[{"nodeName":"text","textContent":"tag 2"}]
          },{"nodeName":"option","attributes":[["value","3"],[":tagvar7:"]],
            "children":[{"nodeName":"text","textContent":"tag 3"}]
          }
        ]
      },{
        "nodeName":"div","attributes":[["id","switch-tests-wrap"],["style","display:flex;flex-wrap:wrap;gap:1em;"]],
        "children":[
          {"nodeName":"text","textContent":":tagvar8:"},
          {
            "nodeName":"div","attributes":[["id","arraySwitching-test-wrap"],["style","border:1px solid red;flex-grow:1"]],
            "children":[{
              "nodeName":"h3","attributes":[],
              "children":[{"nodeName":"text","textContent":"Test 4 - arraySwitching"}]
            },{
              "nodeName":"div","attributes":[["id","arraySwitching-wrap"]],
              "children":[{"nodeName":"text","textContent":":tagvar9:"}]
            }]
          }
        ]
      },{
        "nodeName":"text","textContent":":tagvar10:"
      }],[{
        "nodeName":"div","attributes":[["id","ternaryPropTest-wrap"]],
        "children":[
          {"nodeName":"text","textContent":":tagvar0:"},
          {"nodeName":"text","textContent":":"},
          {"nodeName":"text","textContent":":tagvar1:"}
        ]
      }],[{
        "nodeName":"div","attributes":[["id","tag1"],["style","border:1px solid orange;"]],
        "children":[{
          "nodeName":"div","attributes":[["id","tagSwitch-1-hello"]],
          "children":[
            {"nodeName":"text","textContent":"Hello 1 "},
            {"nodeName":"text","textContent":":tagvar0:"},
            {"nodeName":"text","textContent":" World"}
          ]
        },{
          "nodeName":"button","attributes":[["onclick",":tagvar1:"]],
          "children":[
            {"nodeName":"text","textContent":"increase "},
            {"nodeName":"text","textContent":":tagvar2:"}
          ]
        },{
          "nodeName":"text","textContent":":tagvar3:"
        }]
      }],[{
        "nodeName":"div","attributes":[["id","tag2"],["style","border:1px solid orange;"]],
        "children":[{
          "nodeName":"div","attributes":[["id","tagSwitch-2-hello"]],
          "children":[
            {"nodeName":"text","textContent":"Hello 2 "},
            {"nodeName":"text","textContent":":tagvar0:"},
            {"nodeName":"text","textContent":" World"}
          ]
        },{
          "nodeName":"button","attributes":[["onclick",":tagvar1:"]],
          "children":[
            {"nodeName":"text","textContent":"increase "},
            {"nodeName":"text","textContent":":tagvar2:"}
          ]
        },{
          "nodeName":"text","textContent":":tagvar3:"
        }]
      }],[{
        "nodeName":"div","attributes":[["id","tag3"],["style","border:1px solid orange;"]],
        "children":[{
          "nodeName":"div","attributes":[["id","tagSwitch-3-hello"]],
          "children":[
            {"nodeName":"text","textContent":"Hello 3 "},
            {"nodeName":"text","textContent":":tagvar0:"},
            {"nodeName":"text","textContent":" World"}
          ]
        },{
          "nodeName":"button","attributes":[["onclick",":tagvar1:"]],
          "children":[
            {"nodeName":"text","textContent":"increase "},
            {"nodeName":"text","textContent":":tagvar2:"}
          ]
        },{
          "nodeName":"text","textContent":":tagvar3:"
        }]
      }],[{
        "nodeName":"text","textContent":"its an undefined value"
      }],[{
        "nodeName":"text","textContent":"its a null value"
      }],[{
        "nodeName":"text","textContent":"space"
      }],[{
        "nodeName":"text","textContent":":tagvar0:"
      }],[{
        "nodeName":"text","textContent":":tagvar0:"
      }],[{
        "nodeName":"text","textContent":":tagvar0:"
      }],[{
        "nodeName":"text","textContent":":tagvar0:"
      }],[{
        "nodeName":"text","textContent":":tagvar0:"
      }],[{
        "nodeName":"text","textContent":"nothing to show for in arrays"
      }]
    ]

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
            "tagJsType": [
              "dom"
            ],
            "dom": [
              {
                "nodeName": "text",
                "textContent": ":tagvar0:"
              }
            ],
            "html": {},
            "arrayValue": "d"
          },
          {
            "values": [
              "tagevalue"
            ],
            "tagJsType": [
              "dom"
            ],
            "dom": [
              {
                "nodeName": "text",
                "textContent": ":tagvar0:"
              }
            ],
            "html": {},
            "arrayValue": "e"
          },
          {
            "values": [
              "tagfvalue"
            ],
            "tagJsType": [
              "dom"
            ],
            "dom": [
              {
                "nodeName": "text",
                "textContent": ":tagvar0:"
              }
            ],
            "html": {},
            "arrayValue": "f"
          }
        ]
      ],
      "tagJsType": [
        "dom"
      ],
      "dom": [
        {
          "nodeName": "text",
          "value": [
            {
              "values": [
                "tagdvalue"
              ],
              "tagJsType": [
                "dom"
              ],
              "dom": [
                {
                  "nodeName": "text",
                  "textContent": ":tagvar0:"
                }
              ],
              "html": {},
              "arrayValue": "d"
            },
            {
              "values": [
                "tagevalue"
              ],
              "tagJsType": [
                "dom"
              ],
              "dom": [
                {
                  "nodeName": "text",
                  "textContent": ":tagvar0:"
                }
              ],
              "html": {},
              "arrayValue": "e"
            },
            {
              "values": [
                "tagfvalue"
              ],
              "tagJsType": [
                "dom"
              ],
              "dom": [
                {
                  "nodeName": "text",
                  "textContent": ":tagvar0:"
                }
              ],
              "html": {},
              "arrayValue": "f"
            }
          ]
        }
      ],
      "html": {}
    })
  })
})

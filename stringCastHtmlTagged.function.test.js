

const code = function something(x) {
    if(x==1) return html`something ${Date.now()} first`;
    return html`something-start ${html`inner-start ${1 + 1} inner-end`} something-end`;
  }.toString()
  
  const result = stringCastHtmlTagged(code)
  const expected = 'function something(x) {\n' +
  '  if(x==1) return new Tag(allStrings[0], [Date.now()]);\n' +
  '  return new Tag(allStrings[1], [new Tag(allStrings[2], [1 + 1])]);\n' +
  '}\n' +
  '\n' +
  'const allStrings=[["something "," first"],["something-start "," something-end"],["inner-start "," inner-end"]]'
  
  if(result != expected) {
    throw new Error('did not properly parse')
  }
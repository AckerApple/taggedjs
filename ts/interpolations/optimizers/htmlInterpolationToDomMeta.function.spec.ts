import { htmlInterpolationToDomMeta } from './htmlInterpolationToDomMeta.function.js'

it('works', () => {
  // Example usage with an array of HTML fragments and dynamic values
  const fragments = [
      'lets start here<li class.completed=',
      ` data-testid="todo-item"><div class="view"><div style.display=`,
      '><input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=',
      ' onChange=',
      ' /><label data-testid="todo-item-label" onDoubleClick=',
      '>',
      'hello world',
      '</label></div></div></li>'
  ];
  
  const dynamicValues = [true, 1 === 1 ? 'none' : 'block', false, "console.debug('change')", "console.debug('doubleclick')", "👋 ", " that I love"];
  
  const parsedElements = htmlInterpolationToDomMeta(fragments, dynamicValues)
  // console.debug('parsedElements', JSON.stringify(parsedElements, null, 2))
  const string = JSON.stringify(parsedElements)
  expect(string).toBe(`[{"nodeName":"text","textContent":"lets start here"},{"nodeName":"li","attributes":[["class.completed",true],["data-testid","todo-item"]],"children":[{"nodeName":"div","attributes":[["class","view"]],"children":[{"nodeName":"div","attributes":[["style.display","none"]],"children":[{"nodeName":"input","attributes":[["class","toggle"],["type","checkbox"],["data-testid","todo-item-toggle"],["checked",false],["onChange","console.debug('change')"]]},{"nodeName":"label","attributes":[["data-testid","todo-item-label"],["onDoubleClick","console.debug('doubleclick')"]],"children":[{"nodeName":"text","textContent":"👋 "},{"nodeName":"text","textContent":"hello world"},{"nodeName":"text","textContent":" that I love"}]}]}]}]}]`)
})

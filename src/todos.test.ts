import { click, clickOne, focus, keydownOn, query } from "./testing/elmSelectors"
import { describe, expect, it } from "./testing/expect"
import { sleep } from "./testing/expect.html"

describe('todos', function todos() {
  const todoInput = query('.new-todo')[0] as HTMLInputElement

  it('todos add one remove one', async function addOneRemoveOne() {
    expect(query('button.destroy').length).toBe(0)

    click('#todo-view-all-link')
    await sleep(1) // window route change takes a tick

    expect(query('button.destroy').length).toBe(0)
    expect(todoInput).toBeDefined()
    
    todoInput.value = 'one'
    keydownOn(todoInput, 'Enter')
    expect(query('button.destroy').length).toBe(1, 'expected one new todo')

    // delete it
    click('button.destroy')
    expect(query('button.destroy').length).toBe(0)
  })  
  
  it('todos basic', async function basic() {
    // click('#todo-view-all-link')
    window.location.hash = '#/'
    await sleep(1) // window route change takes a tick
    expect(query('button.destroy').length).toBe(0)

    todoInput.value = 'one'
    keydownOn(todoInput, 'Enter')
    
    // checkbox toggle
    click('input.toggle')

    // delete it
    click('button.destroy')

    expect(query('button.destroy').length).toBe(0, 'expected todo 0 deleted')

    todoInput.value = 'one'
    keydownOn(todoInput, 'Enter')

    todoInput.value = 'two'
    keydownOn(todoInput, 'Enter')

    const todoToggle2 = query('input.toggle')[1] as HTMLInputElement
    todoToggle2.click()
    expect(todoToggle2.checked).toBe(true)

    todoInput.value = 'three'
    keydownOn(todoInput, 'Enter')
    
    expect(query('input.toggle').length).toBe(3)

    click('#todo-view-active-link')
    expect(query('input.toggle').length).toBe(3, 'active todo count before page change')
    expect(window.location.hash).toBe('#/active')
    await sleep(1) // window route change takes a tick
    expect(query('input.toggle').length).toBe(2, 'active todo count after page change')
    
    click('#todo-view-completed-link')
    await sleep(1) // window route change takes a tick
    expect(query('input.toggle').length).toBe(1, 'completed todo count')
    
    click('#todo-view-all-link')
    await sleep(1) // window route change takes a tick
    expect(query('input.toggle').length).toBe(3, 'view all todo count')

    // delete 0
    clickOne('button.destroy')
    expect(query('input.toggle').length).toBe(2)

    // delete 0
    clickOne('button.destroy')
    expect(query('input.toggle').length).toBe(1)

    // delete 0
    clickOne('button.destroy')
    expect(query('input.toggle').length).toBe(0)
  })

  it('todos editing', function editing() {
    // create todo
    todoInput.value = 'one'
    keydownOn(todoInput, 'Enter')
    expect(query('input#edit-todo-input').length).toBe(0)
    
    // prepare to make new todo become editable
    let event = new MouseEvent('dblclick', {
      bubbles: true,       // Event will bubble up through the DOM
      cancelable: true,    // Event can be cancelled
      view: window         // Default view (window)
    });

    // Dispatch the event on the specified element
    query('label[data-testid="todo-item-label"]')[0].dispatchEvent(event)
    
    // should have two inputs, the main and the edit
    expect(query('input.new-todo').length).toBe(1)
    expect(query('input#edit-todo-input').length).toBe(1)

    focus('input#edit-todo-input')

    const editInput = query('input#edit-todo-input')[0] as any
    editInput.value = 'two'
    keydownOn(editInput, 'Enter')

    expect(query('button.destroy').length).toBe(1, 'expected only one delete button')

    // main input + array input
    expect(query('input.new-todo').length).toBe(1)
    expect(query('input#edit-todo-input').length).toBe(0) // enter key already hid it
    // blur('input#edit-todo-input')
    // expect(query('input#edit-todo-input').length).toBe(0)

    // delete 0
    clickOne('button.destroy')
    expect(query('input#edit-todo-input').length).toBe(0)
  })

  it('⌚️ todos speedometer', runTodoSpeedometer)
})

function runTodoSpeedometer() {
  const numberOfItemsToAdd = 500
  console.time('☀️-speedometer-all')

  console.time('🆕 speedometer-adding')
  const newTodo = document.querySelector(".new-todo") as any
  for (let i = 0; i < numberOfItemsToAdd; i++) {
      newTodo.value = 'aaa - ' + i;
      
      // Dispatch the event on the child element
      keydownOn(newTodo, 'Enter')
  }
  console.timeEnd('🆕 speedometer-adding')

  console.time('✏️ speedometer-editing')
  const checkboxes = document.querySelectorAll(".toggle") as any
  for (let i = 0; i < numberOfItemsToAdd; i++)
      checkboxes[i].click();
  console.timeEnd('✏️ speedometer-editing')

  console.time('🗑️ speedometer-deleting')
  const deleteButtons = document.querySelectorAll(".destroy") as any
  for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
      deleteButtons[i].click();
  console.timeEnd('🗑️ speedometer-deleting')

  console.timeEnd('☀️-speedometer-all')
}

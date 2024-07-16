import { byId, click, clickOne, focus, query } from "./elmSelectors"
import { describe, expect, it } from "./expect"

describe('todos', () => {
  const todoInput = byId('todo-input') as HTMLInputElement

  it('add one remove one', async () => {
    expect(query('button[data-testid="todo-item-button"]').length).toBe(0)
    
    todoInput.value = 'one'
    ;(todoInput as any).onkeyup({key:'Enter', target: todoInput})
    expect(query('button[data-testid="todo-item-button"]').length).toBe(1, 'expected one new todo')

    // delete it
    await click('button[data-testid="todo-item-button"]')
    expect(query('button[data-testid="todo-item-button"]').length).toBe(0)
  })  
  
  it('basic', async () => {
    todoInput.value = 'one'
    ;(todoInput as any).onkeyup({key:'Enter', target: todoInput})
    
    // checkbox toggle
    click('input[data-testid="todo-item-toggle"]')

    // delete it
    await click('button[data-testid="todo-item-button"]')

    expect(query('button[data-testid="todo-item-button"]').length).toBe(0, 'expected todo 0 deleted')

    todoInput.value = 'one'
    ;(todoInput as any).onkeyup({key:'Enter', target: todoInput})

    todoInput.value = 'two'
    ;(todoInput as any).onkeyup({key:'Enter', target: todoInput})
    const todoToggle2 = query('input[data-testid="todo-item-toggle"]')[1] as HTMLInputElement
    await todoToggle2.click()
    expect(todoToggle2.checked).toBe(true)

    todoInput.value = 'three'
    ;(todoInput as any).onkeyup({key:'Enter', target: todoInput})
    
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(3)

    // delete 0
    await clickOne('button[data-testid="todo-item-button"]')
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(2)

    // delete 0
    await clickOne('button[data-testid="todo-item-button"]')
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(1)

    // delete 0
    await clickOne('button[data-testid="todo-item-button"]')
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(0)
  })

  it('editing', async () => {
    // create todo
    todoInput.value = 'one'
    ;(todoInput as any).onkeyup({key:'Enter', target: todoInput})
    
    // prepare to make new todo become editable
    let event = new MouseEvent('dblclick', {
      bubbles: true,       // Event will bubble up through the DOM
      cancelable: true,    // Event can be cancelled
      view: window         // Default view (window)
    });

    // Dispatch the event on the specified element
    query('label[data-testid="todo-item-label"]')[0].dispatchEvent(event)
    const parentNode = query('button[data-testid="todo-item-button"]')[0].parentNode as HTMLElement
    expect(parentNode.style.display).toBe('none', 'expect the delete button hidden')
    
    // should have two inputs, the main and the edit
    expect(query('input[data-testid="text-input"]').length).toBe(2)

    focus('input[data-testid="text-input"]')

    const editInput = query('input[data-testid="text-input"]')[1] as any
    editInput.value = 'two'
    editInput.onkeyup({key:'Enter', target: editInput}) // cause save

    // expect one delete button
    expect(query('button[data-testid="todo-item-button"]').length).toBe(1)

    // main input + array input
    expect(query('input[data-testid="text-input"]').length).toBe(2)

    // delete 0
    await clickOne('button[data-testid="todo-item-button"]')
    expect(query('label[data-testid="todo-item-label"]').length).toBe(0)
  })
})

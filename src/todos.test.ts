import { byId, click, clickOne, focus, query } from "./elmSelectors"
import { describe, expect, it } from "./expect"

describe('todos', () => {
  const todoInput = byId('todo-input') as HTMLInputElement

  it('add one remove one', () => {
    expect(query('button[data-testid="todo-item-button"]').length).toBe(0)
    
    todoInput.value = 'one'
    ;(todoInput as any).onkeydown({key:'Enter', target: todoInput})
    expect(query('button[data-testid="todo-item-button"]').length).toBe(1)

    // delete it
    click('button[data-testid="todo-item-button"]')
    expect(query('button[data-testid="todo-item-button"]').length).toBe(0)
  })  
  
  it('basic', () => {
    todoInput.value = 'one'
    ;(todoInput as any).onkeydown({key:'Enter', target: todoInput})
    // checkbox toggle
    click('input[data-testid="todo-item-toggle"]')

    // delete it
    click('button[data-testid="todo-item-button"]')
    expect(query('button[data-testid="todo-item-button"]').length).toBe(0)

    todoInput.value = 'one'
    ;(todoInput as any).onkeydown({key:'Enter', target: todoInput})

    todoInput.value = 'two'
    ;(todoInput as any).onkeydown({key:'Enter', target: todoInput})
    const todoToggle2 = query('input[data-testid="todo-item-toggle"]')[1] as HTMLInputElement
    todoToggle2.click()
    expect(todoToggle2.checked).toBe(true)

    todoInput.value = 'three'
    ;(todoInput as any).onkeydown({key:'Enter', target: todoInput})
    
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(3)

    // delete 0
    clickOne('button[data-testid="todo-item-button"]')
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(2)

    // delete 0
    clickOne('button[data-testid="todo-item-button"]')
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(1)

    // delete 0
    clickOne('button[data-testid="todo-item-button"]')
    expect(query('input[data-testid="todo-item-toggle"]').length).toBe(0)
  })

  it('editing', () => {
    // create todo
    todoInput.value = 'one'
    ;(todoInput as any).onkeydown({key:'Enter', target: todoInput})
    
    // prepare to make new todo become editable
    let event = new MouseEvent('dblclick', {
      bubbles: true,       // Event will bubble up through the DOM
      cancelable: true,    // Event can be cancelled
      view: window         // Default view (window)
    });

    // Dispatch the event on the specified element
    query('label[data-testid="todo-item-label"]')[0].dispatchEvent(event);
    focus('input[data-testid="text-input"]')

    const editInput = query('input[data-testid="text-input"]')[1] as any
    editInput.value = 'two'
    editInput.onkeydown({key:'Enter', target: editInput}) // cause save

    expect(query('input[data-testid="text-input"]').length).toBe(1)

    // delete 0
    clickOne('button[data-testid="todo-item-button"]')
    expect(query('label[data-testid="todo-item-label"]').length).toBe(0)
  })
})

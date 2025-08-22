import { tag, html, state } from "taggedjs"
import { injectionWrap } from "./hostTests/injectionWrap.host"
import { injectionTarget } from "./hostTests/injectionTarget.host"

export const injectionTag = tag(() => {
  const items = state(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => ({id})))
  const selectedTest = state([] as {id: number}[])
  
  const wrapHost = injectionWrap(
    selectedTest,
    (newSelected) => {
      selectedTest.length = 0
      selectedTest.push( ...newSelected )
    }
  )

  return html`
    <div style="padding: 20px;">
      <h2>Injection Test</h2>
      selected: ${selectedTest.length}
      <div id="injection-testing-wrap-host"
        ${wrapHost}
        style="
          border: 2px solid #666;
          gap:1em;
          background: #f0f0f0;
          padding: 20px;
          min-height: 300px;
          position: relative;
          user-select: none;
          display:flex;flex-wrap:wrap;
        "
      >
        ${items.map(x => html`
          <div id=${`injection-test-item-${x.id}`}
            ${injectionTarget(x)}
            style="
              display: inline-block;
              color: black;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              cursor: pointer;
              transition: background 0.3s;
              "
              style.background = ${selectedTest.includes(x) ? '#4CAF50' : '#2196F3'};
              style.border = ${selectedTest.includes(x) ? '3px solid #333' : '1px solid #999'};
          >
            <input type="checkbox" ${{checked: selectedTest.includes(x) ? true : false}} />
            Item ${x.id}
          </div>
        `)}
      </div>
      
      <div style="margin-top: 20px; padding: 10px; background: #333; color: white;">
        <h3>Selected Items:</h3>
        <p>
          ${selectedTest.length > 0 
            ? selectedTest.map(x => x.id).join(', ') 
            : 'No items selected. Click to select items.'}
        </p>
      </div>
      
      <div style="margin-top: 10px; color: #666;">
        <small>
          <strong>Instructions:</strong><br/>
          - Click to select/deselect items<br/>
          - Click on empty space to deselect all<br/>
          - Selected items will be highlighted in green
        </small>
      </div>
    </div>
  `
})
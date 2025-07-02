import { html, states, tag } from "taggedjs";
export const attributeDebug = tag(() => {
    let selected = 'a';
    let isOrange = true;
    states(get => [{ selected, isOrange }] = get({ selected, isOrange }));
    return html `
    <input
      id="attr-input-abc"
      placeholder="a b or c"
      onchange=${(event) => selected = event.target.value}
    />
    <select id="select-sample-drop-down">
      ${['a', 'b', 'c'].map(item => html `
        <option value=${item} ${item == selected ? 'selected' : ''}>${item} - ${item == selected ? 'true' : 'false'}</option>
      `.key(item))}
    </select>
    <hr />
    <h3>Special Attributes</h3>
    <div>
      <input type="checkbox" id="toggle-backgrounds"
        onchange=${(event) => isOrange = event.target.checked} ${isOrange && 'checked'}
      /> - ${isOrange ? 'true' : 'false'}
    </div>
    <div style="display: flex;flex-wrap:wrap;gap:1em">      
      <ol>
        <li>
          <div id="attr-style-strings"
            style.background-color=${isOrange ? 'orange' : ''}
            style.color=${isOrange ? 'black' : ''}
          >style.background-color=&dollar;{'orange'}</div>
        </li>
        
        <li>
          <div id="attr-class-booleans"
            class.background-orange=${isOrange ? true : false}
            class.text-black=${isOrange ? true : false}
          >class.background-orange=&dollar;{true}</div>
        </li>
        
        <li>        
          <div id="attr-inline-class"
            class=${isOrange ? 'background-orange text-black' : ''}
          >class=&dollar;{'background-orange text-black'}</div>
        </li>
        
        <li>
          <div id="attr-dynamic-inline-class"
            ${{ class: 'text-white' + (isOrange ? ' background-orange' : '') }}
          >class=&dollar;{'background-orange'} but always white</div>
        </li>
      </ol>
    </div>
			
    <style>
      .background-orange {background-color:orange}
      .text-black {color:black}
      .text-white {color:white}
    </style>
  `;
});
//# sourceMappingURL=attributeDebug.tag.js.map
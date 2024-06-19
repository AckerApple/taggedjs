import { html, tag } from "taggedjs";

export const arrayFunTag = tag((item, deleteItem) => html`
  <div style="border:1px solid black;">
    ${item}<button type="button" onclick=${() => deleteItem(item)}>delete</button>
  </div>
`)

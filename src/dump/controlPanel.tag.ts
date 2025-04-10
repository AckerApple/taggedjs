import { html, tag } from "taggedjs"
import { FormatChange } from "./index"
import { copyText } from "./copyText.function"

export const controlPanel = tag(({
  value, format, showAll, formatChange, showAllChange,
}: {
  value: any
  format: string
  showAll?: boolean
  showAllChange: (x: boolean) => unknown
  formatChange: FormatChange
}) => {
  return html`
    <style>
      dialog.dump-dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.7); /* Set a semi-transparent black background */
      }

      .child-margin-xxs {margin:0.2em;}
      
      .taggedjs-dump .hover-bg-warning:hover {background-color:#fcf8e3}
      .taggedjs-dump .hover-bg-balanced:hover {background-color:#33cd5f}
      .taggedjs-dump .active-bg-energized:active {background-color:#ffc900}
      .taggedjs-dump .bg-dark {background-color:#444444}
      .taggedjs-dump .bg-balanced {background-color:#33cd5f}
    </style>
    <div style="width: 100%;line-height: 90%;">
      <div style="position:relative;">
        <div style="display:flex;font-size:50%;position:absolute;top:-18px;right:-6px">
          ${!format || format==='flex' && html`
            <a
              style=${
                "margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;" +
                (showAll ? 'background-color:#33cd5f;' : 'background-color:#444444')
              }
              class="hover-bg-balanced"
              onclick=${() => showAllChange(showAll = !showAll)}
              title="hide/show all sub objects"
            >👁</a>
          `}
          <a
            style=${
              "margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;" +
              (!format || format==='flex' ? 'background-color:#33cd5f;' : 'background-color:#444444')
            }
            class="hover-bg-balanced"
            onclick=${() => formatChange(format='flex')}
          >flex</a>
          <a style=${
            "margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;" +
            (format==='json' ? 'background-color:#33cd5f;' : 'background-color:#444444')
            }
            class="hover-bg-balanced"
            onclick=${() => formatChange(format='json')}
          >json</a>
          <a style="margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;"
            class="bg-dark hover-bg-balanced active-bg-energized"
            onclick=${() => copyAsJsonText(value)}
          >copy</a>
        </div>
      </div>
    </div>
  `
})

function copyAsJsonText(value: any) {
  const text = JSON.stringify(value, null, 2)
  copyText( text )
}

import { html, tag } from "taggedjs";
import { copyText } from "./copyText.function";
export const controlPanel = tag(({ value, format, showAll, formatChange, showAllChange, }) => {
    return html `
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
      
      .taggedjs-dump .taggedjs-object {margin:0.2em;padding:0.2em;overflow:auto;display:flex;flex-wrap:wrap;}
      .taggedjs-dump .taggedjs-object-label {
        padding:0.2em;display:flex;justify-content:space-between;font-size:65%;color:white;
        border-color:white;flex-grow:1;
        background-color:#387ef5;
      }

      .taggedjs-dump .taggedjs-simple-label {
        border-bottom-width:1px;border-bottom-style:solid;border-color:black;font-size:65%;border-color:white;line-height: 95%;font-weight:bold;
      }

      .taggedjs-dump .taggedjs-object-body-wrap {
        display:flex;flex-wrap:wrap
      }

      .taggedjs-dump .taggedjs-object-wrap {
        font-size:90%;color:#111111;background-color:#d9edf7;border:1px solid black;border-radius:5px;flex-direction: column;display:flex;
      }
      
      .taggedjs-dump .taggedjs-array-label {
        padding:0.2em;display:flex;justify-content:space-between;flex-grow:1;font-size:65%;border-color:white;color:white;background-color:#ef473a;
      }

      .taggedjs-dump .taggedjs-array-body {
        text-align:left;display:flex;flex-wrap:wrap;margin:0.2em;gap:0.2em
      }
      
      .taggedjs-dump .taggedjs-array-wrap {
        color:#111111;background-color:#f2dede;border:1px solid black;border-radius:5px;flex-direction: column;display:flex
      }
    </style>
    <div style="width: 100%;line-height: 90%;">
      <div style="position:relative;">
        <div style="display:flex;font-size:50%;position:absolute;top:-18px;right:-6px">
          ${!format || format === 'flex' && html `
            <a
              style=${"margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;" +
        (showAll ? 'background-color:#33cd5f;' : 'background-color:#444444')}
              class="hover-bg-balanced"
              onclick=${() => showAllChange(showAll = !showAll)}
              title="hide/show all sub objects"
            >👁</a>
          `}
          <a
            style=${"margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;" +
        (!format || format === 'flex' ? 'background-color:#33cd5f;' : 'background-color:#444444')}
            class="hover-bg-balanced"
            onclick=${() => formatChange(format = 'flex')}
          >flex</a>
          <a style=${"margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;" +
        (format === 'json' ? 'background-color:#33cd5f;' : 'background-color:#444444')}
            class="hover-bg-balanced"
            onclick=${() => formatChange(format = 'json')}
          >json</a>
          <a style="margin:1px;border-radius:5px;color:white;align-items:center;display:flex;padding-left:0.2em;padding-right:0.2em;"
            class="bg-dark hover-bg-balanced active-bg-energized"
            onclick=${() => copyAsJsonText(value)}
          >copy</a>
        </div>
      </div>
    </div>
  `;
});
function copyAsJsonText(value) {
    const text = JSON.stringify(value, null, 2);
    copyText(text);
}
//# sourceMappingURL=controlPanel.tag.js.map
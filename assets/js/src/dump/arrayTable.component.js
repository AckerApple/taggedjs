import { html, tag } from "taggedjs";
import { dump } from "./index";
export const arrayTable = tag(({ array, 
// showLevels,
showAll, showKids, toggleColumnDialog, columnNames, formatChange, allowMaximize, everySimpleValue, }) => {
    return html `<!-- array table -->
    <!-- overflow-y: scroll; -->
    <div style="max-height: 800px;max-width:100vw;overflow: scroll;">
      <table cellPadding="2" cellSpacing="2" border="0">
        ${array.length && html `
          <thead style="position: sticky;top: 0;font-size: 0.8em;">
            <tr>
              ${columnNames.map(key => html `
                <th
                  style.cursor=${toggleColumnDialog && 'pointer'}
                  onclick=${toggleColumnDialog}
                >${key}</th>
              `.key(key))}
            </tr>
          </thead>
        `}
        <tbody>
          ${array.map(row => html `
            <tr>
              ${columnNames.map(name => html `
                <td>
                  ${dump({
        value: row[name],
        showLevels: 0,
        showAll,
        showKids: showAll || showKids,
        isRootDump: false,
        formatChange,
        allowMaximize,
    })}
                </td>
              `.key(row[name]))}
            </tr>
          `.key(row))}
        </tbody>
      </table>
    </div>
  `;
});
//# sourceMappingURL=arrayTable.component.js.map
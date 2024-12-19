import { html, Subject, tag } from "taggedjs"
import { oneRender } from "./oneRender.tag"
import { storage, ViewTypes } from "./sectionSelector.tag"
import funInPropsTag from "./funInProps.tag"
import { todoApp } from "./todo/todos.app"
import { child } from "./childTests"
import { destroys } from "./destroys.tag"
import { arrays } from "./arrayTests"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { mirroring } from "./mirroring.tag"
import { propsDebugMain } from "./PropsDebug.tag"
import { providerDebug } from "./providerDebug"
import { counters } from "./countersDebug"
import { tableDebug } from "./tableDebug.component"
import { content } from "./ContentDebug.component"
import { watchTesting } from "./watchTesting.tag"
import { attributeDebug } from "./attributeDebug.tag"

export function renderedSections(
  appCounterSubject: Subject<number>,
  viewTypes: ViewTypes[] = storage.views,
) {
  const outputSections = [] as {
    view: ViewTypes
    title: string
    output: any
    emoji?: string
  }[]

  [{
    view: ViewTypes.OneRender, tag: oneRender,
  },{
    view: ViewTypes.Props, tag: propsDebugMain, emoji:'🧳',
  },{
    view: ViewTypes.WatchTesting, tag: watchTesting, emoji:'⌚️',
  },{
    view: ViewTypes.TableDebug, tag: tableDebug,
  },{
    view: ViewTypes.ProviderDebug, tag: providerDebug,
  },{
    view: ViewTypes.TagSwitchDebug, tag: tagSwitchDebug, emoji:'🔀',
  },{
    view: ViewTypes.Mirroring, tag: mirroring, emoji:'🪞',
  },{
    view: ViewTypes.Arrays, tag: arrays, emoji:'⠇',
  },{
    view: ViewTypes.Content, tag: content, emoji:'📰',
  },{
    view: ViewTypes.Child, tag: child, emoji:'👶',
  },{
    view: ViewTypes.Destroys, tag: destroys, emoji:'🗑️',
  },{
    view: ViewTypes.FunInPropsTag, tag: funInPropsTag,
  },{
    view: ViewTypes.AttributeDebug, tag: attributeDebug, emoji:'🏹',
  },{
    view: ViewTypes.Todo, tag: tag(todoApp),
  }/*,{
    view: ViewTypes.Counters, tag: counters, emoji:'🔀',
  }*/].forEach(({emoji, view, tag}) => {
    if(viewTypes.includes(view)) {
      outputSections.push({
        title: view,
        output: tag(),
        view, emoji,
      })
    }
  })


  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${outputSections.map(({emoji, view, title, output}) => html`
        <div style="flex:2 2 20em">
          <a id=${view}><!-- ⚓️ --></a>

          <fieldset>
            <legend>${emoji} ${title}</legend>
            ${output}
          </fieldset>
          <div style="font-size:0.6em;text-align:right;">
            <a href="#top">⏫</a>
          </div>
        </div>
      `.key(view))}

      ${viewTypes.includes(ViewTypes.Counters) && html`
        <div style="flex:2 2 20em">
          <a id=${ViewTypes.Counters}>${ViewTypes.Counters}</a>
          <fieldset>
            <legend>💯 counters</legend>
            ${counters({appCounterSubject})}
          </fieldset>
          <div style="font-size:0.6em;text-align:right;">
            <a href="#top">⏫</a>
          </div>
        </div>
      `}
    </div>
  `
}

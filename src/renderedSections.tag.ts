import { html, Subject } from "taggedjs"
import { oneRender } from "./oneRender.tag"
import { storage, ViewTypes } from "./sections.tag"
import funInPropsTag from "./funInProps.tag"
import { todoApp } from "./todo/todos.app"
import { childTests } from "./childTests"
import { arrayTests } from "./arrayTests"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { mirroring } from "./mirroring.tag"
import { propsDebugMain } from "./PropsDebug.tag"
import { providerDebugBase } from "./providerDebug"
import { counters } from "./countersDebug"
import { tableDebug } from "./tableDebug.component"
import { contentDebug } from "./ContentDebug.component"
import { watchTesting } from "./watchTesting.tag"

export function renderedSections(
  appCounterSubject: Subject<number>,
) {
  const outputSections = [{
    title: 'oneRender',
    output: oneRender(),
    view: ViewTypes.OneRender,
  }]
  
  return html`
    ${outputSections.map(({view, title, output}) => storage.views.includes(view) && html`
      <fieldset style="flex:2 2 20em">
        <legend>${title}</legend>
        ${output}
      </fieldset>
    `)}

    ${storage.views.includes(ViewTypes.Props) && html`
      <fieldset style="flex:2 2 20em">
        <legend>propsDebugMain</legend>
        ${propsDebugMain()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.WatchTesting) && html`
      <fieldset style="flex:2 2 20em">
        <legend>watchTesting</legend>
        ${watchTesting()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.TableDebug) && html`
      <fieldset style="flex:2 2 20em">
        <legend>tableDebug</legend>
        ${tableDebug()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.ProviderDebug) && html`
      <fieldset style="flex:2 2 20em">
        <legend>providerDebugBase</legend>
        ${providerDebugBase(undefined)}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.TagSwitchDebug) && html`
      <fieldset style="flex:2 2 20em">
        <legend>tagSwitchDebug</legend>
        ${tagSwitchDebug(undefined)}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.Mirroring) && html`
      <fieldset style="flex:2 2 20em">
        <legend>mirroring</legend>
        ${mirroring()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.Arrays) && html`
      <fieldset style="flex:2 2 20em">
        <legend>arrays</legend>
        ${arrayTests()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.Counters) && html`
      <fieldset style="flex:2 2 20em">
        <legend>counters</legend>
        ${counters({appCounterSubject})}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.Content) && html`
      <fieldset style="flex:2 2 20em">
        <legend>content</legend>
        ${contentDebug()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.Child) && html`
      <fieldset style="flex:2 2 20em">
        <legend>Children Tests</legend>
        ${childTests(undefined)}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.FunInPropsTag) && html`
      <fieldset style="flex:2 2 20em">
        <legend>funInPropsTag</legend>
        ${funInPropsTag()}
      </fieldset>
    `}

    ${storage.views.includes(ViewTypes.Todo) && html`
      <fieldset style="flex:2 2 20em">
        <legend>todo</legend>
        ${todoApp()}
      </fieldset>
    `}

    ${/*
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ template.string }</textarea>
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
      */ false
    }
  `
}

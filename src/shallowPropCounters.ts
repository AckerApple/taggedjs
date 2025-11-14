import { tag, div, button, span, output } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export const shallowPropCounters = tag(({
  propCounter, increasePropCounter,
}: {
  propCounter: number;
  increasePropCounter: () => void;
}) => {
  let otherCounter = 0
  let renderCount = 0
  
  shallowPropCounters.updates(x => [{propCounter, increasePropCounter}] = x)
  increasePropCounter = output(increasePropCounter)

  ++renderCount; // for debugging

  return div(
    div({style: "display:flex;flex-wrap:wrap;gap:1em;"},
      div({style: "border:1px dashed black;padding:1em;"},
        button(
          {id: "❤️💧-shallow-counter", onClick: increasePropCounter},
          '❤️💧 propCounter:',
          _=> propCounter
        ),
        span(
          '❤️💧 ',
          span({id: "❤️💧-shallow-display"}, _=> propCounter)
        )
      ),

      div({style: "border:1px dashed black;padding:1em;"},
        button(
          {id: "💧-shallow-counter", onClick: () => ++otherCounter},
          '💧 otherCounter:',
          _=> otherCounter
        ),
        span(
          '💧 ',
          span({id: "💧-shallow-display"}, _=> otherCounter)
        )
      )
    ),

    div('renderCount:', _=> renderCount),
    _=> renderCountDiv({ renderCount, name: 'shallow_counters' })
  );
});

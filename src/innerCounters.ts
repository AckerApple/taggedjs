import { tag, div, host, span, button, output } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export const innerCounters = tag(({
  propCounter, increasePropCounter,
}: {
  propCounter: number;
  increasePropCounter: () => void;
}) => {
  let otherCounter = 0;
  let renderCount = 0;
  let elmInitCount = 0;

  ++renderCount; // for debugging

  innerCounters.updates(x => {
    ;[{ propCounter, increasePropCounter }] = x;
    increasePropCounter = output(increasePropCounter)
  });

  increasePropCounter = output(increasePropCounter)

  return div(
    div
      .attr(host.onInit(() => {
          return ++elmInitCount;
        }) as any
      )
      .style`display:flex;flex-wrap:wrap;gap:1em;`(
      div.style`border:1px dashed black;padding:1em;`(
        '🔥 elmInitCount:',
        span.id`🔥-init-counter`(_ => {
          return elmInitCount;
        })
      ),

      div.style`border:1px dashed black;padding:1em;`(
        button.id`❤️-inner-counter`.onClick(increasePropCounter)('❤️-inner-counter propCounter:', _ => {
          return propCounter;
        }),
        span(
          '❤️ ',
          span.id`❤️-inner-display`(_ => propCounter)
        )
      ),

      div.style`border:1px dashed black;padding:1em;`(
        button.id`🤿-deep-counter`.onClick(() => ++otherCounter)('🤿 otherCounter:', _ => otherCounter),
        span(
          '🤿 ',
          span.id`🤿-deep-display`(_ => otherCounter)
        )
      )
    ),
    div('renderCount:', _ => renderCount),
    _ => renderCountDiv({ renderCount, name: 'inner_counters' })
  );
});

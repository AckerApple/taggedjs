import { renderCountDiv } from './renderCount.component.js';
import { html, letState, tag } from 'taggedjs';
export const arrayScoreData = tag(({ score, playerIndex }) => {
    let renderCount = letState(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return html `
    frame:${score.frame}:
    <button
      id=${`score-data-${playerIndex}-${score.frame}-inside-button`}
      onclick=${() => ++score.score}
    >inner score button ++${score.score}</button>
    <span id=${`score-data-${playerIndex}-${score.frame}-inside-display`}
    >${score.score}</span>
    <button onclick=${() => ++renderCount}>increase renderCount</button>
    ${renderCountDiv({ renderCount, name: 'scoreData' + score.frame })}
  `;
});
//# sourceMappingURL=arrayScoreData.tag.js.map
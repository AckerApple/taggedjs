export interface ElementTargetEvent extends Event {
  target: HTMLElement
}

export interface InputElementTargetEvent extends Event {
  target: HTMLInputElement
}

export interface TagJsEvent extends InputElementTargetEvent {
  stagger: number // each number represents an item being animated
  staggerBy?: number // staggerBy * stagger = totalStagger
}

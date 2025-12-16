export interface ElementTargetEvent extends Event {
    target: HTMLElement;
}
export interface InputElementTargetEvent extends Event, KeyboardEvent {
    target: HTMLInputElement;
}

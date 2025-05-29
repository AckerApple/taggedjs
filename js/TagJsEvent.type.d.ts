export interface ElementTargetEvent extends Event {
    target: HTMLElement;
}
export interface InputElementTargetEvent extends Event {
    target: HTMLInputElement;
}
export interface TagJsEvent extends InputElementTargetEvent {
    stagger: number;
    staggerBy?: number;
}

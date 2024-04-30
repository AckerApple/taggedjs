type ElementEvent = {
    target: HTMLElement;
    stagger: number;
};
export declare function createFx({ fxIn, fxOut, staggerBy, }: {
    fxIn: string;
    fxOut: string;
    staggerBy?: number;
}): {
    in: (input: ElementEvent) => Promise<void>;
    out: (input: ElementEvent) => Promise<void>;
};
export declare function captureElementPosition(element: any): void;
export {};

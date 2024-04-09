import { Subject } from "./Subject.class"
import { OperatorFunction, PipeUtils, SubjectLike } from "./Subject.utils"


type WillCallback<T, R> = (lastValue: T, resolve: (result: R) => void) => void;

export function willCallback<T = any, R = any>(
  callback: WillCallback<T, R>,
): OperatorFunction<T, R, any> {
  return ((lastValue: any, utils: any) => {
    utils.setHandler(() => {
      return undefined as any;
    });

    callback(lastValue, utils.next);
  }) as any
}

/** .pipe( promise((x) => Promise.resolve(44)) ) */
export function willPromise<T, H>(
  callback: (
    lastValue: T,
  ) => Promise<H>
): OperatorFunction<T, H, any> {
  return ((lastValue: T, utils: any) => {
    utils.setHandler(() => {
      return undefined as any
    }) // do nothing on initial return

    const result = callback(lastValue) as Promise<any>

    result.then(x => utils.next(x))
  }) as any
}

/** .pipe( willSubscribe((x) => new ValueSubject(44)) ) */
export const willSubscribe = <T, H>(
  callback: (
    lastValue: T,
  ) => SubjectLike<H>
): OperatorFunction<T, H, any> => {
  return ((lastValue: T, utils: PipeUtils<H>) => {
    utils.setHandler(() => {
      return undefined as any
    }) // do nothing on initial return

    const result = callback(lastValue) as Subject<H>

    const subscription = result.subscribe(x => {
      subscription.unsubscribe()
      utils.next(x)
    })
  }) as any
}

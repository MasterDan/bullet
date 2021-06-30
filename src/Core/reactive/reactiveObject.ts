import { isFunction, isObject } from '@/core/tools/checkers';
import { Reactive } from './reactive';
export type SameKeysReactiveValues<T> = { [K in keyof T]: Reactive<T[K]>};

export class ReactiveObject<T> extends Reactive<SameKeysReactiveValues<T>> {

  constructor(value: T) {
    const valueToInsert = {} as SameKeysReactiveValues<T>;
    
    for (const key of Object.keys(value)) {
      const elem = value[key];
      if (isFunction(elem)) {
        throw new Error('Reactive Object should not contain functions');
      } else if (isObject(elem)) {
        valueToInsert[key] = new ReactiveObject(elem);
      } else {
        valueToInsert[key] = new Reactive(elem);
      }
    }
    super(valueToInsert);
  }
}

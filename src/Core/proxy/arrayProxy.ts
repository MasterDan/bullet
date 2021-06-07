import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Token } from '../reactive/token';

export type ReactiveArrayProxy<T> = Array<T> & ArrayWithListeners<T>;

export function makeArrayReactive<T>(arr: Array<T>): ReactiveArrayProxy<T> {
  return new Proxy(new ArrayWithListeners(arr), {
    set(tgt, prop, val) {
      if (prop in tgt._array) {
        tgt._listeners[prop].emit(val, tgt._array[prop]);
        tgt._array[prop] = val;
        tgt._change.emit(tgt._array);
        return true;
      } else {
        return (tgt[prop] = val);
      }
    },

    get(tgt, prop) {
      if (prop in tgt) {
        return tgt[prop];
      } else if (prop in tgt._array) {
        return tgt._array[prop];
      }
      return undefined;
    }
  }) as ReactiveArrayProxy<T>;
}

class ArrayWithListeners<T> {
  _listeners: Array<Emitter<T>>;
  _change: Emitter<Array<T>> = new Emitter<Array<T>>();
  constructor(public _array: Array<T>) {
    this._listeners = [];
    this._array.forEach(() => {
      this._listeners.push(new Emitter<T>());
    });
  }
  push(arg: T) {
    const emitter = new Emitter<T>();
    this._listeners.push(emitter);
    this._array.push(arg);
    this._change.emit(this._array);
  }
  subscribeElement(key: number, sub: Subscribtion<T>): Token<T> {
    const emitter = this._listeners[key];
    return emitter == null ? null : emitter.subscribe(sub);
  }
  subscribe(sub: Subscribtion<T[]>): Token<T[]> {
    return this._change.subscribe(sub);
  }
}

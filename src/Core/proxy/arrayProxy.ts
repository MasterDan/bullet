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
      } else if (typeof tgt._array[prop] === 'function') {
        return (...args: unknown[]): unknown => tgt._array[prop](...args);
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
  push(...items: T[]): number {
    this._listeners.push(...items.map(()=>new Emitter<T>()));
    const result = this._array.push(...items);
    this._change.emit(this._array);
    return result;
  }
  pop(): T {
    this._listeners.pop();
    return this._array.pop();
  }
  unshift(...items: T[]):number {
    this._listeners.unshift(...items.map(()=>new Emitter<T>()));
    const result =this._array.unshift(...items);
    this._change.emit(this._array);
    return result;
  }
  shift(): T {
    this._listeners.shift();
    return this._array.shift();
  }

  subscribeElement(key: number, sub: Subscribtion<T>): Token<T> {
    const emitter = this._listeners[key];
    return emitter == null ? null : emitter.subscribe(sub);
  }
  subscribe(sub: Subscribtion<T[]>): Token<T[]> {
    return this._change.subscribe(sub);
  }
}

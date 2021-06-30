import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Token } from '../reactive/token';
import { isArray, isFunction, isObject } from '../tools/checkers';
import { makeObjectReactive, ObjectWithListener } from './objectProxy';

export type ReactiveArrayProxy<T> = Array<T> & ArrayWithListeners<T>;

export function makeArrayReactive<T>(arr: Array<T>): ReactiveArrayProxy<T> {
  return new Proxy(new ArrayWithListeners(arr), {
    set(tgt, prop, val) {
      if (prop in tgt._array) {
        if (tgt._array[prop] instanceof ArrayWithListeners) {
          tgt._listeners[prop].emit(val, tgt._array[prop]);
          tgt._array[prop] = makeArrayReactive(val);
          tgt._change.emit(tgt._array);
          return true;
        } else if (tgt._array[prop] instanceof ObjectWithListener) {
          tgt._listeners[prop].emit(val, tgt._array[prop]);
          tgt._array[prop] = makeObjectReactive(val);
          tgt._change.emit(tgt._array);
          return true;
        } else {
          tgt._listeners[prop].emit(val, tgt._array[prop]);
          tgt._array[prop] = val;
          tgt._change.emit(tgt._array);
          return true;
        }
      } else {
        tgt[prop] = val;
        return true;
      }
    },
    get(tgt, prop) {
      if (prop in tgt) {
        return tgt[prop];
      } else if (isFunction(tgt._array[prop])) {
        return (...args: unknown[]): unknown => tgt._array[prop](...args);
      } else if (prop in tgt._array) {
        return tgt._array[prop];
      }
      return undefined;
    }
  }) as ReactiveArrayProxy<T>;
}
export class ArrayWithListeners<T> {
  _listeners: Array<Emitter<T>>;
  _change: Emitter<Array<T>> = new Emitter<Array<T>>();
  _array: Array<T>;
  constructor(array: Array<T>) {
    this._array = array.map((el) => {
      if (isObject(el)) {
        return makeObjectReactive(el);
      } else if (isArray(el)) {
        return makeArrayReactive(el);
      }
      return el;
    }) as Array<T>;
    this._listeners = [];
    this._array.forEach(() => {
      this._listeners.push(new Emitter<T>());
    });
  }
  push(...items: T[]): number {
    this._listeners.push(...items.map(() => new Emitter<T>()));
    const result = this._array.push(...items);
    this._change.emit(this._array);
    return result;
  }
  pop(): T {
    this._listeners.pop();
    return this._array.pop();
  }
  unshift(...items: T[]): number {
    this._listeners.unshift(...items.map(() => new Emitter<T>()));
    const result = this._array.unshift(...items);
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

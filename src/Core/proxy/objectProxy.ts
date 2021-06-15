import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Token } from '../reactive/token';
import { isArray, isObject } from '../tools/checkers';
import {
  ArrayWithListeners,
  makeArrayReactive,
  ReactiveArrayProxy
} from './arrayProxy';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReactiveObjectProxy<T extends object> = ObjectWithListener<T> & T;

// eslint-disable-next-line @typescript-eslint/ban-types
export function makeObjectReactive<T extends object>(
  o: T
): ReactiveObjectProxy<T> {
  const p = new Proxy(new ObjectWithListener(o), {
    set(target, prop, val): boolean {
      if (!(prop in target.data) || !(prop in target._emitters)) {
        return false;
      } else {
        if (target.data[prop] instanceof ArrayWithListeners) {
          target._emitters[prop].emit(
            val,
            (target.data[prop] as ReactiveArrayProxy<unknown>)._array
          );
          target.data[prop] = makeArrayReactive(val);
          return true;
        } else if (target.data[prop] instanceof ObjectWithListener) {
          target._emitters[prop].emit(
            val,
            (target.data[prop] as ReactiveObjectProxy<Record<string, unknown>>)
              .data
          );
          target.data[prop] = makeObjectReactive(val);
          return true;
        } else {
          target._emitters[prop].emit(val, target.data[prop]);
          target.data[prop] = val;
          return true;
        }
      }
    },
    get(target, prop) {
      if (prop in target.data) {
        return target.data[prop];
      }
      return target[prop];
    }
  });
  return p as ReactiveObjectProxy<T>;
}

type Emitters<T> = { [K in keyof T]: Emitter<T[K]> };

// eslint-disable-next-line @typescript-eslint/ban-types
export class ObjectWithListener<T extends object> {
  data: T;
  _emitters: Emitters<T>;
  constructor(data: T) {
    const wrappedData = {} as T;
    const emitters = {} as Emitters<T>;
    for (const key in data) {
      emitters[key] = new Emitter();
      const element = data[key];
      if (isObject(element)) {
        wrappedData[key] = makeObjectReactive(element);
      } else if (isArray(element)) {
        (wrappedData[key] as unknown) = makeArrayReactive(element) as unknown;
      } else {
        wrappedData[key] = element;
      }
    }
    this.data = wrappedData as T;
    this._emitters = emitters;
  }

  subscribe(key: keyof T, sub: Subscribtion<T[keyof T]>): Token<T[keyof T]> {
    if (key in this._emitters) {
      return this._emitters[key].subscribe(sub);
    } else {
      return null;
    }
  }
}

import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Token } from '../reactive/token';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReactiveObjectProxy<T extends object> = ObjectWithListener<T> & T;

// eslint-disable-next-line @typescript-eslint/ban-types
export function makeObjectReactive<T extends object>(
  o: T
): ReactiveObjectProxy<T> {
  const p = new Proxy(new ObjectWithListener(o), {
    set(target, prop, val): boolean {
      if (prop in target.data) {
        target._emitters[prop].emit(val, target.data[prop]);
        target.data[prop] = val;
        return true;
      } else {
        return false;
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
class ObjectWithListener<T extends object> {
  data: T;
  _emitters: Emitters<T>;
  constructor(data: T) {
    this.data = data;
    const emitters = {};
    for (const key in data) {
      emitters['' + key] = new Emitter();
    }
    this._emitters = emitters as Emitters<T>;
  }

  subscribe(key: keyof T, sub: Subscribtion<T[keyof T]>): Token<T[keyof T]> {
    if (key in this._emitters) {
      return this._emitters[key].subscribe(sub);
    } else {
      return null;
    }
  }
}

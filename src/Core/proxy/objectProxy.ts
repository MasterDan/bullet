import { Emitter } from '../reactive/emitter';

// eslint-disable-next-line @typescript-eslint/ban-types
export function makeObjectReactive<T extends object>(
  o: T
): ObjectWithListener<T> {
  const p = new Proxy(new ObjectWithListener(o), {
    set(target, prop): boolean {
      return true;
    },
    apply(target, prop, args) {
      return true;
    }
  });
  return p;
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
}

import { Emitter } from '../reactive/emitter';

export function makeArrayReactive<T>(arr: Array<T>): Array<T> {
  return (new Proxy(new ArrayWithListeners(arr), {
    set(tgt, prop, val) {
      if (prop in tgt._array) {
        tgt._listeners[prop].emit(val, tgt._array[prop]);
        tgt._array[prop] = val;
        tgt._change.emit(this._array);
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
  }) as unknown) as Array<T>;
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
}

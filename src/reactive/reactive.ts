import { Emitter } from './emitter';
import { Subscribtion } from './subscribtion';
import { Token } from './token';

export class Reactive<T> {
  constructor(private _value: T) {}
  private _emitter: Emitter<T> = new Emitter<T>();
  get value(): T {
    return this._value;
  }
  set value(value: T) {
    const oldVal = this._value;
    this._value = value;
    this.notifyChanged(value, oldVal);
  }
  protected notifyChanged(val: T, old?: T): void {
    this._emitter.emit(val, old);
  }
  subscribe(subscriber: Subscribtion<T>): Token<T> {
    return this._emitter.subscribe(subscriber);   
  }
}

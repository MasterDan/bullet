import { removeItem } from '@/tools/array';
import { Subscribtion } from './subscribtion';
import { Token } from './token';

export class Reactive<T> {
  private _value: T;
  private _subscribers: Subscribtion<T>[] = [];
  get value(): T {
    return this._value;
  }
  set value(value: T) {
    this.notifyChanged(value, this._value);
    this._value = value;
  }
  constructor(value: T) {
    this._value = value;
  }
  protected notifyChanged(val: T, old?: T): void {
    this._subscribers.forEach((f) => {
      f(val, old);
    });
  }
  subscribe(subscriber: Subscribtion<T>): Token<T> {
    this._subscribers.push(subscriber);
    return new Token<T>(subscriber, (sub) => {
      removeItem(this._subscribers, sub);
    });
  }
}

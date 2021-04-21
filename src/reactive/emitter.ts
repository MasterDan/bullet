import { removeItem } from '@/tools/array';
import { Subscribtion } from './subscribtion';
import { Token } from './token';

export class Emitter<T> {
  private _subscribers: Subscribtion<T>[] = [];
  emit(val: T, old?: T): void {
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

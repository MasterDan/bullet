import { Subscribtion } from './subscribtion';

export class Token<T> {
  constructor(
    private _val: Subscribtion<T>,
    private _unsub: Subscribtion<Subscribtion<T>>
  ) {}
  unsubscribe(): void {
    this._unsub(this._val);
  }
}

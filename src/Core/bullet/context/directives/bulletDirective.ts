export abstract class BulletDirective<T> {
  abstract expression: RegExp;
  abstract bind(el: HTMLElement, value: T): void;
  abstract destroy(el: HTMLElement, value: T): void;
}

export class BulletDirectiveWithValue<T> {
  constructor(public directive: BulletDirective<T>, public value: T) {}
}

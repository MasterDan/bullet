export abstract class BulletDirective {
  abstract expression: RegExp;
  abstract bind(el: HTMLElement, value: string, groups: string[]): void;
  abstract destroy(el: HTMLElement, value: string, groups: string[]): void;
}

export type DirectiveConstructor = new (...args) => BulletDirective;

export class BulletDirectiveWithValue {
  constructor(
    public directive: BulletDirective,
    public value: string,
    public groups: string[]
  ) {}
}

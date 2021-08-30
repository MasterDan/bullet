export abstract class BulletDirective {
  abstract expression: string;
  abstract bind<T>(el: HTMLElement, value: T): void;
  abstract destroy<T>(el: HTMLElement, value: T): void;
}

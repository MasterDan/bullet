import { BulletDirective } from '../bulletDirective';

export class BindDirective extends BulletDirective {
  bind(el: HTMLElement, value: string, groups: string[]): void {
    el.setAttribute(groups[1], value);
  }
  destroy(): void {
    return undefined;
  }
  expression = new RegExp('(.*):');
}

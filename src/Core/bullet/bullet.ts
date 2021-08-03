import { BulletConstructor, Component } from '../component/component';
import { Emitter } from '../reactive/emitter';

export class Bullet<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: Component<TProps, TEmits>;
  mount(selector: string): void {
    document.querySelector(selector).innerHTML = this.__root.__template.draw();
  }
  static create<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(root: BulletConstructor<TProps, TEmits>): Bullet<TProps, TEmits> {
    const bulet = new Bullet<TProps, TEmits>();
    bulet.__root = new root();
    return bulet;
  }
}

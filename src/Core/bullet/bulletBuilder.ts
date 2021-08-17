import { BulletConstructor, Component } from '../component/component';
import { Emitter } from '../reactive/emitter';
import { Bullet } from './bullet';

export class BulletBuilder<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: Component<TProps, TEmits>;

  setRoot(
    component: BulletConstructor<TProps, TEmits>
  ): BulletBuilder<TProps, TEmits> {
    this.__root = new component();
    return this;
  }
  build(): Bullet<TProps, TEmits> {
    const result = new Bullet<TProps, TEmits>();
    result.__root = this.__root;
    return result;
  }
}

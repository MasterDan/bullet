import { BulletConstructor, Component } from '../component/component';
import { Emitter } from '../reactive/emitter';
import { Bullet } from './bullet';
import { BulletContext } from './context/bulletContext';
import { ContextInjectorConstructor } from './context/injectors/bulletContextInjector';

export class BulletBuilder<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: Component<TProps, TEmits>;
  __context: BulletContext = new BulletContext();

  setRoot(
    component: BulletConstructor<TProps, TEmits>
  ): BulletBuilder<TProps, TEmits> {
    this.__root = new component();
    return this;
  }
  use(
    ...injectors: ContextInjectorConstructor[]
  ): BulletBuilder<TProps, TEmits> {
    for (const injector of injectors) {
      this.__context = new injector().inject(this.__context);
      return this;
    }
  }
  build(): Bullet<TProps, TEmits> {
    const result = new Bullet<TProps, TEmits>();
    result.__root = this.__root;
    return result;
  }
}

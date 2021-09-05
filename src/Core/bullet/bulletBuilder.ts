import { BulletConstructor, Component } from '../component/component';
import { Emitter } from '../reactive/emitter';
import { Bullet } from './bullet';
import { BulletContext } from './context/bulletContext';
import { BulletDirective } from './context/directives/bulletDirective';
import { ContextInjectorConstructor } from './context/injectors/bulletContextInjector';

export class BulletBuilder<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: Component<TProps, TEmits>;
  __context: BulletContext = new BulletContext();

  setRoot(
    ctor: (context: BulletContext) => BulletConstructor<TProps, TEmits>
  ): BulletBuilder<TProps, TEmits> {
    this.__root = new (ctor(this.__context))();
    return this;
  }
  addDirective(
    ...directives: BulletDirective[]
  ): BulletBuilder<TProps, TEmits> {
    this.__context.directives.push(...directives);
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
    result.__context = this.__context;
    result.__root = this.__root;
    return result;
  }
}

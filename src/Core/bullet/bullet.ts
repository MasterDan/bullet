import { Component } from '../component/component';
import { Emitter } from '../reactive/emitter';
import { BulletBuilder } from './bulletBuilder';
import { BulletContext } from './context/bulletContext';

export class Bullet<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: Component<TProps, TEmits>;
  __context: BulletContext;
  mount(selector: string): void {
    document.querySelector(selector).innerHTML = this.__root.__template.draw();
  }
  static create<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(
    ctor: (builder: BulletBuilder<TProps, TEmits>) => void
  ): Bullet<TProps, TEmits> {
    const builder = new BulletBuilder<TProps, TEmits>();
    ctor(builder);
    return builder.build();
  }
}

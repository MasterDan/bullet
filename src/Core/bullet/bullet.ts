import { Component } from '../component/component';
import { Emitter } from '../reactive/emitter';
import { drawRootNode } from '../template/drawEngine/drawEngine';
import { BulletContext } from './context/bulletContext';

export class Bullet<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: Component<TProps, TEmits>;
  __context: BulletContext;
  mount(selector: string): void {
    document.querySelector(selector).innerHTML = drawRootNode(
      this.__root.__template
    );
  }
}

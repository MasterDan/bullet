import { ComponentCompiled } from '../component/componentCompiled';
import { Emitter } from '../reactive/emitter';
import { BulletContext } from './context/bulletContext';

export class Bullet<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __root: ComponentCompiled<TProps, TEmits> | undefined;
  __context: BulletContext | undefined;
  mount(selector: string): void {
    throw new Error('Not Defined');
  }
}

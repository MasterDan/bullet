import { ReactiveObjectProxy } from '../proxy/objectProxy';
import { Emitter } from '../reactive/emitter';
import { ComponentHookBinder } from './ComponentHookBinder';
import { ComponentHooks } from './componentHooks';
import { ComponentInterface, IComponentInterface } from './сomponentInterface';

export class ComponentCompiled<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __interface: ComponentInterface<TProps, TEmits> | undefined;
  __lifecycle: ComponentHookBinder | undefined;
  __data: ReactiveObjectProxy<Record<string, unknown>> | undefined;
  __hooks = new ComponentHooks();
  __setup:
    | ((def: IComponentInterface<TProps, TEmits>) => Record<string, unknown>)
    | undefined;
  __applyLifecycle(): void {
    this.__lifecycle?.bindTo(this);
  }
}

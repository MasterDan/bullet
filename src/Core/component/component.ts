import { BulletContext } from '../bullet/context/bulletContext';
import { makeObjectReactive, ReactiveObjectProxy } from '../proxy/objectProxy';
import { Emitter } from '../reactive/emitter';
import { BulletRootNode } from '../template/bulletRootNode';
import { isNullOrWhiteSpace } from '../tools/string';
import { ComponentHooks } from './componentHooks';
import {
  ComponentInterface,
  ComponentInterfaceCustom,
  IComponentInterface
} from './сomponentInterface';
export class Component<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __interface: ComponentInterface<TProps, TEmits> | undefined;
  __template: BulletRootNode | undefined;
  __data: ReactiveObjectProxy<Record<string, unknown>> | undefined;
  __hooks = new ComponentHooks();
  __setup:
    | ((def: IComponentInterface<TProps, TEmits>) => Record<string, unknown>)
    | undefined;
  static create<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(
    config: IComponentSetup<TProps, TEmits>
  ): (context: BulletContext) => BulletConstructor<TProps, TEmits> {
    return (context): BulletConstructor<TProps, TEmits> => {
      return class extends Component<TProps, TEmits> {
        __template = isNullOrWhiteSpace(config.template)
          ? undefined
          : BulletRootNode.create().fromHtml(config.template)(context);
        __interface =
          config.definition instanceof ComponentInterface
            ? config.definition
            : new ComponentInterfaceCustom(config.definition);
        __setup = config.setup;
        __data = makeObjectReactive(config.setup(this.__interface));
      } as BulletConstructor<TProps, TEmits>;
    };
  }
}

export interface IComponentSetup<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  template?: string;
  definition: IComponentInterface<TProps, TEmits>;
  setup: (def: IComponentInterface<TProps, TEmits>) => Record<string, unknown>;
}

export type BulletConstructor<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> = new (...args: unknown[]) => Component<TProps, TEmits>;

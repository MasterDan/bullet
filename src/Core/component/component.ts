import { Emitter } from '../reactive/emitter';
import { BulletRootNode } from '../template/bulletRootNode';
import {
  ComponentInterface,
  ComponentInterfaceCustom,
  IComponentInterface
} from './сomponentInterface';
export class Component<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  __interface: ComponentInterface<TProps, TEmits> = null;
  __template: BulletRootNode = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(arg: ComponentInterface<TProps, TEmits>): Record<string, unknown> {
    return {};
  }
}

export type BulletConstructor<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> = new (...args) => Component<TProps, TEmits>;

export function template<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
>(html: string) {
  return (
    ctor: BulletConstructor<TProps, TEmits>
  ): BulletConstructor<TProps, TEmits> => {
    return class extends ctor {
      __template = BulletRootNode.fromHtml(html);
    };
  };
}

export function implement<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
>(inter: IComponentInterface<TProps, TEmits>) {
  return (
    ctor: BulletConstructor<TProps, TEmits>
  ): BulletConstructor<TProps, TEmits> => {
    return class extends ctor {
      __interface =
        inter instanceof ComponentInterface
          ? inter
          : new ComponentInterfaceCustom(inter);
    };
  };
}

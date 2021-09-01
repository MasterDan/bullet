import { BulletContext } from '../bullet/context/bulletContext';
import { makeObjectReactive, ReactiveObjectProxy } from '../proxy/objectProxy';
import { Emitter } from '../reactive/emitter';
import { BulletRootNode } from '../template/bulletRootNode';
import { isNullOrWhiteSpace } from '../tools/string';
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
  __data: ReactiveObjectProxy<Record<string, unknown>>;
  static create<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(
    config: IComponentSetup<TProps, TEmits>
  ): (context: BulletContext) => BulletConstructor<TProps, TEmits> {
    return (context) => {
      return class extends Component<TProps, TEmits> {
        __template = isNullOrWhiteSpace(config.template)
          ? null
          : BulletRootNode.create(context.parser).fromHtml(config.template)(
              context
            );
        __interface =
          config.definition instanceof ComponentInterface
            ? config.definition
            : new ComponentInterfaceCustom(config.definition);
        __data = makeObjectReactive(config.setup(this.__interface));
      };
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
> = new (...args) => Component<TProps, TEmits>;

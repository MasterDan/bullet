import { BulletContext } from '../bullet/context/bulletContext';
import { Emitter } from '../reactive/emitter';
import { BulletRootNode } from '../template/bulletRootNode';
import { ClassicDomParser } from '../template/stringParsers/ClassicDomParser';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(arg: ComponentInterface<TProps, TEmits>): Record<string, unknown> {
    return {};
  }
  static create<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(
    setupArg: IComponentSetup<TProps, TEmits>
  ): (context: BulletContext) => BulletConstructor<TProps, TEmits> {
    return (context) => {
      return class extends Component<TProps, TEmits> {
        __template = isNullOrWhiteSpace(setupArg.template)
          ? null
          : BulletRootNode.create(context.parser).fromHtml(setupArg.template)(
              context
            );
        __interface =
          setupArg.definition instanceof ComponentInterface
            ? setupArg.definition
            : new ComponentInterfaceCustom(setupArg.definition);
        setup = setupArg.setup;
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

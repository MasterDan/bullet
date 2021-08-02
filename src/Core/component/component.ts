import { BulletRootNode } from '../template/bulletRootNode';
import {
  ComponentInterface,
  ComponentInterfaceCustom,
  ComponentInterfaceEmpty,
  IComponentInterface
} from './сomponentInterface';
export class Component {
  __interface: ComponentInterface = new ComponentInterfaceEmpty();
  __template: BulletRootNode = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(arg: ComponentInterface): Record<string, unknown> {
    return {};
  }
}

export type BulletConstructor = new (...args) => Component;

export function template(html: string) {
  return (ctor: BulletConstructor): BulletConstructor => {
    return class extends ctor {
      __template = BulletRootNode.fromHtml(html);
    };
  };
}

export function implement(inter: IComponentInterface) {
  return (ctor: BulletConstructor): BulletConstructor => {
    return class extends ctor {
      __interface =
        inter instanceof ComponentInterface
          ? inter
          : new ComponentInterfaceCustom(inter);
    };
  };
}

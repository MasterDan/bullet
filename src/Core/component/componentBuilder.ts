import { makeObjectReactive } from '../proxy/objectProxy';
import { BulletRootNode } from '../template/bulletRootNode';
import { BulletComponent } from './component';
import {
  ComponentInterfaceCustom,
  IComponentInterface
} from './сomponentInterface';

export class ComponentBuilder {
  // eslint-disable-next-line @typescript-eslint/ban-types
  __dataConstructor: <TData extends object>(
    iface: IComponentInterface
  ) => TData;
  __template: string;
  __interface: IComponentInterface;

  implement(
    iface: IComponentInterface
  ): {
    setTemplate(template: string): void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    setData<TData extends object>(
      ctor: (iface: IComponentInterface) => TData
    ): void;
  } {
    this.__interface = iface;
    return {
      setTemplate(template: string) {
        this.__template = template;
      },
      // eslint-disable-next-line @typescript-eslint/ban-types
      setData<TData extends object>(
        ctor: (iface: IComponentInterface) => TData
      ) {
        this.__dataConstructor = ctor;
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  build<TData extends object>(): BulletComponent<TData> {
    return new BulletComponent<TData>(
      new ComponentInterfaceCustom(this.__interface),
      makeObjectReactive(this.__dataConstructor(this.__interface)),
      BulletRootNode.fromHtml(this.__template)
    );
  }
}

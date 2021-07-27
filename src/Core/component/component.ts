import { ReactiveObjectProxy } from '../proxy/objectProxy';
import { BulletRootNode } from '../template/bulletRootNode';
import { ComponentInterface } from './ComponentInterface';
class ComponentStrict<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TObj extends object
> {
  constructor(
    public __interface: ComponentInterface,
    public __data: ReactiveObjectProxy<TObj>,
    public __template: BulletRootNode
  ) {}
}

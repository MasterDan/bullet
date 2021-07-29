import { ReactiveObjectProxy } from '../proxy/objectProxy';
import { BulletRootNode } from '../template/bulletRootNode';
import { ComponentInterface } from './ComponentInterface';
export class BulletComponent<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TObj extends object
> {
  constructor(
    public __interface: ComponentInterface = null,
    public __data: ReactiveObjectProxy<TObj> = null,
    public __template: BulletRootNode = null
  ) {}
}

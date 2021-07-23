import { ReactiveObjectProxy } from '../proxy/objectProxy';
import { BulletRootNode } from '../template/bulletRootNode';
class BulletInterface<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, unknown>
> {
  constructor(public props: TProps, public emits: TEmits) {}
}

class BulletComponent<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, unknown>,
  TDef extends BulletInterface<TProps, TEmits>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TObj extends object
> {
  constructor(
    public __interface: TDef,
    public __data: ReactiveObjectProxy<TObj>,
    public __template: BulletRootNode
  ) {}
}

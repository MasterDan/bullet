class BulletInterface<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, unknown>
> {
  constructor(public props: TProps, public emits: TEmits) {}
}

class BulletComponent<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, unknown>,
  TDef extends BulletInterface<TProps, TEmits>
> {
  constructor(public __interface: TDef) {}
}

function Bullet(numOfWheels: number) {
  return function (constructor: Function) {
    constructor.prototype.wheels = numOfWheels;
  };
}

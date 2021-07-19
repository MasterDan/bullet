class BulletInterface<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, unknown>
> {
  constructor(public props: TProps, public emits: TEmits) {}
}

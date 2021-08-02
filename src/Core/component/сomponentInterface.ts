import { Emitter } from '../reactive/emitter';
import { sameKeys } from '../tools/object';

export interface IComponentInterface<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> {
  props: TProps;
  emits: TEmits;
}

export class ComponentInterface<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> implements IComponentInterface<TProps, TEmits> {
  constructor(public props: TProps, public emits: TEmits) {}
  compareWith(
    other: ComponentInterface<
      Record<string, unknown>,
      Record<string, Emitter<unknown>>
    >
  ): boolean {
    return compareInterfaces(this, other);
  }
}
export class ComponentInterfaceEmpty extends ComponentInterface<
  Record<string, unknown>,
  Record<string, Emitter<unknown>>
> {
  constructor() {
    super({}, {});
  }
}

export class ComponentInterfaceCustom<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
> extends ComponentInterface<TProps, TEmits> {
  constructor(def: IComponentInterface<TProps, TEmits>) {
    super(def.props, def.emits);
  }
}
/**
 * Проверяем, что у двух компонентов одинаковые Свойства и одинаковые возможные события
 */
function compareInterfaces(
  first: IComponentInterface<
    Record<string, unknown>,
    Record<string, Emitter<unknown>>
  >,
  second: IComponentInterface<
    Record<string, unknown>,
    Record<string, Emitter<unknown>>
  >
): boolean {
  return (
    sameKeys(first.props, second.props) && sameKeys(first.emits, second.emits)
  );
}

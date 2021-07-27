import { Emitter } from '../reactive/emitter';
import { sameKeys } from '../tools/object';

export interface IComponentInterface {
  props: Record<string, unknown>;
  emits: Record<string, Emitter<unknown>>;
}

export class ComponentInterface implements IComponentInterface {
  constructor(
    public props: Record<string, unknown>,
    public emits: Record<string, Emitter<unknown>>
  ) {}
  compareWith(other: ComponentInterface): boolean {
    return compareInterfaces(this, other);
  }
}
export class ComponentInterfaceEmpty extends ComponentInterface {
  constructor() {
    super({}, {});
  }
}

export class ComponentInterfaceCustom extends ComponentInterface {
  constructor(def: IComponentInterface) {
    super(def.props, def.emits);
  }
}

function compareInterfaces(
  first: IComponentInterface,
  second: IComponentInterface
): boolean {
  return (
    sameKeys(first.props, second.props) && sameKeys(first.emits, second.emits)
  );
}

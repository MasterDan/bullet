import { Emitter } from '../reactive/emitter';

export class ComponentHooks {
  created = new Emitter<void>();
  mount = new Emitter<void>();
  mounted = new Emitter<void>();
  update = new Emitter<void>();
  updated = new Emitter<void>();
  dispose = new Emitter<void>();
}

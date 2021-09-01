import { Emitter } from '../reactive/emitter';

export class ComponentHooks {
  created: Emitter<void>;
  mount: Emitter<void>;
  update: Emitter<void>;
  mounted: Emitter<void>;
  dispose: Emitter<void>;
}

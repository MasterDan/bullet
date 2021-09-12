import { Emitter } from '../reactive/emitter';

export class ComponentHooks {
  created: Emitter<void>;
  mount: Emitter<void>;
  mounted: Emitter<void>;
  update: Emitter<void>;
  updated: Emitter<void>;
  dispose: Emitter<void>;
}

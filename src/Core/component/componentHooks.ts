import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Component } from './component';

export class ComponentHooks {
  created: Emitter<void>;
  mount: Emitter<void>;
  update: Emitter<void>;
  mounted: Emitter<void>;
  dispose: Emitter<void>;
}

export class ComponentHookBinder {
  onMount: Subscribtion<void>;
  onUpdate: Subscribtion<void>;
  constructor(arg: {
    onMount: Subscribtion<void>;
    onUpdate: Subscribtion<void>;
  }) {
    this.onMount = arg.onMount;
    this.onUpdate = arg.onUpdate;
  }
  bindTo<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(component: Component<TProps, TEmits>): void {
    component.__hooks.mount.subscribe(this.onMount);
    component.__hooks.update.subscribe(this.onUpdate);
  }
}

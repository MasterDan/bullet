import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Component } from './component';

export class ComponentHookBinder {
  onMount: Subscribtion<void>;
  onUpdate: Subscribtion<void>;
  onDispose: Subscribtion<void>;
  constructor(arg?: {
    onMount?: Subscribtion<void>;
    onUpdate?: Subscribtion<void>;
    onDispose?: Subscribtion<void>;
  }) {
    this.onMount = arg?.onMount;
    this.onUpdate = arg?.onUpdate;
    this.onDispose = arg?.onDispose;
  }
  bindTo<
    TProps extends Record<string, unknown>,
    TEmits extends Record<string, Emitter<unknown>>
  >(component: Component<TProps, TEmits>): void {
    component.__hooks.mount.subscribe(this.onMount);
    component.__hooks.update.subscribe(this.onUpdate);
    component.__hooks.dispose.subscribe(this.onDispose);
  }
}

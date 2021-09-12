import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Component } from './component';

export class ComponentHookBinder {
  onMount: Subscribtion<void> | undefined;
  onUpdate: Subscribtion<void> | undefined;
  onDispose: Subscribtion<void> | undefined;
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
    if (this.onMount) component.__hooks.mount.subscribe(this.onMount);
    if (this.onUpdate) component.__hooks.update.subscribe(this.onUpdate);
    if (this.onDispose) component.__hooks.dispose.subscribe(this.onDispose);
  }
}

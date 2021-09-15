import { Emitter } from '../reactive/emitter';
import { Subscribtion } from '../reactive/subscribtion';
import { Pipeline } from '../template/drawEngine/pipeline/pipeline';
import { ComponentCompiled } from './componentCompiled';

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
  >(component: ComponentCompiled<TProps, TEmits>): void {
    if (this.onMount) component.__hooks.mount.subscribe(this.onMount);
    if (this.onUpdate) component.__hooks.update.subscribe(this.onUpdate);
    if (this.onDispose) component.__hooks.dispose.subscribe(this.onDispose);
  }
}

export class ComponentPipelineBuilder {
  onMount = new Pipeline<unknown, unknown>();
  onUpdate = new Pipeline<unknown, unknown>();
  onDispose = new Pipeline<unknown, unknown>();

  build(): ComponentHookBinder {
    return new ComponentHookBinder({
      onMount: () => {
        this.onMount.run();
      },
      onUpdate: () => {
        this.onUpdate.run();
      },
      onDispose: () => {
        this.onDispose.run();
      }
    });
  }
}

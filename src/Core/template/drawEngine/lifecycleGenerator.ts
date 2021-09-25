import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { IDrawArg, IDrawNodeArg } from './pipeline/drawArg';

export function generateLifecycleForNode(
  arg: IDrawNodeArg
): ComponentPipelineBuilder {
  return arg.builder;
}

export function generateLifecycle(arg: IDrawArg): ComponentPipelineBuilder {
  let builder = arg.builder;
  for (const node of arg.nodes) {
    builder = generateLifecycleForNode({
      builder,
      context: arg.context,
      node
    });
  }
  return builder;
}

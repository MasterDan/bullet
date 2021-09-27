import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { isAny } from '@/core/tools/array';
import { isNullOrEmpty } from '@/Core/tools/object';
import { IDrawArg, IDrawNodeArg } from './pipeline/drawArg';

export function generateLifecycleForNode(
  arg: IDrawNodeArg
): ComponentPipelineBuilder {
  if (isNullOrEmpty(arg.node)) {
    throw new Error('We received empty node. Something wrong with parsing');
  }
  if (isAny(arg.node.children)) {
    let builder = arg.builder;
    for (const child of arg.node.children) {
      builder = generateLifecycleForNode({
        builder,
        node: child,
        context: arg.context,
        parentNode: arg.node
      });
    }
    arg.builder = builder;
  }
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

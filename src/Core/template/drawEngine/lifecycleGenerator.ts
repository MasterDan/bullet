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
    generateLifecycle({
      builder: arg.builder,
      context: arg.context,
      nodes: arg.node.children,
      parentNode: arg.node
    });
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

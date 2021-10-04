import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { isAny } from '@/core/tools/array';
import { isNullOrEmpty } from '@/Core/tools/object';
import { IDrawArg, IDrawNodeArg } from './pipeline/drawArg';
import { GenerateRenderPipe } from './pipeline/pipeNodes/generateRender';

export function generateLifecycleForNode(
  arg: IDrawNodeArg
): ComponentPipelineBuilder {
  if (isNullOrEmpty(arg.node)) {
    throw new Error('We received empty node. Something wrong with parsing');
  }
  if (isAny(arg.node.children)) {
    generateLifecycleForArray({
      builder: arg.builder,
      context: arg.context,
      nodes: arg.node.children,
      parentNode: arg.node
    });
  } else{
    throw new Error('Not implemented');
  }
  return arg.builder;
}

function generateLifecycleForArray(arg: IDrawArg) {
  const builder = arg.builder;
  for (const node of arg.nodes) {
  }
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

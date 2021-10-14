import { isEmpty } from '@/core/tools/array';
import { Pipe, Pipeline } from '../pipeline/pipeline';
import { IDrawArg, IDrawNodeArg, IDrawNodesArg } from './drawArg';
import { drawNode } from '../../drawEngine/drawEngine';

export type EmptyBulletNodeRenderer = () => string;

export function appendMoutHook(arg: IDrawArg): IDrawArg {
  arg.builder.onMount = new Pipeline(
    new Pipe<HTMLElement, void>((el: HTMLElement) => {
      const innerText = drawMultipleNodes({
        builder: arg.builder,
        context: arg.context,
        nodes: arg.nodes
      })
        .map((r) => r())
        .join('');
      el.innerHTML = innerText;
    })
  );
  return arg;
}

function drawSingleNode(arg: IDrawNodeArg): EmptyBulletNodeRenderer {
  if (!isEmpty(arg.node.children)) {
    const content = drawMultipleNodes({
      builder: arg.builder,
      nodes: arg.node.children,
      context: arg.context,
      parentNode: arg.node
    });
    return () => {
      const renderedContent = content.map((r) => r()).join('');
      return drawNode(arg.node)(renderedContent);
    };
  } else {
    return () => {
      return drawNode(arg.node)();
    };
  }
}

function drawMultipleNodes(arg: IDrawNodesArg): EmptyBulletNodeRenderer[] {
  return arg.nodes.map((n) =>
    drawSingleNode({
      builder: arg.builder,
      node: n,
      context: arg.context,
      parentNode: arg?.parentNode
    })
  );
}

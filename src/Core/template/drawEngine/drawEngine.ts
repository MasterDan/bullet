import { BulletContext } from '@/Core/bullet/context/bulletContext';
import { Component } from '@/Core/component/component';
import { Emitter } from '@/Core/reactive/emitter';
import { isEmpty } from '@/core/tools/array';
import { BulletNode } from '../bulletNode';
import { BulletRootNode } from '../bulletRootNode';
import { emptyTags } from '../tags';

export function generateRenderFunction<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
>(component: Component<TProps, TEmits>, context: BulletContext): void {
  throw new Error('Not implemented');
}

function drawNode(node: BulletNode): string {
  if (node.text != null) {
    return node.text;
  }
  if (node.element == null) {
    throw new Error('Cannot Draw empty node');
  }
  const attributesArray = [];
  for (const key in node.attributes) {
    attributesArray.push(`${key}="${node.attributes[key]}"`);
  }
  const attributes = isEmpty(attributesArray)
    ? ''
    : ' ' + attributesArray.join(' ');
  if (emptyTags.some((t) => t === node.element)) {
    return `<${node.element}${attributes}/>`;
  } else {
    return `<${node.element}${attributes}>${node.children.map((c) =>
      drawNode(c)
    )}</${node.element}>`;
  }
}

function drawRootNode(root: BulletRootNode): string {
  return root.core
    .map((n) => {
      Object.assign(n.attributes, root.attributes);
      Object.assign(n.directives, root.directives);
      return drawNode(n);
    })
    .join('');
}
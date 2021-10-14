import { isEmpty } from '@/core/tools/array';
import { BulletNode } from '../bulletNode';
import { BulletRootNode } from '../bulletRootNode';
import { emptyTags } from '../tags';

export type BulletNodeRenderer = (content?: string) => string;

export function drawNode(node: BulletNode): BulletNodeRenderer {
  const attributesArray = [];
  for (const key in node.attributes) {
    attributesArray.push(`${key}="${node.attributes[key]}"`);
  }
  const attributes = isEmpty(attributesArray)
    ? ''
    : ' ' + attributesArray.join(' ');
  if (emptyTags.some((t) => t === node.element)) {
    return () => `<${node.element}${attributes}/>`;
  } else {
    return (content) =>
      `<${node.element}${attributes}>${content}</${node.element}>`;
  }
}

export function drawRootNode(root: BulletRootNode): string {
  return root.core
    .map((n) => {
      Object.assign(n.attributes, root.attributes);
      Object.assign(n.directives, root.directives);
      return drawNode(n)('');
    })
    .join('');
}

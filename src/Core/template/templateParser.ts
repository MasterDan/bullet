import { BulletNode } from './bulletNode';
import { JSDOM } from 'jsdom';
import { isNullOrWhiteSpace } from '../tools/string';

export function parseHtml(html: string): BulletNode[] {
  const jd = new JSDOM(html);
  return ParseNodes(jd.window.document.body.childNodes);
}

function isHtmlElement(el: ChildNode): el is HTMLElement {
  return el.nodeType === el.ELEMENT_NODE;
}

function ParseNodes(nodes: NodeListOf<ChildNode>): BulletNode[] {
  const result: BulletNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nodeName === '#text') {
      if (!isNullOrWhiteSpace(node.nodeValue)) {
        result.push(BulletNode.new((b) => b.setText(node.nodeValue.trim())));
      }
    } else if (isHtmlElement(node)) {
      const bulletNode = BulletNode.new((b) =>
        b.setElement(node.nodeName.toLowerCase()).setAttributes((ab) => {
          for (const attr of node.attributes) {
            ab.add(attr.nodeName, attr.nodeValue);
          }
        })
      );
      ParseNodes(node.childNodes).forEach((bn) => {
        bulletNode.children.push(bn);
      });
      result.push(bulletNode);
    }
  }
  return result;
}

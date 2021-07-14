import {
  AttributeBuiderEmpty,
  AttributeBuilder,
  BulletNode
} from './bulletNode';
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
      const bulletNode = BulletNode.new((b) => {
        let eb: AttributeBuiderEmpty | AttributeBuilder = b.setElement(
          node.nodeName.toLowerCase()
        );
        for (const attr of node.attributes) {
          eb = eb.setAttribute(attr.nodeName, attr.nodeValue);
        }
        return (eb as AttributeBuilder).next().noDirectives();
      });
      ParseNodes(node.childNodes).forEach((bn) => {
        bulletNode.children.push(bn);
      });
      result.push(bulletNode);
    }
  }
  return result;
}

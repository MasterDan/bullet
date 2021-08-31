import { BulletNode } from './bulletNode';
import { isNullOrWhiteSpace } from '../tools/string';
import { IDomParser } from './stringParsers/types';
import { BulletContext } from '../bullet/context/bulletContext';

export class HtmlParser {
  constructor(private context: BulletContext) {}

  parseHtml(html: string): BulletNode[] {
    return ParseNodes(this.context.parser.getNodes(html));
  }
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
        result.push(
          BulletNode.new((b) => {
            return b.setText(node.nodeValue.trim());
          })
        );
      }
    } else if (isHtmlElement(node)) {
      result.push(
        BulletNode.new((builder) =>
          builder
            .setElement(node.nodeName.toLowerCase())
            .setAttributes((ab) => {
              for (const attr of node.attributes) {
                ab.add(attr.nodeName, attr.nodeValue);
              }
            })
            .setChildren((cb) => {
              ParseNodes(node.childNodes).forEach((bn) => {
                cb.addNode(bn);
              });
            })
        )
      );
    }
  }
  return result;
}

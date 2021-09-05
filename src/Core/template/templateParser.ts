import { BulletNode } from './bulletNode';
import { isNullOrWhiteSpace } from '../tools/string';
import { BulletContext } from '../bullet/context/bulletContext';
import { BulletDirectiveWithValue } from '../bullet/context/directives/bulletDirective';

interface IParseAttributesResult {
  attributes: Record<string, string>;
  directives: BulletDirectiveWithValue<unknown>[];
}
export class HtmlParser {
  constructor(private context: BulletContext) {}

  parseHtml(html: string): BulletNode[] {
    return this.ParseNodes(this.context.parser.getNodes(html));
  }
  ParseNodes(nodes: NodeListOf<ChildNode>): BulletNode[] {
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
              .then((b) => {
                const parsedAttrs = this.parseattributes(node.attributes);
                return b
                  .setAttributes((ab) => {
                    for (const key of Object.keys(parsedAttrs.attributes)) {
                      ab.add(key, parsedAttrs.attributes[key]);
                    }
                  })
                  .setDirectives((db) => {
                    for (const dir of parsedAttrs.directives) {
                      db.add(dir);
                    }
                  });
              })
              .setChildren((cb) => {
                this.ParseNodes(node.childNodes).forEach((bn) => {
                  cb.addNode(bn);
                });
              })
          )
        );
      }
    }
    return result;
  }
  /** Отделяем атрибуты от наших директив */
  parseattributes(attributes: NamedNodeMap): IParseAttributesResult {
    const directivesResult: BulletDirectiveWithValue<unknown>[] = [];
    const attributesResult: Record<string, string> = {};

    for (const attr of attributes) {
      let isNotDirective = true;

      for (const directive of this.context.directives) {
        if (directive.expression.test(attr.nodeName)) {
          directivesResult.push(
            new BulletDirectiveWithValue(directive, attr.nodeValue)
          );
          isNotDirective = false;
          break;
        }
      }
      if (isNotDirective) {
        attributesResult[attr.nodeName] = attr.nodeValue;
      }
    }
    return {
      attributes: attributesResult,
      directives: directivesResult
    };
  }
}

function isHtmlElement(el: ChildNode): el is HTMLElement {
  return el.nodeType === el.ELEMENT_NODE;
}

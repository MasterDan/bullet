import { BulletNode } from './bulletNode';
import { isNullOrWhiteSpace } from '../tools/string';
import { BulletContext } from '../bullet/context/bulletContext';
import { BulletDirectiveWithValue } from '../bullet/context/directives/bulletDirective';

interface IParseAttributesResult {
  attributes: Record<string, string | null>;
  directives: BulletDirectiveWithValue[];
}
export class HtmlParser {
  constructor(private context: BulletContext) {}

  parseHtml(html: string): BulletNode[] {
    if (this.context.parser == undefined) {
      throw new Error('Parser must be set before parse starts');
    }
    return this.ParseNodes(this.context.parser.getNodes(html));
  }
  ParseNodes(nodes: NodeListOf<ChildNode>): BulletNode[] {
    const result: BulletNode[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node == null) {
        continue;
      }
      if (node.nodeName === '#text') {
        const value = node.nodeValue;
        if (!isNullOrWhiteSpace(value)) {
          result.push(
            BulletNode.new((b) => {
              return b.setText(value.trim());
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
    const directivesResult: BulletDirectiveWithValue[] = [];
    const attributesResult: Record<string, string | null> = {};

    for (const attr of attributes) {
      let isNotDirective = true;

      for (const directive of this.context.directives) {
        if (directive.expression.test(attr.nodeName)) {
          directivesResult.push(
            new BulletDirectiveWithValue(
              directive,
              attr.nodeValue,
              attr.nodeName.match(directive.expression) || []
            )
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

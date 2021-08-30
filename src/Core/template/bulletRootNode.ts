import { BulletNode, IBulletAttributes, IBulletDirectives } from './bulletNode';
import { IDomParser } from './stringParsers/types';
import { HtmlParser } from './templateParser';

export class BulletRootNode implements IBulletAttributes, IBulletDirectives {
  attributes: Record<string, string> = {};
  directives: Record<string, string> = {};
  core: BulletNode[] = [];
}

class BulletRootNodeFabric {
  constructor(private _parser: IDomParser) {}

  fromHtml(html: string): BulletRootNode {
    const rnode = new BulletRootNode();
    rnode.core = new HtmlParser(this._parser).parseHtml(html);
    return rnode;
  }
  static create(parser: IDomParser): BulletRootNodeFabric {
    return new BulletRootNodeFabric(parser);
  }
}

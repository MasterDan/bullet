import { BulletContext } from '../bullet/context/bulletContext';
import { BulletNode, IBulletAttributes, IBulletDirectives } from './bulletNode';
import { IDomParser } from './stringParsers/types';
import { HtmlParser } from './templateParser';

export class BulletRootNode implements IBulletAttributes, IBulletDirectives {
  attributes: Record<string, string> = {};
  directives: Record<string, string> = {};
  core: BulletNode[] = [];
  static create(parser: IDomParser): BulletRootNodeFabric {
    return new BulletRootNodeFabric(parser);
  }
}

class BulletRootNodeFabric {
  constructor(private _parser: IDomParser) {}

  fromHtml(html: string): (context: BulletContext) => BulletRootNode {
    return (context) => {
      const rnode = new BulletRootNode();
      rnode.core = new HtmlParser(context).parseHtml(html);
      return rnode;
    };
  }
}

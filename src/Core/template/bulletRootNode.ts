import { BulletContext } from '../bullet/context/bulletContext';
import { BulletDirectiveWithValue } from '../bullet/context/directives/bulletDirective';
import { BulletNode, IBulletAttributes, IBulletDirectives } from './bulletNode';
import { IDomParser } from './stringParsers/types';
import { HtmlParser } from './templateParser';

export class BulletRootNode implements IBulletAttributes, IBulletDirectives {
  directives: BulletDirectiveWithValue<unknown>[] = [];
  attributes: Record<string, string> = {};
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

import { BulletNode, IBulletAttributes, IBulletDirectives } from './bulletNode';
import { parseHtml } from './templateParser';

export class BulletRootNode implements IBulletAttributes, IBulletDirectives {
  attributes: Record<string, string> = {};
  directives: Record<string, string> = {};
  core: BulletNode[] = [];
  draw(): string {
    return this.core.map((p) => this.modifyNode(p).draw()).join('');
  }
  private modifyNode(n: BulletNode): BulletNode {
    Object.assign(n.attributes, this.attributes);
    Object.assign(n.directives, this.directives);
    return n;
  }
  static fromHtml(html: string): BulletRootNode {
    const rnode = new BulletRootNode();
    rnode.core = parseHtml(html);
    return rnode;
  }
}

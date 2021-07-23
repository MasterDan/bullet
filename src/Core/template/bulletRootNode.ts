import { BulletNode, IBulletAttributes, IBulletDirectives } from './bulletNode';

export class BulletRootNode implements IBulletAttributes, IBulletDirectives {
  attributes: Record<string, string> = {};
  directives: Record<string, string> = {};
  core: BulletNode[];
  draw(): string {
    return this.core
      .map((p) => {
        return this.modifyNode(p).draw();
      })
      .join('');
  }
  private modifyNode(n: BulletNode): BulletNode {
    Object.assign(n.attributes, this.attributes);
    Object.assign(n.directives, this.directives);
    return n;
  }
}

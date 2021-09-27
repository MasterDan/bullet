import { BulletContext } from '../bullet/context/bulletContext';
import { createNodeApp } from '../bullet/context/creators/createNodeApp';
import { BulletNode } from './bulletNode';
import { BulletRootNode } from './bulletRootNode';
import { drawNode, drawRootNode } from './drawEngine/drawEngine';

describe('BulletRootNode', () => {
  test('simple sequense', () => {
    const html = `
        <div></div>
        <div></div>
        <div></div>`;
    const node = BulletRootNode.create().fromHtml(html)(
      createNodeApp(() => undefined).__context as BulletContext
    );
    node.attributes = { class: 'cls' };
    const divNode = BulletNode.new((b) =>
      b.setElement('div').setAttributes((ab) => ab.add('class', 'cls'))
    );
    expect(drawRootNode(node)).toEqual(
      [divNode, divNode, divNode].map((e) => drawNode(e)('')).join('')
    );
  });
});

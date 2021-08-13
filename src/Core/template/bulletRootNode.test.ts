import { BulletNode } from './bulletNode';
import { BulletRootNode } from './bulletRootNode';
import { JsDomStringParser } from './stringParsers/JsDomStringParser';

describe('BulletRootNode', () => {
  test('simple sequense', () => {
    const html = `
        <div></div>
        <div></div>
        <div></div>`;
    const node = BulletRootNode.create(new JsDomStringParser()).fromHtml(html);
    node.attributes = { class: 'cls' };
    const divNode = BulletNode.new((b) =>
      b.setElement('div').setAttributes((ab) => ab.add('class', 'cls'))
    );
    expect(node.draw()).toEqual(
      [divNode, divNode, divNode].map((e) => e.draw()).join('')
    );
  });
});

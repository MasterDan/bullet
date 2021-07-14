import { BulletNode } from './bulletNode';

describe('Bullet Node', () => {
  test('Empty Node', () => {
    const node = BulletNode.new((builder) => builder.setElement('div'));
    expect(node.element).toBe('div');
    expect(node.attributes).toEqual({});
    expect(node.directives).toEqual({});
    expect(node.children).toEqual([]);
  });
  test('EmtyDraw', () => {
    const node = BulletNode.new((b) =>
      b.setElement('div').setAttributes((b) => b.add('class', 'cls'))
    );
    expect(node.draw()).toBe('<div class="cls"></div>');
  });
  test('Draw With Children', () => {
    const node = BulletNode.new((b) =>
      b
        .setElement('div')
        .setAttributes((b) => b.add('class', 'cls'))
        .setChildren((b) => b.add((b) => b.setElement('span')))
    );
    expect(node.draw()).toBe('<div class="cls"><span></span></div>');
  });
});

import { BulletNode } from './bulletNode';

describe('Bullet Node', () => {
  test('Empty Node', () => {
    const node = BulletNode.new((builder) =>
      builder.setElement('div').noAttributes().noDirectives()
    );
    expect(node.element).toBe('div');
    expect(node.attributes).toEqual({});
    expect(node.directives).toEqual({});
    expect(node.children).toEqual([]);
  });
  test('EmtyDraw', () => {
    const node = BulletNode.new((b) =>
      b.setElement('div').setAttribute('class', 'cls').next().noDirectives()
    );
    expect(node.draw()).toBe('<div class="cls"></div>');
  });
  test('Draw With Children', () => {
    const node = BulletNode.new((b) =>
      b
        .setElement('div')
        .setAttribute('class', 'cls')
        .next()
        .noDirectives()
        .addChild((b) => b.setElement('span').noAttributes().noDirectives())
    );
    expect(node.draw()).toBe('<div class="cls"><span></span></div>');
  });
});

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
});

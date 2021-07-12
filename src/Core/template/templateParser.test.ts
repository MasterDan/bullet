import { BulletNode } from './bulletNode';
import { parseHtml } from './templateParser';

describe('html parse tests', () => {
  test('simple parsng', () => {
    const nodes = parseHtml(
      `<div>
        <span>Hello</span>
       </div>
       <div>
        <span>World</span>
       </div>`
    );
    expect(nodes).toEqual([
      BulletNode.new((b) =>
        b
          .setElement('div')
          .noAttributes()
          .noDirectives()
          .addChild((b) => b.setElement('span').noAttributes().noDirectives())
      ),
      BulletNode.new((b) =>
        b
          .setElement('div')
          .noAttributes()
          .noDirectives()
          .addChild((b) => b.setElement('span').noAttributes().noDirectives())
      )
    ]);
  });
});

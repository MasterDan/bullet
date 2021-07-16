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
      BulletNode.new((builder) =>
        builder.setElement('div').setChildren((b) =>
          b.add((builder) =>
            builder.setElement('span').setChildren((b) => {
              return b.add((b) => b.setText('Hello'));
            })
          )
        )
      ),
      BulletNode.new((builder) =>
        builder.setElement('div').setChildren((b) =>
          b.add((builder) =>
            builder.setElement('span').setChildren((b) => {
              return b.add((b) => b.setText('World'));
            })
          )
        )
      )
    ]);
  });
  test('Mixing Tags and text', () => {
    const nodes = parseHtml(
      `<div>
        <span>Hello</span>
       </div>
       Some Text Between
       <div>
        <span class="cls" >World</span>
       </div>`
    );
    expect(nodes).toEqual([
      BulletNode.new((divBuilder) =>
        divBuilder.setElement('div').setChildren((b) =>
          b.add((spanBuilder) =>
            spanBuilder.setElement('span').setChildren((b) => {
              return b.add((b) => b.setText('Hello'));
            })
          )
        )
      ),
      BulletNode.new((b) => b.setText('Some Text Between')),
      BulletNode.new((divBuilder) =>
        divBuilder.setElement('div').setChildren((cb) =>
          cb.add((spanBuilder) =>
            spanBuilder
              .setElement('span')
              .setAttributes((ab) => ab.add('class', 'cls'))
              .setChildren((b) => {
                return b.add((b) => b.setText('World'));
              })
          )
        )
      )
    ]);
  });
});

import { BulletNode } from './bulletNode';
import { JSDOM } from 'jsdom';

function parseHtml(html: string): BulletNode[] {
  const jd = new JSDOM(html);
  return ParseHtmlCollection(jd.window.document.body.children);
}

function ParseHtmlCollection(col: HTMLCollection): BulletNode[] {
  const result: BulletNode[] = [];
  for (const item of col) {
    item.attributes;
    const node = BulletNode.new((builder) => {
      const result = builder.setElement(item.id).noAttributes().noDirectives();
      const children = ParseHtmlCollection(item.children);
      for (const child of children) {
        result.children.push(child);
      }
      return result;
    });
    result.push(node);
  }
  return result;
}

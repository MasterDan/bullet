import { IDomParser } from './types';

export class ClassicDomParser implements IDomParser {
  getNodes(html: string): NodeListOf<ChildNode> {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    return htmlDoc.body.childNodes;
  }
}

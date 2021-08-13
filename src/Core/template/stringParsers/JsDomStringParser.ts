import { IDomParser } from './types';
import { JSDOM } from 'jsdom';

export class JsDomStringParser implements IDomParser {
  getNodes(html: string): NodeListOf<ChildNode> {
    const jd = new JSDOM(html);
    return jd.window.document.body.childNodes;
  }
}

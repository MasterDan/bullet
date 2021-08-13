export interface IDomParser {
  getNodes(html: string): NodeListOf<ChildNode>;
}

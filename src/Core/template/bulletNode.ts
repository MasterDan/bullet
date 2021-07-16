import { isEmpty } from '../tools/array';
import { emptyTags } from './tags';

interface IBulletElement {
  element: string;
}

interface IBulletTextNode {
  text: string;
}

interface IBulletAttributes {
  attributes: Record<string, string>;
}

interface IBulletDirectives {
  directives: Record<string, string>;
}
interface IBulletNodeChildren {
  children: IBulletNode[];
}
interface IBulletNode
  extends IBulletElement,
    IBulletAttributes,
    IBulletDirectives,
    IBulletNodeChildren,
    IBulletTextNode {
  draw(): string;
}

export interface INodeBulder {
  build(): IBulletNode;
}

class BulletElementBuilder implements IBulletElement, IBulletTextNode {
  text: string;
  element: string;
  setElement(name: string): BulletNodeBuilder {
    this.element = name;
    return new BulletNodeBuilder(this);
  }
  setText(text: string): BulletTextBuilder {
    this.text = text;
    return new BulletTextBuilder(this);
  }
}

class BulletTextBuilder implements INodeBulder {
  constructor(public elemBuilder: BulletElementBuilder) {}
  build(): IBulletNode {
    const node = new BulletNode();
    node.text = this.elemBuilder.text;
    return node;
  }
}

class BulletNodeBuilder implements INodeBulder {
  private childrenBuilder = new ChildrenBuilder();
  private attributesBuilder = new AttributeBuilder();
  private dirBuilder = new DirectiveBuilder();
  constructor(private elementBuilder: BulletElementBuilder) {}
  build(): BulletNode {
    const node = new BulletNode();
    node.element = this.elementBuilder.element;
    node.attributes = this.attributesBuilder.attributes;
    node.directives = this.dirBuilder.directives;
    node.children = this.childrenBuilder.children;
    return node;
  }
  setAttributes(
    worker: (builder: AttributeBuilder) => void
  ): BulletNodeBuilder {
    worker(this.attributesBuilder);
    return this;
  }
  setDirectives(
    worker: (builder: DirectiveBuilder) => void
  ): BulletNodeBuilder {
    worker(this.dirBuilder);
    return this;
  }
  setChildren(worker: (builder: ChildrenBuilder) => void): BulletNodeBuilder {
    worker(this.childrenBuilder);
    return this;
  }
}

class ChildrenBuilder implements IBulletNodeChildren {
  children: IBulletNode[] = [];
  add(ctor: (b: BulletElementBuilder) => INodeBulder): ChildrenBuilder {
    this.children.push(ctor(new BulletElementBuilder()).build());
    return this;
  }
  addNode(node: BulletNode): ChildrenBuilder {
    this.children.push(node);
    return this;
  }
}

class AttributeBuilder implements IBulletAttributes {
  attributes: Record<string, string> = {};
  add(key: string, value: string): AttributeBuilder {
    this.attributes[key] = value;
    return this;
  }
}

class DirectiveBuilder implements IBulletDirectives {
  directives: Record<string, string> = {};
  add(key: string, value: string): DirectiveBuilder {
    this.directives[key] = value;
    return this;
  }
}

export class BulletNode implements IBulletNode {
  text: string;
  element: string;
  attributes: Record<string, string>;
  directives: Record<string, string>;
  children: IBulletNode[];
  static new(ctor: (b: BulletElementBuilder) => INodeBulder): BulletNode {
    return ctor(new BulletElementBuilder()).build();
  }
  draw(): string {
    if (this.text != null) {
      return this.text;
    }
    if (this.element == null) {
      throw new Error('Cannot Draw empty node');
    }
    const attributesArray = [];
    for (const key in this.attributes) {
      attributesArray.push(`${key}="${this.attributes[key]}"`);
    }
    const attributes = isEmpty(attributesArray)
      ? ''
      : ' ' + attributesArray.join(' ');
    if (emptyTags.some((t) => t === this.element)) {
      return `<${this.element}${attributes}/>`;
    } else {
      return `<${this.element}${attributes}>${this.children.map((c) =>
        c.draw()
      )}</${this.element}>`;
    }
  }
}

import { isEmpty } from '../tools/array';

interface IBulletElement {
  element: string;
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
    IBulletNodeChildren {
  draw(): string;
}

class BulletElementBuilder implements IBulletElement {
  element: string;
  setElement(name: string): AttributeBuiderEmpty {
    this.element = name;
    return new AttributeBuiderEmpty(this);
  }
}

interface IAttributeBuilder {
  setAttribute(name: string, value: string): AttributeBuilder;
  setAttributes(attributes: Record<string, string>): AttributeBuilder;
}

class AttributeBuiderEmpty implements IAttributeBuilder {
  constructor(public elembuilder: BulletElementBuilder) {}
  setAttribute(name: string, value: string): AttributeBuilder {
    const builder = new AttributeBuilder(this.elembuilder);
    builder.setAttribute(name, value);
    return builder;
  }
  setAttributes(attributes: Record<string, string>): AttributeBuilder {
    const builder = new AttributeBuilder(this.elembuilder);
    builder.setAttributes(attributes);
    return builder;
  }
  noAttributes(): DirectiveBuilderEmpty {
    return new DirectiveBuilderEmpty(new AttributeBuilder(this.elembuilder));
  }
}

class AttributeBuilder implements IBulletAttributes, IAttributeBuilder {
  attributes: Record<string, string> = {};
  constructor(public elembuilder: BulletElementBuilder) {}
  setAttribute(name: string, value: string): AttributeBuilder {
    this.attributes[name] = value;
    return this;
  }
  setAttributes(attributes: Record<string, string>): AttributeBuilder {
    Object.assign(this.attributes, attributes);
    return this;
  }
  next(): DirectiveBuilderEmpty {
    return new DirectiveBuilderEmpty(this);
  }
}

interface IDirectiveBuilder {
  setDirective(name: string, value: string): DirectiveBuilder;
  setDirectives(directives: Record<string, string>): DirectiveBuilder;
}

class DirectiveBuilderEmpty implements IBulletDirectives, IDirectiveBuilder {
  directives: Record<string, string>;
  constructor(public attrsBuilder: AttributeBuilder) {}
  setDirective(name: string, value: string): DirectiveBuilder {
    const dirBuilder = new DirectiveBuilder(this.attrsBuilder);
    dirBuilder.setDirective(name, value);
    return dirBuilder;
  }
  setDirectives(directives: Record<string, string>): DirectiveBuilder {
    const dirBuilder = new DirectiveBuilder(this.attrsBuilder);
    dirBuilder.setDirectives(directives);
    return dirBuilder;
  }
  noDirectives(): BulletNodeBuilder {
    return new BulletNodeBuilder(new DirectiveBuilder(this.attrsBuilder));
  }
}

class DirectiveBuilder implements IBulletDirectives, IDirectiveBuilder {
  directives: Record<string, string> = {};
  constructor(public attrsBuilder: AttributeBuilder) {}
  setDirective(name: string, value: string): DirectiveBuilder {
    this.directives[name] = value;
    return this;
  }
  setDirectives(directives: Record<string, string>): DirectiveBuilder {
    Object.assign(this.directives, directives);
    return this;
  }
  next(): BulletNodeBuilder {
    return new BulletNodeBuilder(this);
  }
}

class BulletNodeBuilder implements IBulletNodeChildren {
  children: IBulletNode[] = [];
  constructor(public dirBuilder: DirectiveBuilder) {}
  addChild(
    ctor: (builder: BulletElementBuilder) => BulletNodeBuilder
  ): BulletNodeBuilder {
    const elembuilder = new BulletElementBuilder();
    this.children.push(ctor(elembuilder).build());
    return this;
  }
  build(): BulletNode {
    const node = new BulletNode();
    node.element = this.dirBuilder.attrsBuilder.elembuilder.element;
    node.attributes = this.dirBuilder.attrsBuilder.attributes;
    node.directives = this.dirBuilder.directives;
    node.children = this.children;
    return node;
  }
}

export class BulletNode implements IBulletNode {
  element: string;
  attributes: Record<string, string>;
  directives: Record<string, string>;
  children: IBulletNode[];
  static new(ctor: (b: BulletElementBuilder) => BulletNodeBuilder): BulletNode {
    return ctor(new BulletElementBuilder()).build();
  }
  draw(): string {
    if (this.element == null) {
      throw new Error('Cannot Draw empty node');
    }
    const attributes = [];
    for (const key in this.attributes) {
      attributes.push(`"${key}"=${this.attributes[key]}`);
    }
    if (isEmpty(this.children)) {
      return `<${this.element} ${attributes.join(' ')}/>`;
    } else {
      return `<${this.element} ${attributes.join(
        ' '
      )}>${this.children.map((c) => c.draw())}</${this.element}>`;
    }
  }
}

enum Emtyness {
  CanBeEmpty,
  CanNotBeEmty,
  MustBeEmpty
}

interface ITag {
  name: string;
  emptyness: Emtyness;
}

export const tagInfo: ITag[] = [
  { name: 'area', emptyness: Emtyness.MustBeEmpty },
  { name: 'base', emptyness: Emtyness.MustBeEmpty },
  { name: 'br', emptyness: Emtyness.MustBeEmpty },
  { name: 'col', emptyness: Emtyness.MustBeEmpty },
  { name: 'embed', emptyness: Emtyness.MustBeEmpty },
  { name: 'hr', emptyness: Emtyness.MustBeEmpty },
  { name: 'img', emptyness: Emtyness.MustBeEmpty },
  { name: 'input', emptyness: Emtyness.MustBeEmpty },
  { name: 'keygen', emptyness: Emtyness.MustBeEmpty },
  { name: 'link', emptyness: Emtyness.MustBeEmpty },
  { name: 'meta', emptyness: Emtyness.MustBeEmpty },
  { name: 'param', emptyness: Emtyness.MustBeEmpty },
  { name: 'source', emptyness: Emtyness.MustBeEmpty },
  { name: 'track', emptyness: Emtyness.MustBeEmpty },
  { name: 'wbr', emptyness: Emtyness.MustBeEmpty }
];

export const emptyTags = tagInfo
  .filter((t) => t.emptyness === Emtyness.MustBeEmpty)
  .map((t) => t.name);
